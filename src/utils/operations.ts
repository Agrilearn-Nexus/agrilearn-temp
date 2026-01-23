import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, r2 } from "@/lib/r2";

/**
 * Represents a file uploaded to the application.
 * It contains information about the file's key, its buffer data, and its MIME type.
 */
interface FileUpload {
    key: string;
    buffer: Buffer;
    contentType: string;
}

/**
 * Handles the upload of a file to the configured R2 storage bucket.
 *
 * This asynchronous function sends a file to the object storage by utilizing
 * the R2 client. It uploads the provided file buffer with the associated key
 * and content type.
 *
 * @param {Object} params - The parameters required for the file upload.
 * @param {string} params.key - The unique identifier for the object in the storage bucket.
 * @param {Buffer} params.buffer - The buffer containing the file data to be uploaded.
 * @param {string} params.contentType - The MIME type of the file being uploaded.
 * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded.
 */
export const fileUpload = async ({
                                     key,
                                     buffer,
                                     contentType,
                                 }: FileUpload): Promise<void> => {
    await r2.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        }),
    );
};

/**
 * Asynchronously deletes a file from an S3-compatible storage bucket.
 *
 * @param {Object} params - The parameters for the file deletion.
 * @param {string} params.key - The unique identifier (key) of the file to be deleted within the bucket.
 * @returns {Promise<void>} A promise that resolves when the file has been successfully deleted.
 * @throws An error if the deletion operation fails.
 */
export const fileDelete = async ({ key }: { key: string }): Promise<void> => {
    await r2.send(
        new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        }),
    );
};