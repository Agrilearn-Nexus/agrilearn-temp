import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, bucketName } from "@/lib/r2";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { filename, contentType } = await req.json();

        if (!filename || !contentType) {
            return NextResponse.json({ error: "Filename and contentType are required" }, { status: 400 });
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(contentType)) {
            return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
        }

        const submissionId = crypto.randomUUID();
        const extension = filename.split(".").pop();
        const key = `payments/${submissionId}.${extension}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
        });

        // Expires in 5 minutes
        const signedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });

        return NextResponse.json({ url: signedUrl, key });
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
