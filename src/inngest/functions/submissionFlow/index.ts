import { uploadReceipt } from "./uploadReceipt";
import { validateSubmission } from "./validateSubmission";
import { persistSubmission } from "./persistSubmission";
import { notifySubmission } from "./notifySubmission";

export const functions = [
    uploadReceipt,
    validateSubmission,
    persistSubmission,
    notifySubmission,
];
