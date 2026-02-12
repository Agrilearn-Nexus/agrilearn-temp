"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { fileDelete } from "@/utils/operations";
import { sendEmail } from "@/lib/mailer";
import SubmissionSuccessEmail from "@/emails/SubmissionSuccessEmail";
import { SubmissionStatus } from "@/.generated/enums";
import {
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ObjectIdentifier,
} from "@aws-sdk/client-s3";
import { bucketName, r2 } from "@/lib/r2";

export async function deleteSubmission(id: string) {
  try {
    await prisma.$transaction(async (tx) => {
      const submission = await tx.submissions.findUnique({
        where: { id },
        include: { payment: true },
      });

      if (!submission) throw new Error("Submission not found");

      const referenceId = submission.submissionReferenceId;
      const receiptKey = submission.payment?.upiImageId;

      await tx.submissions.delete({ where: { id } });

      const count = await tx.submissions.count({
        where: { submissionReferenceId: referenceId },
      });

      if (count === 0) {
        await tx.submissionReference.delete({
          where: {
            id: referenceId,
          },
        });
      }

      if (receiptKey) {
        await fileDelete({ key: receiptKey });
      }
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete:", error);
    return { success: false, error: "Failed to delete submission" };
  }
}

export async function resendSubmissionEmail(submissionId: string) {
  try {
    const submission = await prisma.submissions.findUnique({
      where: { id: submissionId },
    });

    if (!submission || !submission.email) {
      return { success: false, error: "Submission or Email not found" };
    }

    await sendEmail({
      to: submission.email,
      subject: "Registration Confirmed - AgriLearn Nexus",
      template: SubmissionSuccessEmail({
        submissionId: submissionId,
        fullName: submission.name,
        certificateType: submission.submissionDetail,
      }),
    });

    await prisma.submissions.update({
      where: { id: submissionId },
      data: {
        status: SubmissionStatus.COMPLETED,
        failureReason: null,
      },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to resend email" };
  }
}

export async function scanOrphanedFiles() {
  // A. Fetch all file keys from R2
  try {
    let isTruncated = true;
    let continuationToken: string | undefined = undefined;
    const allR2Keys: string[] = [];

    while (isTruncated) {
      const params: ListObjectsV2CommandInput = {
        Bucket: bucketName,
        ContinuationToken: continuationToken,
        Prefix: "payments/",
      };
      const command = new ListObjectsV2Command(params);
      const response = await r2.send(command);

      if (response.Contents) {
        response.Contents.forEach((item) => {
          if (item.Key) allR2Keys.push(item.Key);
        });
      }
      isTruncated = response.IsTruncated || false;
      continuationToken = response.NextContinuationToken;
    }

    // B. Fetch all valid keys from Database
    const payments = await prisma.payment.findMany({
      select: { upiImageId: true },
      where: { upiImageId: { not: null } },
    });
    const dbKeys = new Set(payments.map((p) => p.upiImageId));

    // C. Identify Orphans (Exists in R2 but NOT in DB)
    const orphans = allR2Keys.filter(
      (key) => !dbKeys.has(key) && key.length > 0 && !key.endsWith("/"),
    );
    return {
      success: true,
      totalR2: allR2Keys.length,
      totalDB: dbKeys.size,
      orphans,
    };
  } catch (error) {
    console.error("Scan Error:", error);
    return { success: false, error: "Failed to scan storage" };
  }
}

// 2. Delete Specific Orphans

export async function deleteOrphanedFiles(keys: string[]) {
  try {
    if (keys.length === 0) return { success: true, count: 0 };
    console.log(`Deleting ${keys.length} orphan files`);

    const deleteParams: DeleteObjectsCommandInput = {
      Bucket: bucketName,
      Delete: {
        Objects: keys.map((key): ObjectIdentifier => ({ Key: key })),
        Quiet: true,
      },
    };
    await r2.send(new DeleteObjectsCommand(deleteParams));
    console.log(`Deleted ${keys.length} orphan files`);
    revalidatePath("/admin/dashboard");
    return { success: true, count: keys.length };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Failed to delete files" };
  }
}
