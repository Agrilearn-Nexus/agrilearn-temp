import {inngest} from "@/inngest/client";
import {sendEmail} from "@/lib/mailer";
import SubmissionSuccessEmail from "@/emails/SubmissionSuccessEmail";
import {prisma} from "@/lib/prisma";
import {SubmissionStatus} from "@/.generated/enums";
import {logAndAlert} from "@/lib/admin-alert";

export const notifySubmission = inngest.createFunction(
    {
        id: "notify-submission",
        retries: 3,
        onFailure: async ({event, error}) => {
            const {submissionId} = event.data.event.data;
            console.error("❌ Notification failed:", error);
            if (submissionId) {
                await prisma.submissions.update({
                    where: {id: submissionId},
                    data: {
                        failureReason: `Email Sending Failed: ${error.message}`
                    }
                });
            }

            await logAndAlert({
                source: "notify-submission",
                error,
                submissionId,
                context: {
                    humanId: submissionId,
                    eventData: event.data
                }
            })
        }
    },
    {event: "submission.persisted"},

    async ({event, step}) => {
        const {email, submissionId, name, humanId} = event.data;

        // 1. Send the Email
        await step.run("send-welcome-email", async () => {
            await sendEmail({
                to: email,
                subject: "Registration Confirmed - AgriLearn Nexus",
                template: SubmissionSuccessEmail({
                    fullName: name || "User",
                    submissionId: humanId || submissionId,
                    certificateType: "General Participation",
                }),
            });
        });

        await step.run("mark-confirmed", async () => {
            await prisma.submissions.update({
                where: {id: submissionId},
                data: {status: SubmissionStatus.COMPLETED}
            });
        });

        return {success: true, sentTo: email};
    }
);