import {inngest} from "@/lib/inngest";
import {sendEmail} from "@/lib/mailer";
import SubmissionSuccessEmail from "@/emails/SubmissionSuccessEmail";

export const notifySubmission = inngest.createFunction(
    {id: "notify-submission"},
    {event: "submission.persisted"},

    async ({event, step}) => {
        const {email, submissionId, fullName, certificateType} = event.data;

        await step.run("send-welcome-email", async () => {
            await sendEmail({
                to: email,
                subject: "Registration Received - AgriLearn Nexus",
                template: SubmissionSuccessEmail({
                    fullName: fullName || "User",
                    submissionId: submissionId,
                    certificateType: certificateType || "General",
                }),
            });
        });

        return {success: true, sentTo: email};
    }
);