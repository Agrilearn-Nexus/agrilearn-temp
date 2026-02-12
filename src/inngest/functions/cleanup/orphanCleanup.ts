import { inngest } from "@/inngest/client";
import { bucketName, r2 } from "@/lib/r2";
import { prisma } from "@/lib/prisma";
import {
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ObjectIdentifier,
} from "@aws-sdk/client-s3";

export const orphanFileCleanUp = inngest.createFunction(
  { id: `orphan-file-cleanup` },
  { cron: "30 21 * * *" },

  async ({ step }) => {
    // 1. Fetch all file keys from R2
    const r2Files = await step.run("fetch-all-r2-keys", async () => {
      let isTruncated = true;
      let continuationToken: string | undefined = undefined;
      const allKeys: string[] = [];

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
            if (item.Key) allKeys.push(item.Key);
          });
        }
        isTruncated = response.IsTruncated || false;
        continuationToken = response.NextContinuationToken;
      }
      return allKeys;
    });

    // 2. Fetch all valid keys from Database
    const dbFileArray = (await step.run("fetch-db-keys", async () => {
      const payments = await prisma.payment.findMany({
        select: { upiImageId: true },
        where: { upiImageId: { not: null } },
      });

      return payments
        .map((payement) => payement.upiImageId)
        .filter((id: string | null): id is string => Boolean(id));
    })) as string[];

    const dbFiles = new Set<string>(dbFileArray);

    // 3. Identify Orphans (Exists in R2 but NOT in DB)
    const orphans = r2Files.filter((key) => !dbFiles.has(key));
    if (orphans.length === 0) {
      return { message: `No orphaned File Foud!` };
    }

    // 4. Delete Orphans in Batches (S3 limit is 1000 per request)
    await step.run(`delete-orphans`, async () => {
      const BATCH_SIZE = 1000;
      for (let i = 0; i < orphans.length; i += BATCH_SIZE) {
        const batch = orphans.slice(i, i + BATCH_SIZE);

        const safeBatch = batch.filter((key) => !dbFiles.has(key));

        console.log(`Deleting ${safeBatch.length} orphan files`);

        const deleteParams: DeleteObjectsCommandInput = {
          Bucket: bucketName,
          Delete: {
            Objects: safeBatch.map((key): ObjectIdentifier => ({ Key: key })),
            Quiet: true,
          },
        };

        await r2.send(new DeleteObjectsCommand(deleteParams));
        console.log(`Deleted ${safeBatch.length} orphan files`);
      }
    });

    return {
      success: true,
      totalR2Files: r2Files.length,
      validDBFiles: dbFiles.size,
      deletedOrphans: orphans.length,
    };
  },
);
