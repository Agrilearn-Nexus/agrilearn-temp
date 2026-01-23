import {S3Client} from "@aws-sdk/client-s3";

export const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

/**
 * The name of the bucket used for storage, retrieved from the environment variable `R2_BUCKET_NAME`.
 * This value is required and expected to be defined in the environment configuration.
 */
export const bucketName = process.env.R2_BUCKET_NAME;