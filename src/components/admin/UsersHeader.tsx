"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function UsersHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          User Management
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage users, roles, and access permissions
        </p>
      </div>

      <Button
        onClick={handleRefresh}
        disabled={isPending}
        variant="outline"
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
        {isPending ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
}
