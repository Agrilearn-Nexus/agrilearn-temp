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
            const res = await fetch(`/api/users/${user.id}`, {
              method: "PATCH",
              body: JSON.stringify({ role: value }),
            });
            const data = await res.json();
            if (!res.ok) {
              toast.error(data.error || "Failed to update role");
              return;
            }
            toast.success("Role updated successfully");
            location.reload();
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
            const res = await fetch(`/api/users/${user.id}`, {
              method: "DELETE",
            });
            if (!res.ok) {
              console.log("not ok");
              toast.error((await res.json()).error || "Failed to delete user");
              return;
            } else {
              toast.success("User deleted successfully");
              location.reload();
            }
          }}
        >
          Delete
        </Button>
      );
    },
  },
];
