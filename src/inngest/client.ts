import {Inngest} from "inngest";

export const inngest = new Inngest({
    id: "registration-system",
    baseUrl: process.env.INNGEST_BASE_URL,
    // signingKey: process.env.INNGEST_SIGNING_KEY,
    // eventKey:process.env.INNGEST_EVENT_KEY,
    isDev: process.env.NODE_ENV === "development",
});
