import {inngest} from "@/lib/inngest";
import {fileUpload} from "@/utils/operations";
import {getTempFile} from "@/utils/temp-storage";

export const uploadReceipt = inngest.createFunction(
    {id: "upload-receipt"},
    {event: "submission.received"},

    async ({event, step}) => {
        const {submissionId, receiptTempKey, submissionData, paymentData} = event.data;

        const receiptUrl = await step.run("upload-file", async () => {
            const tempFile = await getTempFile(receiptTempKey);
            // tempFile = { buffer, mimeType }

            const key = `payments/${submissionId}.${tempFile.mimeType.split("/")[1]}`;

            // 2️⃣ Upload to R2
            const {url} = await fileUpload({
                key,
                buffer: tempFile.buffer,
                contentType: tempFile.mimeType,
                metadata: {
                    submissionId,
                    workflow: "registration",
                    step: "upload",
                },
            });

            return url; // ✅ URL only
        });

        // 3️⃣ Emit next event
        await step.sendEvent(`file.uploaded`,
            {
                submissionId,
                submissionData,
                paymentData,
                receiptUrl,
            }
        );
    }
);
