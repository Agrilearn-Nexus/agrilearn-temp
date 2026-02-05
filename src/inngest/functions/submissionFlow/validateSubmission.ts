import {inngest} from "@/inngest/client";
import {validateForm} from "@/lib/validators";
import {fileDelete} from "@/utils/operations";

export const validateSubmission = inngest.createFunction(
    {
        id: "validate-submission",
        retries: 3,
        onFailure: async ({event, error}) => {
            console.error("Validation failed - - Cleaning up R2...", error);
            const key = event.data.event.data.paymentData.paymentReceiptKey;
            if (key) {
                await fileDelete(key);
            }
        }
    },
    {event: "submission.received"},
    async ({event, step}) => {

        const validatedData = await step.run("schema-validation", async () => {
            const {submissionData, paymentData, receiptUrl} = event.data;

            const rawData = {
                ...submissionData,
                ...paymentData,
                paymentReceipt: receiptUrl,
            };

            return validateForm(rawData);
        });

        await step.sendEvent("emit-submission-validated", {
            name: "submission.validated",
            data: {
                ...event.data,
                ...validatedData,
                paymentReceipt: event.data.receiptUrl, // Pass it forward
            },
        });

        return {success: true};
    }
);
