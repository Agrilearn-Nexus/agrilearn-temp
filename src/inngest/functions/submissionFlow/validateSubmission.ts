import { inngest } from "@/inngest/client";
import { validateForm } from "@/lib/validators";

export const validateSubmission = inngest.createFunction(
    { id: "validate-submission" },
    { event: "file.uploaded" },
    async ({ event, step }) => {

        const validatedData = await step.run("schema-validation", async () => {
            const { submissionData, paymentData } = event.data;

            const rawData = {
                ...submissionData,
                ...paymentData,
                paymentReceipt: event.data.fileUrl || event.data.paymentReceipt,
            };

            return validateForm(rawData);
        });

        await step.sendEvent("emit-submission-validated", {
            name: "submission.validated",
            data: {
                ...event.data,
                ...validatedData
            },
        });

        return { success: true };
    }
);