import {inngest} from "@/inngest/client";
import {NextResponse} from "next/server";
import {publicBaseUrl} from "@/lib/r2";
import {generateHumanId} from "@/utils/generators";
import {prisma} from "@/lib/prisma";
import {SubmissionStatus} from "@/.generated/enums"; // Ensure this matches your Prisma output

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {paymentReceipt: paymentReceiptKey, ...submissionData} = body;

        if (!paymentReceiptKey) {
            return NextResponse.json({success: false, message: "Receipt file is required"}, {status: 400});
        }

        // 1. Transaction: Generate ID and Create "Pending" Record immediately
        // This ensures validateSubmission has a record to update later.
        const submission = await prisma.$transaction(async (tx) => {
            const humanId = await generateHumanId(tx);

            return tx.submissions.create({
                data: {
                    submissionId: humanId, // The human readable ID
                    // Store minimal data required to identify the user if the flow fails
                    name: submissionData.fullName,
                    email: submissionData.email,
                    phone: submissionData.whatsapp,
                    whatsappNumber: submissionData.whatsapp,
                    status: SubmissionStatus.PROCESSING,
                    education: submissionData.education,
                    currentDesignation: submissionData.designation,
                    institute: submissionData.college,
                    organization: submissionData.university,
                    address: submissionData.postalAddress,
                    city: submissionData.city,
                    district: submissionData.district,
                    postalCode: submissionData.postalCode,
                    state: submissionData.state,
                    submissionDetail: submissionData.feeDetails,
                    submissionReferenceId: "TEMP_Or_Handle_Later",
                }
            });
        });

        const receiptUrl = `${publicBaseUrl}/${paymentReceiptKey}`;

        const paymentData = {
            amountPaid: submissionData.amountPaid,
            paymentDate: submissionData.paymentDate,
            upiId: submissionData.upiId,
        };

        await inngest.send({
            name: "submission.received",
            data: {
                dbId: submission.id,
                submissionId: submission.submissionId,
                receiptUrl,
                paymentReceiptKey,
                submissionData,
                paymentData,
            },
        });

        return NextResponse.json({success: true, queued: true, submissionId: submission.submissionId});

    } catch (err) {
        console.error("Submission API Error:", err);
        return NextResponse.json({success: false, error: "Failed to initialize submission"}, {status: 500});
    }
}