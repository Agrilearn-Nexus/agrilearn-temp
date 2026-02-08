/*
  Warnings:

  - A unique constraint covering the columns `[submissionId]` on the table `Submissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `submissionId` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PROCESSING', 'VALIDATING', 'SAVED', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "status" "SubmissionStatus" NOT NULL DEFAULT 'PROCESSING',
ADD COLUMN     "submissionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "EventCounter" (
    "year" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EventCounter_pkey" PRIMARY KEY ("year")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_submissionId_key" ON "Submissions"("submissionId");
