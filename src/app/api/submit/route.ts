import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { saveTempFile } from "@/utils/temp-storage";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const submissionId = crypto.randomUUID();

        // 1. Extract the file
        const file = formData.get("receipt") as File | null;
        if (!file) {
            return NextResponse.json({ success: false, message: "Receipt file is required" }, { status: 400 });
        }

        // 2. Save to local disk (Fast I/O) - This avoids the network latency of R2
        const receiptTempKey = `${submissionId}`;
        await saveTempFile(receiptTempKey, file);

        // 3. Extract other data
        const submissionData: Record<string, any> = {};
        formData.forEach((value, key) => {
            if (key !== "receipt") submissionData[key] = value.toString();
        });

        const paymentData = {
            amountPaid: formData.get("amountPaid")?.toString(),
            paymentDate: formData.get("paymentDate")?.toString(),
            upiId: formData.get("upiId")?.toString(),
        };

        // 4. Trigger the Event (Worker picks up the file using receiptTempKey)
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
        console.error("Submission API Error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}