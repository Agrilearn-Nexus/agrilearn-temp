/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Submissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[submissionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `submissionId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_paymentId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "submissionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "paymentId";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_submissionId_key" ON "Payment"("submissionId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
