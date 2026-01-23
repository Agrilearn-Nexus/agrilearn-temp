import { inngest } from "@/lib/inngest";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const submissionId = crypto.randomUUID();

        const receiptTempKey = `temp/${submissionId}`;


        const submissionData: Record<string, any> = {};
        formData.forEach((value, key) => {
            if (key !== "receipt") submissionData[key] = value.toString();
        });

        const paymentData = {
            amountPaid: formData.get("amountPaid")?.toString(),
            paymentDate: formData.get("paymentDate")?.toString(),
            upiId: formData.get("upiId")?.toString(),
        };

        await inngest.send({
            name: "submission.received",
            data: {
                submissionId,
                receiptTempKey,
                submissionData,
                paymentData,
            },
        });

        return NextResponse.json({ success: true, queued: true });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
