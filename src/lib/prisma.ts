import {Pool} from 'pg';
import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '@/.generated/client';

declare global {
     
    var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString});

const adapter = new PrismaPg(pool);

export const prisma =
    global.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;