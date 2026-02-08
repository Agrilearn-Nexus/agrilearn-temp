/*
  Warnings:

  - A unique constraint covering the columns `[type,personName]` on the table `SubmissionReference` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SubmissionReference_type_personName_idx";

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionReference_type_personName_key" ON "SubmissionReference"("type", "personName");
