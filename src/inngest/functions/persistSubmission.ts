import { inngest } from "@/lib/inngest";
import {prisma} from "@/lib/prisma";
export const persistSubmission = inngest.createFunction(
    { id: "persist-submission" },
    { event: "submission.validated" },

    async ({ event, step }) => {
        const record = await step.run("db-save", async () => {
            return prisma.submissions.create({
                data: {
                    submissionId: event.data.submissionId,
                    ...event.data.submissionData,
                    receiptUrl: event.data.receiptUrl,
                },
            });
        });

        await step.sendEvent("submission.persisted", {
            submissionId: record.id,
            email: event.data.submissionData.email,
        });
    }
);
