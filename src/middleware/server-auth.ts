import { auth } from "@/lib/auth";

export async function serverAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  } else if (session?.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  } else {
    return session;
  }
}
