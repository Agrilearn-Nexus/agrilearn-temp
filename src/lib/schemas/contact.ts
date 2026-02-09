import {z} from "zod";

// 1. Define the strictly allowed values
export const CONTACT_ROLES = [
    "student",
    "farmer",
    "professor",
    "organization",
    "other"
] as const;

// 2. Define the user-friendly labels for the UI
export const ROLE_LABELS: Record<typeof CONTACT_ROLES[number], string> = {
    student: "Student",
    farmer: "Farmer",
    professor: "Professor / Researcher",
    organization: "Organization",
    other: "Other",
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

    role: z.enum(CONTACT_ROLES, {
        message: "Please select a valid role from the list",
    }),

    subject: z.string().trim().min(1, {message: "Subject is required"}),

    message: z.string().trim().min(10, {message: "Message must be at least 10 characters"}),
});

// 4. Infer the type automatically
export type ContactFormData = z.infer<typeof contactSchema>;