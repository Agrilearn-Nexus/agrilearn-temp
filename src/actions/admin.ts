"use server";

import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {fileDelete} from "@/utils/operations";

export async function deleteSubmission(id: string) {
    try {
        const submission = await prisma.submissions.findUnique({
            where: {id},
            include: {payment: true}
        });

        if (!submission) return {success: false, error: "Submission not found"};

        await prisma.submissions.delete({
            where: {id}
        });

        await fileDelete({key: submission?.payment?.upiImageId!})

        revalidatePath("/admin/dashboard");
        return {success: true};
    } catch (error) {
        console.error("Failed to delete:", error);
        return {success: false, error: "Failed to delete submission"};
    }
}