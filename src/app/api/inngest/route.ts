import {serve} from "inngest/next";
import {inngest} from "@/inngest/client";
import {functions as submissionFunction} from "@/inngest/functions/submissionFlow";

export const {GET, POST, PUT} = serve({
    client: inngest,
    functions: [
        ...submissionFunction,
    ],
    serveHost: process.env.INNGEST_SERVE_HOST,
    servePath: process.env.INNGEST_SERVE_PATH,
});