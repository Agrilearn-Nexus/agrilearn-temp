import { inngest } from "@/lib/inngest"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import {fileUpload} from "@/utils/operations";

export const processSubmission = inngest.createFunction(
    {
        id: "process-submission",
        retries: 3,
    },
    { event: "submission.created" },

    async ({ event, step }) => {
        const {
            submissionData,
            paymentData,
            fileBase64,
            mime,
        } = event.data

        // STEP 1: Decode the file
        const buffer = Buffer.from(fileBase64, "base64")

        // STEP 2: Generate R2 key
        const key = `payments/${paymentData.upiId}/${randomUUID()}.${mime.split("/")[1]}`

        // STEP 3: Upload to R2
        await step.run("upload-to-r2", async () => {
            await fileUpload({
                key,
                buffer,
                contentType: mime,
            })
        })

        // STEP 4: DB Transaction
        const result = await step.run("create-records", async () => {
            return prisma.$transaction(async (tx) => {

                const payment = await tx.payment.create({
                    data: {
                        upiId: paymentData.upiId,
                        paymentDate: new Date(paymentData.paymentDate),
                        upiImageId: key,
                        UpiImageUrl: `https://<your-r2-domain>/${key}`,
                    },
                })

                const submission = await tx.submissions.create({
                    data: {
                        ...submissionData,
                        paymentId: payment.id,
                    },
                })

                return { payment, submission }
            })
        })

        return {
            success: true,
            ids: {
                paymentId: result.payment.id,
                submissionId: result.submission.id,
            },
        }
    }
)
