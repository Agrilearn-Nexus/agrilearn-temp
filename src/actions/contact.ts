"use server";

import {contactSchema, type ContactFormData} from "@/lib/schemas/contact";
import {sendEmail} from "@/lib/mailer";
import ContactSubmissionEmail from "@/emails/ContactSubmissionEmail";
import {ContactRole as PrismaRole} from "@/.generated/client"
import {prisma} from "@/lib/prisma";

export async function submitContactForm(data: ContactFormData) {
    try {
        const result = contactSchema.safeParse(data);

        if (!result.success) {
            return {success: false, error: "Invalid form data"};
        }

        const {name, email, phone, role, subject, message} = result.data;

        // 2. Send Email to Admin (You)
        await sendEmail({
            to: process.env.ADMIN_EMAIL!,
            subject: `[New Contact] ${subject} - ${name}`,
            template: ContactSubmissionEmail({
                name, email, phone, role, subject, message
            }),
        });

        await prisma?.contactSubmission.create({
            data: {
                email,
                name,
                phone,
                role: role as PrismaRole,
                subject,
                message,
            }
        })

        return {success: true};

    } catch (error) {
        console.error("Contact Form Error:", error);
        return {success: false, error: "Failed to send message. Please try again."};
    }
}