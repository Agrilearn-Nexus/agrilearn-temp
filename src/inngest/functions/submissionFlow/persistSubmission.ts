import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { ReferenceType } from "@/.generated/enums";

export const persistSubmission = inngest.createFunction(
    {
        id: "persist-submission",
        retries: 5,
        onFailure: async ({ event, error }) => {
            console.error("Persist failed:", error);
        }
    },
    { event: "submission.validated" },

    async ({ event, step }) => {
        const { submissionData, paymentReceipt, paymentReceiptKey } = event.data;

        const record = await step.run("db-save", async () => {
            let refType: ReferenceType = "WEBSITE";
            const source = submissionData.referenceSource?.toUpperCase() || "";

            if (source.includes("WHATSAPP")) refType = "WHATSAPP_GROUP";
            else if (source.includes("SOCIAL")) refType = "SOCAIL_MEDIA";
            else if (source.includes("PERSON") || submissionData.referredPerson) refType = "PERSON";

            return prisma.submissions.create({
                data: {
                    name: submissionData.fullName,
                    email: submissionData.email,
                    phone: submissionData.whatsapp,
                    whatsappNumber: submissionData.whatsapp,
                    education: submissionData.education,
                    currentDesignation: submissionData.designation,
                    institute: submissionData.college,
                    organization: submissionData.university,

                    address: submissionData.postalAddress,
                    city: submissionData.city,
                    district: submissionData.district,
                    postalCode: submissionData.postalCode,
                    state: submissionData.state,

                    payment: {
                        create: {
                            upiId: submissionData.upiId || "N/A",
                            paymentDate: new Date(submissionData.paymentDate),
                            UpiImageUrl: paymentReceipt,
                            upiImageId: paymentReceiptKey || null,
                        }
                    },

                    submissionRefference: {
                        create: {
                            type: refType,
                            personName: submissionData.referredPerson || null,
                            personDesignation: null // Optional in schema
                        }
                    }
                },
                include: {
                    payment: true
                }
            });
        });

        await step.sendEvent("emit-submission-persisted", {
            name: "submission.persisted",
            data: {
                submissionId: record.id,
                email: record.email,
                name: record.name,
            },
        });

        return { success: true, id: record.id };
    }
);
