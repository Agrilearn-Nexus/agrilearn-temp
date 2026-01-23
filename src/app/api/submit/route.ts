import { inngest } from "@/lib/inngest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const body: Record<string, any> = {};

        // Handle fields
        formData.forEach((value, key) => {
            if (value instanceof File) {
                body[key] = {
                    name: value.name,
                    type: value.type,
                    size: value.size,
                };
            } else {
                body[key] = value;
            }
        });

        await inngest.send({
            name: "submission.created",
            data: body,
        });

        return NextResponse.json({
            success: true,
            queued: true,
            message: "Submission is being processed",
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}