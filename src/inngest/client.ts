import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "registration-system",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
