"use server";
import {prisma} from "@/lib/prisma";

export async function checkStatus(submissionId: string) {
    try {
        const record = await prisma.submissions.findUnique({
            where: {submissionId: submissionId},
            select: {
                name: true,
                status: true,
                institute: true,
                failureReason: true
            }
        });

        if (!record) return {success: false, error: "Application ID not found."};
        return {success: true, data: record};
    } catch (err) {
        return {success: false, error: `Unable to check status right now. Please try again later`};
    }
}