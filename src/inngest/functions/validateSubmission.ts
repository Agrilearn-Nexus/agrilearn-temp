import { inngest } from "@/lib/inngest";
import { validateForm } from "@/lib/validators";

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
