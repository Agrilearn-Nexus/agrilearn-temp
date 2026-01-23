import { inngest } from "@/lib/inngest";
import { sendMail } from "@/lib/mailer";

export const notifySubmission = inngest.createFunction(
    { id: "notify-submission" },
    { event: "submission.persisted" },

    async ({ event, step }) => {
        await step.run("send-email", async () => {
            await sendMail(event.data.email);
        });

        await step.run("admin-alert", async () => {
            console.log("Admin notified for submission:", event.data.submissionId);
        });
    }
);
