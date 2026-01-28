import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { publicBaseUrl } from "@/lib/r2";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const submissionId = crypto.randomUUID();

        const { paymentReceipt, ...submissionData } = body;

        if (!paymentReceipt) {
            return NextResponse.json({ success: false, message: "Receipt file is required" }, { status: 400 });
        }

        // paymentReceipt is the R2 key (e.g. payments/uuid.jpg)
        const receiptUrl = `${publicBaseUrl}/${paymentReceipt}`;

        const paymentData = {
            amountPaid: submissionData.amountPaid,
            paymentDate: submissionData.paymentDate,
            upiId: submissionData.upiId,
        };

        // Trigger the Event
        await inngest.send({
            name: "submission.received",
            data: {
                submissionId,
                receiptUrl, // Full URL
                paymentReceiptKey: paymentReceipt, // Key, just in case
                submissionData,
                paymentData,
            },
        });

        return NextResponse.json({ success: true, queued: true });

    } catch (err) {
        console.error("Submission API Error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
