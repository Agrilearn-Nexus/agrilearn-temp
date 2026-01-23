import {z} from "zod";

// limit file size to 5MB
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const registerSchema = z.object({
    // Personal Details
    fullName: z.string().min(2, "Full Name is required"),
    education: z.string().min(2, "Education is required"),
    designation: z.string().min(2, "Designation is required"),
    college: z.string().min(2, "College/Institute is required"),
    university: z.string().min(2, "University/Organization is required"),
    whatsapp: z
        .string()
        .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit WhatsApp number"),
    email: z.email("Invalid email address"),
    postalAddress: z.string().min(5, "Postal Address is required"),
    city: z.string().min(2, "City is required"),
    district: z.string().min(2, "District is required"),
    postalCode: z.string().min(6, "Valid PIN Code is required"),
    state: z.string().min(2, "State is required"),

    // Payment Details
    feeDetails: z.string().min(1, "Please select a certificate type"),
    amountPaid: z.string().min(1, "Amount is required"),
    paymentDate: z.string().min(1, "Payment Date is required"),

    // File Validation
    paymentReceipt: z
        .any()
        .refine((files) => files?.length > 0, "Payment receipt is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .pdf files are accepted."
        ),

    referenceType: z.enum(["SOCIAL_MEDIA", "WHATSAPP_GROUP", "PERSON", "WEBSITE", "MAIL"]).optional(),
    referencePersonName: z.string().optional(),

    // Confirmation
    whatsappConsent: z.boolean().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;