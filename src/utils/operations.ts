import { DeleteObjectCommand, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, r2, publicBaseUrl } from "@/lib/r2";

/**
 * Represents a file upload payload
 */
interface FileUpload {
    key: string;
    buffer: Buffer;
    contentType: string;
    metadata?: Record<string, string>;
}

/**
 * Upload file to R2 and return public URL
 */
export const fileUpload = async ({
                                     key,
                                     buffer,
                                     contentType,
                                     metadata = {},
                                 }: FileUpload): Promise<{ key: string; url: string }> => {
    await r2.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType,
            Metadata: metadata,
        })
    );

    const url = `${publicBaseUrl}/${key}`;

    return { key, url };
};

/**
 * Delete file from R2
 */
export const fileDelete = async ({ key }: { key: string }): Promise<void> => {
    await r2.send(
        new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        })
    );
};

/**
 * Check if file exists (idempotency helper)
 */
export const fileExists = async (key: string): Promise<boolean> => {
    try {
        await r2.send(
            new HeadObjectCommand({
                Bucket: bucketName,
                Key: key,
            })
        );
        return true;
    } catch {
        return false;
    }
};
