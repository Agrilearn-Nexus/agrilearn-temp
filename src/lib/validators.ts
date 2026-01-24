import { submissionSchema } from "./schemas/register";

export function validateForm(data: any) {
    return submissionSchema.parse(data);
}