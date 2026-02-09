import {z} from "zod";
import {ContactRole} from "@/.generated/enums";

export const ROLE_LABELS: Record<ContactRole, string> = {
    STUDENT: "Student",
    FARMER: "Farmer",
    PROFESSOR: "Professor / Researcher",
    ORGANIZATION: "Organization",
    OTHER: "Other",
};

// 3. The Validation Schema
export const contactSchema = z.object({
    name: z.string().trim().min(1, {message: "Full name is required"}),

    email: z
        .email({message: "Invalid email address"})
        .trim()
        .min(1, {message: "Email is required"}),

    phone: z
        .string()
        .trim()
        .min(1, {message: "Phone number is required"})
        .min(10, {message: "Phone number must be at least 10 digits"}),

    role: z.enum(ContactRole, {
        message: "Please select a valid role from the list",
    }),

    subject: z.string().trim().min(1, {message: "Subject is required"}),

    message: z.string().trim().min(10, {message: "Message must be at least 10 characters"}),
});

// 4. Infer the type automatically
export type ContactFormData = z.infer<typeof contactSchema>;