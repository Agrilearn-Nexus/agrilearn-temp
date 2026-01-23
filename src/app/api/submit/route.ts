import { inngest } from "@/lib/inngest"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()

    await inngest.send({
        name: "submission.created",
        data: body,
    })

    return NextResponse.json({
        success: true,
        queued: true,
        message: "Submission is being processed",
    })
}
