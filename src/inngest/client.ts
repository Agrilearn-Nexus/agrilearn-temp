import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "registration-system",

    // Automatically detect environment
    isDev: process.env.NODE_ENV !== "production",

    // Only used in production
    baseUrl: process.env.INNGEST_BASE_URL,
    signingKey: process.env.INNGEST_SIGNING_KEY,
    eventKey: process.env.INNGEST_EVENT_KEY,
});
