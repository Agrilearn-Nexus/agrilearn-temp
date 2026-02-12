import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { publicBaseUrl } from "@/lib/r2";
import { generateHumanId } from "@/utils/generators";
import { prisma } from "@/lib/prisma";
import { ReferenceType, SubmissionStatus } from "@/.generated/enums";
import { Prisma } from "@/.generated/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(`body: `, body);
    const { paymentReceipt: paymentReceiptKey, ...submissionData } = body;

    const referenceSource = submissionData.referenceSource;
    const referredPerson = submissionData.referredPerson;
    const referredDesignation = submissionData.referredPersonDesignation;

    if (!paymentReceiptKey) {
      return NextResponse.json(
        { success: false, message: "Receipt file is required" },
        { status: 400 },
      );
    }

    if (!Object.values(ReferenceType).includes(referenceSource)) {
      return NextResponse.json(
        { success: false, message: `Invalid Reference Type` },
        { status: 400 },
      );
    }

    const isPerson = referenceSource === ReferenceType.PERSON;

    if (isPerson && !referredPerson) {
      return NextResponse.json(
        { success: false, message: `Person Name Required` },
        { status: 400 },
      );
    }

    const referenceConnectOrCreate: Prisma.SubmissionReferenceCreateOrConnectWithoutSubmissionsInput =
      {
        where: {
          type_personName: {
            type: referenceSource,
            personName: isPerson ? referredPerson : `NA`,
          },
        },
        create: {
          type: referenceSource,
          personName: isPerson ? referredPerson : `NA`,
          personDesignation: isPerson ? referredDesignation : `NA`,
        },
      };

    const submission = await prisma.$transaction(
      async (tx) => {
        const humanId = await generateHumanId(tx);

        return tx.submissions.create({
          data: {
            submissionId: humanId,
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

            submissionReference: {
              connectOrCreate: referenceConnectOrCreate,
            },
          },
        });
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );

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

    return NextResponse.json({
      success: true,
      queued: true,
      submissionId: submission.submissionId,
    });
  } catch (err) {
    console.error("Submission API Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to initialize submission" },
      { status: 500 },
    );
  }
}
