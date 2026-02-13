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
  { cron: "TZ=Asia/Kolkata 0 3 * * *" },

  async ({ step }) => {
    const startTime = Date.now();
    let totalR2Files = 0;
    let deletedCount = 0;
    let validDBFilesCount = 0;
    const deletedKeys: string[] = [];

    try {
      // 1. Fetch all file keys from R2
      const r2Files = await step.run("fetch-all-r2-keys", async () => {
        let isTruncated = true;
        let continuationToken: string | undefined = undefined;
        const allKeys: string[] = [];

        while (isTruncated) {
          const params: ListObjectsV2CommandInput = {
            Bucket: bucketName,
            ContinuationToken: continuationToken,
            Prefix: "payments/", // Kept from base code
          };
          const command = new ListObjectsV2Command(params);
          const response = await r2.send(command);

          if (response.Contents) {
            response.Contents.forEach((item) => {
              if (item.Key && !item.Key.endsWith("/")) {
                allKeys.push(item.Key);
              }
            });
          }
          isTruncated = response.IsTruncated || false;
          continuationToken = response.NextContinuationToken;
        }
        return allKeys;
      });

      totalR2Files = r2Files.length;

      // 2. Fetch all valid keys from Database
      const dbFileArray = (await step.run("fetch-db-keys", async () => {
        const payments = await prisma.payment.findMany({
          select: { upiImageId: true },
          where: { upiImageId: { not: null } },
        });

        return payments
          .map((payment) => payment.upiImageId)
          .filter((id: string | null): id is string => Boolean(id));
      })) as string[];

      const dbFiles = new Set<string>(dbFileArray);
      validDBFilesCount = dbFiles.size;

      // 3. Identify Orphans (Exists in R2 but NOT in DB)
      const orphans = r2Files.filter((key) => !dbFiles.has(key));

      // 4. Delete Orphans in Batches
      if (orphans.length > 0) {
        await step.run(`delete-orphans`, async () => {
          const BATCH_SIZE = 1000;
          for (let i = 0; i < orphans.length; i += BATCH_SIZE) {
            const batch = orphans.slice(i, i + BATCH_SIZE);

            // Double check safety (optional, but kept from base logic spirit)
            const safeBatch = batch.filter((key) => !dbFiles.has(key));

            if (safeBatch.length > 0) {
              const deleteParams: DeleteObjectsCommandInput = {
                Bucket: bucketName,
                Delete: {
                  Objects: safeBatch.map(
                    (key): ObjectIdentifier => ({ Key: key }),
                  ),
                  Quiet: true,
                },
              };

              await r2.send(new DeleteObjectsCommand(deleteParams));

              // Track for logging
              deletedKeys.push(...safeBatch);
            }
          }
        });
        deletedCount = deletedKeys.length;
      }

      // 5. Log Success to DB (New Logic)
      await step.run("log-cleanup-success", async () => {
        await prisma.cleanupLog.create({
          data: {
            status: "SUCCESS",
            totalR2Files: totalR2Files,
            linkedDbFiles: validDBFilesCount,
            orphansFound: orphans.length,
            deletedCount: deletedCount,
            durationMs: Date.now() - startTime,
            logs: { deletedFiles: deletedKeys },
          },
        });
      });

      return {
        success: true,
        totalR2Files,
        validDBFiles: validDBFilesCount,
        deletedOrphans: deletedCount,
      };
    } catch (error: any) {
      // 6. Log Failure to DB (New Logic)
      await step.run("log-cleanup-failure", async () => {
        await prisma.cleanupLog.create({
          data: {
            status: "FAILED",
            totalR2Files: totalR2Files, // Logs whatever was counted before fail
            linkedDbFiles: validDBFilesCount,
            orphansFound: 0,
            deletedCount: deletedCount, // Logs whatever was deleted before fail
            durationMs: Date.now() - startTime,
            logs: { error: error.message, stack: error.stack },
          },
        });
      });

      throw error; // Re-throw to ensure Inngest registers the failure
    }
  },
);
