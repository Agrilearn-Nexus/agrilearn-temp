import { registerSchema } from "./schemas/register";

export function validateForm(data: any) {
    registerSchema.parse(data);
}
