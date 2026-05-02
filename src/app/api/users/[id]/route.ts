import { prisma } from "@/lib/prisma";
import { serverAuth } from "@/middleware/server-auth";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await serverAuth();
    const id = (await params).id;
    if (!id) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    await prisma.user.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await serverAuth();
    const { id } = await params;
    const { role } = await req.json();
    if (!role || !id) {
      return NextResponse.json(
        { error: "Role and ID are required" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
