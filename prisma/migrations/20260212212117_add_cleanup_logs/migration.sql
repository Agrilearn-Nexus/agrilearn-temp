-- CreateTable
CREATE TABLE "CleanupLog" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "totalR2Files" INTEGER NOT NULL DEFAULT 0,
    "linkedDbFiles" INTEGER NOT NULL DEFAULT 0,
    "orphansFound" INTEGER NOT NULL DEFAULT 0,
    "deletedCount" INTEGER NOT NULL DEFAULT 0,
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "logs" JSONB,

    CONSTRAINT "CleanupLog_pkey" PRIMARY KEY ("id")
);
