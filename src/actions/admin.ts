"use server";

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {fileDelete} from "@/utils/operations";
import {sendEmail} from "@/lib/mailer";
import SubmissionSuccessEmail from "@/emails/SubmissionSuccessEmail";
import {SubmissionStatus} from "@/.generated/enums";

export async function deleteSubmission(id: string) {
    try {

        await prisma.$transaction(async (tx) => {
            const submission = await tx.submissions.findUnique({
                where: {id},
                include: {payment: true}
            });

            if (!submission) throw new Error("Submission not found");

            const referenceId = submission.submissionReferenceId;
            const receiptKey = submission.payment?.upiImageId;

            await tx.submissions.delete({where: {id}});

            const count = await tx.submissions.count({
                where: {submissionReferenceId: referenceId}
            })

            if (count === 0) {
                await tx.submissionReference.delete({
                    where: {
                        id: referenceId
                    }
                })
            }

            if (receiptKey) {
                await fileDelete({key: receiptKey})
            }
        })

        revalidatePath("/admin/dashboard");
        return {success: true};
    } catch (error) {
        console.error("Failed to delete:", error);
        return {success: false, error: "Failed to delete submission"};
    }
}

export async function resendSubmissionEmail(submissionId: string) {
    try {
        const submission = await prisma.submissions.findUnique({where: {id: submissionId}});

        if (!submission || !submission.email) {
            return {success: false, error: "Submission or Email not found"};
        }

        await sendEmail({
            to: submission.email,
            subject: "Registration Confirmed - AgriLearn Nexus",
            template: SubmissionSuccessEmail({
                submissionId: submissionId,
                fullName: submission.name,
                certificateType: submission.submissionDetail
            })
        })

        await prisma.submissions.update({
            where: {id: submissionId},
            data: {
                status: SubmissionStatus.COMPLETED,
                failureReason: null
            }
        })

        revalidatePath("/admin/dashboard");
        return {success: true};

    } catch (err) {
        return {success: false, error: "Failed to resend email"};
    }
}