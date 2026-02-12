import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
export const referenceTypes = [
  "SOCAIL_MEDIA",
  "WHATSAPP_GROUP",
  "PERSON",
  "WEBSITE",
  "MAIL",
] as const;

const baseSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    education: z.string().min(2, "Education is required"),
    designation: z.string().min(2, "Designation is required"),
    college: z.string().min(2, "College is required"),
    university: z.string().min(2, "University is required"),

    whatsapp: z
      .string()
      .regex(/^[0-9]{10}$/, "Enter valid 10-digit WhatsApp number"),
    email: z.email("Invalid email address"),

    postalAddress: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    district: z.string().min(2, "District is required"),
    postalCode: z.string().min(6, "Postal code is required"),
    state: z.string().min(2, "State is required"),

    feeDetails: z.string().min(1, "Fee details are required"),
    amountPaid: z.string().min(1, "Amount paid is required"),
    paymentDate: z.string().min(1, "Payment date is required"),
    upiId: z.string().optional(),

    referenceSource: z.enum(referenceTypes),
    referredPerson: z.string().optional(),
    referredDesignation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.referenceSource === "PERSON") {
      if (!data.referredPerson || data.referredPerson.length < 2) {
        ctx.addIssue({
          path: ["referredPerson"],
          message: "Person Name Required",
          code: `custom`,
        });
      }
    }
  });

export const registerSchema = baseSchema.extend({
  paymentReceipt: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Payment receipt is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB",
    )
    .refine(
      (files) => ACCEPTED_TYPES.includes(files?.[0]?.type),
      "Only JPG, PNG, PDF allowed",
    ),
  whatsappGroupJoined: z.literal(true, {
    message: "You must join the WhatsApp group",
  }),
});

export const submissionSchema = baseSchema.extend({
  paymentReceipt: z.string().optional(),

  whatsappGroupJoined: z.literal(true, {
    message: "You must join the WhatsApp group",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
