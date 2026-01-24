import { validateForm } from "@/lib/validators";
import {inngest} from "@/inngest/client";

export const validateSubmission = inngest.createFunction(
    { id: "validate-submission" },
    { event: "file.uploaded" },

    async ({ event, step }) => {
        await step.run("schema-validation", async () => {
            validateForm(event.data.submissionData);
        });

        await step.sendEvent("submission.validated", event.data);
    }
);
