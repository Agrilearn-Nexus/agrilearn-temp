import { validateSubmission } from "./validateSubmission";
import { persistSubmission } from "./persistSubmission";
import { notifySubmission } from "./notifySubmission";

export const functions = [
    validateSubmission,
    persistSubmission,
    notifySubmission,
];
