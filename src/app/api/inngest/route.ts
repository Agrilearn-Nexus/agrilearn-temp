import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { functions as submissionFunction } from "@/inngest/functions/submissionFlow";
import { orphanFileCleanUp } from "@/inngest/functions/cleanup/orphanCleanup";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [...submissionFunction, orphanFileCleanUp],
  streaming: "allow",
  serveHost: process.env.INNGEST_SERVE_HOST,
  servePath: process.env.INNGEST_SERVE_PATH,
});
