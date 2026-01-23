import {z} from "zod";

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const registerSchema = z.object({
    // Personal
    fullName: z.string().min(2),
    education: z.string().min(2),
    designation: z.string().min(2),
    college: z.string().min(2),
    university: z.string().min(2),

    whatsapp: z.string().regex(/^[0-9]{10}$/, "Enter valid 10-digit WhatsApp number"),
    email: z.string().email("Invalid email address"),

    postalAddress: z.string().min(5),
    city: z.string().min(2),
    district: z.string().min(2),
    postalCode: z.string().min(6),
    state: z.string().min(2),

    // Payment
    feeDetails: z.string().min(1),
    amountPaid: z.string().min(1), // keep string for FormData safety
    paymentDate: z.string().min(1),

    // File
    paymentReceipt: z
        .custom<FileList>()
        .refine((files) => files?.length === 1, "Payment receipt is required")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine(
            (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
            "Only JPG, PNG, PDF allowed"
        ),

    // Reference (MATCHES COMPONENT NAMES)
    referenceSource: z.string().min(1),
    referredPerson: z.string().optional(),

    // WhatsApp
    whatsappGroupJoined: z.literal(true, {
        message: "You must join the WhatsApp group",
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
