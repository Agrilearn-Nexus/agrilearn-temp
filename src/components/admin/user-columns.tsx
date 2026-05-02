import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../../types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Select
          defaultValue={user.role}
          onValueChange={async (value) => {
            await fetch(`/api/admin/users/${user.id}`, {
              method: "PATCH",
              body: JSON.stringify({ role: value, email: user.email }),
            })
              .catch((e) => toast.error(e.message))
              .then(() => toast.success("Role updated successfully"))
              .finally(() => location.reload());
          }}
        >
          <SelectTrigger className="w-30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="USER">USER</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={async () => {
            (
              await fetch(`/api/admin/users/${user.id}`, {
                method: "DELETE",
              })
            )
              .arrayBuffer()
              .then(() => toast.success("User deleted successfully"))
              .catch((e) => toast.error(e.message))
              .finally(() => location.reload());
          }}
        >
          Delete
        </Button>
      );
    },
  },
];
