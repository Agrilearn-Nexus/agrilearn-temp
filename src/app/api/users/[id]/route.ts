import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    if (!id) return new Response("Not Found", { status: 404 });
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) return new Response("Not Found", { status: 404 });
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 204 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
