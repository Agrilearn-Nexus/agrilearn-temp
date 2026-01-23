import { S3Client } from "@aws-sdk/client-s3";

/**
 * Environment validation
 */
function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env variable: ${name}`);
    }
    return value;
}

/**
 * R2 Configuration
 */
export const R2_ENDPOINT = requireEnv("R2_ENDPOINT");
export const R2_ACCESS_KEY_ID = requireEnv("R2_ACCESS_KEY_ID");
export const R2_SECRET_ACCESS_KEY = requireEnv("R2_SECRET_ACCESS_KEY");
export const R2_BUCKET_NAME = requireEnv("R2_BUCKET_NAME");

/**
 * Public base URL (CDN / custom domain)
 * Example: https://cdn.yourdomain.com
 */
export const publicBaseUrl =
    process.env.R2_PUBLIC_BASE_URL ||
    R2_ENDPOINT.replace(/^https?:\/\//, "https://cdn.");

/**
 * R2 Client
 */
export const r2 = new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: false,
});

/**
 * Bucket name export
 */
export const bucketName = R2_BUCKET_NAME;
