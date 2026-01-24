import { inngest } from "@/inngest/client";
import { fileUpload } from "@/utils/operations";
import { getTempFile, deleteTempFile } from "@/utils/temp-storage";

export const uploadReceipt = inngest.createFunction(
    { id: "upload-receipt" },
    { event: "submission.received" },

    async ({ event, step }) => {
        const { submissionId, receiptTempKey, submissionData, paymentData } = event.data;

        // Step 1: Upload to R2
        const receiptUrl = await step.run("upload-to-r2", async () => {
            const tempFile = await getTempFile(receiptTempKey);

            const key = `payments/${submissionId}.${tempFile.extension}`;

            const { url } = await fileUpload({
                key,
                buffer: tempFile.buffer,
                contentType: tempFile.mimeType,
                metadata: {
                    submissionId,
                    type: "receipt",
                },
            });

            return url;
        });

        // Step 2: Cleanup
        await step.run("cleanup-temp-file", async () => {
            await deleteTempFile(receiptTempKey);
        });

        // Step 3: Emit the next event
        await step.sendEvent("emit-file-uploaded", {
            name: "file.uploaded",
            data: {
                submissionId,
                submissionData,
                paymentData,
                receiptUrl,
            }
        });

        return { success: true, receiptUrl };
    }
);