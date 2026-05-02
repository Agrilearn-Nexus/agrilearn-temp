import { UsersClient } from "@/components/admin/users-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, UserPlus } from "lucide-react";
import { User } from "../../../../types/user";
import { UsersHeader } from "@/components/admin/UsersHeader";

async function getUsers(): Promise<User[]> {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const users = await prisma.user.findMany();

  return users.map((user) => ({
    id: user.id,
    name: user.name || "",
    email: user.email || "",
    role: user.role,
  }));
}

export default async function UsersPage() {
  const users = await getUsers();

  const totalUsers = users.length;
  const admins = users.filter((u) => u.role === "ADMIN").length;

  return (
    <main className="flex-1 w-full bg-background p-4 md:p-8 mt-20">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <UsersHeader />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-semibold">{totalUsers}</p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-semibold">{admins}</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </CardContent>
          </Card>
        </div>

        <Card className="border shadow-sm">
          <CardContent className="p-4 md:p-6">
            {users.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No users found</p>
                <p className="text-sm text-muted-foreground">
                  Add your first user to get started
                </p>

                <Button className="mt-4 gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            ) : (
              <UsersClient users={users} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
