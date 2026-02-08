import {inngest} from "@/inngest/client";
import {validateForm} from "@/lib/validators";
import {fileDelete} from "@/utils/operations";
import {prisma} from "@/lib/prisma";
import {SubmissionStatus} from "@/.generated/client";

export const validateSubmission = inngest.createFunction(
    {
        id: "validate-submission",
        retries: 3,
        onFailure: async ({event, error}) => {
            console.error("Validation failed. Cleaning up...", error);
            const {paymentReceiptKey, dbId} = event.data.event.data;

            if (paymentReceiptKey) await fileDelete({key: paymentReceiptKey});

            if (dbId) {
                await prisma.submissions.update({
                    where: {id: dbId},
                    data: {status: SubmissionStatus.FAILED}
                });
            }
        }
    },
    {event: "submission.received"},
    async ({event, step}) => {
        const {dbId, submissionData, paymentData, receiptUrl} = event.data;

        // 1. Mark as Validating
        await step.run("mark-validating", async () => {
            await prisma.submissions.update({
                where: {id: dbId},
                data: {status: SubmissionStatus.VALIDATING}
            });
        });

        // 2. Run Logic
        const validatedData = await step.run("schema-validation", async () => {
            const rawData = {
                ...submissionData,
                ...paymentData,
                paymentReceipt: receiptUrl,
            };
            // Ensure this throws an error if invalid, otherwise onFailure won't trigger
            return validateForm(rawData);
        });

        // 3. Send Success Event
        await step.sendEvent("emit-submission-validated", {
            name: "submission.validated",
            data: {
                ...event.data, // Pass through dbId and other props
                ...validatedData,
            },
        });

        return {success: true};
    }
);