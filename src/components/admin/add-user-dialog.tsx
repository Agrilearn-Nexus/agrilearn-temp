// components/admin/add-user-dialog.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type AddUserDialogProps = {
  open: boolean;
  setOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddUserDialog({ open, setOpenAction }: AddUserDialogProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.email) return;

      setLoading(true);

      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setLoading(false);
      setOpenAction(false);
      toast.success("User added successfully");
      router.refresh();
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to add user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Select
            value={form.role}
            onValueChange={(value) => setForm({ ...form, role: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="USER">USER</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
