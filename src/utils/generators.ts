import {Prisma, PrismaClient} from "@/.generated/client";

type DbClient = PrismaClient | Prisma.TransactionClient;

export const generateHumanId = async (tx: DbClient) => {
    const PREFIX = "ANFDP";
    const year = new Date().getFullYear() % 100;

    const counter = await tx.eventCounter.upsert({
        where: {year},
        update: {value: {increment: 1}},
        create: {year, value: 1}
    });

    const paddedCounter = String(counter.value).padStart(6, "0");
    return `${PREFIX}${year}${paddedCounter}`;
};