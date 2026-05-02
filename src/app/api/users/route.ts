import { serverAuth } from "@/middleware/server-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await serverAuth();

    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
