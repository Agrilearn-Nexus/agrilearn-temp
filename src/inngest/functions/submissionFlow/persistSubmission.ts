import {inngest} from "@/inngest/client";
import {prisma} from "@/lib/prisma";
import {ReferenceType, SubmissionStatus} from "@/.generated/enums";
import {fileDelete} from "@/utils/operations";

export const persistSubmission = inngest.createFunction(
    {
        id: "persist-submission",
        retries: 5,
        onFailure: async ({event, error}) => {
            console.error("❌ Database persist failed.", error);
            const {paymentReceiptKey, dbId} = event.data.event.data;

            if (paymentReceiptKey) await fileDelete({key: paymentReceiptKey});

            if (dbId) {
                await prisma.submissions.update({
                    where: {id: dbId},
                    data: {
                        status: SubmissionStatus.FAILED,
                        failureReason: `Database Error: ${error.message}`
                    }
                });
            }
        }
    },
    {event: "submission.validated"},

    async ({event, step}) => {
        const {submissionData, paymentReceipt, paymentReceiptKey, dbId} = event.data;

        const record = await step.run("db-update-relations", async () => {
            let refType: ReferenceType = "WEBSITE";
            let refName = "NA";
            let refDesignation = "NA";
            const source = submissionData.referenceSource?.toUpperCase() || "";

            if (source.includes("WHATSAPP")) refType = "WHATSAPP_GROUP";
            else if (source.includes("SOCIAL")) refType = "SOCAIL_MEDIA";
            else if (source.includes("PERSON") || submissionData.referredPerson) refType = "PERSON";

            if (refType === "PERSON") {
                refName = submissionData.referredPerson?.trim() || "UNKNOWN";
                refDesignation = submissionData.referredPersonDesignation?.trim() || "UNKNOWN";
            }

            return prisma.submissions.update({
                where: {id: dbId},
                data: {
                    whatsappGroupJoined: submissionData.whatsappGroupJoined,
                    payment: {
                        create: {
                            upiId: submissionData.upiId || "N/A",
                            paymentDate: new Date(submissionData.paymentDate),
                            UpiImageUrl: paymentReceipt,
                            upiImageId: paymentReceiptKey,
                            amountPaid: parseFloat(submissionData.amountPaid),
                        }
                    },

                    submissionReference: {
                        connectOrCreate: {
                            where: {
                                type_personName: {
                                    type: refType,
                                    personName: refName,
                                }
                            },
                            create: {
                                type: refType,
                                personName: refName,
                                personDesignation: refDesignation,
                            }
                        }
                    },
                    status: SubmissionStatus.SAVED
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
                humanId: record.submissionId
            },
        });

        return {success: true, id: record.id};
    }
);