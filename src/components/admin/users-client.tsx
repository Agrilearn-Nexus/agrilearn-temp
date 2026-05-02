// components/admin/users-client.tsx
"use client";

import { useState } from "react";
import { columns } from "./user-columns";
import { DataTable } from "@/components/ui/data-table";
import { AddUserDialog } from "./add-user-dialog";
import { Button } from "@/components/ui/button";
import { User } from "../../../types/user";

export function UsersClient({ users }: { users: User[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Users</h1>

        <Button onClick={() => setOpen(true)}>Add User</Button>
      </div>

      <DataTable columns={columns} data={users} searchKey="email" />

      <AddUserDialog open={open} setOpenAction={setOpen} />
    </div>
  );
}
