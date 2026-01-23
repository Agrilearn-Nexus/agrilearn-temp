-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('SOCAIL_MEDIA', 'WHATSAPP_GROUP', 'PERSON', 'WEBSITE', 'MAIL');

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "currentDesignation" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "submissionReferenceId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionReference" (
    "id" TEXT NOT NULL,
    "type" "ReferenceType" NOT NULL,
    "personName" TEXT,
    "personDesignation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmissionReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "upiId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "upiImageId" TEXT,
    "UpiImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_id_key" ON "Submissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_name_key" ON "Submissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_email_key" ON "Submissions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_phone_key" ON "Submissions"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_whatsappNumber_key" ON "Submissions"("whatsappNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionReference_id_key" ON "SubmissionReference"("id");

-- CreateIndex
CREATE INDEX "SubmissionReference_type_idx" ON "SubmissionReference"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_upiId_key" ON "Payment"("upiId");

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_submissionReferenceId_fkey" FOREIGN KEY ("submissionReferenceId") REFERENCES "SubmissionReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
