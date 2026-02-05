-- DropIndex
DROP INDEX "Submissions_name_key";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "submissionDetail" TEXT NOT NULL DEFAULT 'N/A';
