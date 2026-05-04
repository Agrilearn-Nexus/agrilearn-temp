"use client";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RefreshButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    // router.refresh() has no callback — use a short timeout
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center gap-2 px-4 py-2.5 border text-sm font-medium rounded-lg transition-all hover:bg-gray-50 disabled:opacity-50"
    >
      <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} />
      <span>Refresh</span>
    </button>
  );
}
