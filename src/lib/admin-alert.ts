import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import AdminAlertEmail from "@/emails/AdminAlertEmail";

interface AlertOptions {
    source: string;
    error: any;
    submissionId?: string;
    context?: any;
}

export async function logAndAlert({ source, error, submissionId, context }: AlertOptions) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    try {
        // 1. Log to Database
        await prisma.errorLog.create({
            data: {
                source,
                message: errorMessage,
                stack: errorStack,
                submissionId,
                metadata: context ? JSON.parse(JSON.stringify(context)) : undefined,
            }
        });

        const adminEmail = process.env.ADMIN_EMAIL! ;

        await sendEmail({
            to: adminEmail,
            subject: `🚨 Alert: Error in ${source}`,
            template: AdminAlertEmail({
                source,
                errorMessage,
                errorStack,
                submissionId,
                time: new Date().toLocaleString(),
                metadata: context
            })
        });

    } catch (loggingError) {
        console.error("CRITICAL: Failed to log error or send alert:", loggingError);
    }
}