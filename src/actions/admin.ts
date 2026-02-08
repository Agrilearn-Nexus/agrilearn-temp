"use server";

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {fileDelete} from "@/utils/operations";

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