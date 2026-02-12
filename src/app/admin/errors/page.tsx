import { prisma } from "@/lib/prisma";
import { ErrorLogTable, ErrorLog } from "@/components/admin/ErrorLogTable"; // Import the type
import {
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Activity,
  Filter,
} from "lucide-react";
import { revalidatePath } from "next/cache";
import StatCard from "@/components/admin/ErrorStatCard";

export default async function ErrorsPage() {
  // 1. Fetch Data
  const rawErrors = await prisma.errorLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      submission: {
        select: { name: true, email: true },
      },
    },
  });

  // 2. Transform Data (Fixes the Type Mismatch)
  const formattedErrors: ErrorLog[] = rawErrors.map((error) => ({
    ...error,
    // Convert Prisma 'null' to JS 'undefined' for optional fields
    submissionId: error.submissionId ?? undefined,
    stack: error.stack ?? undefined,
    // Cast Prisma JsonValue to a generic object type
    metadata: (error.metadata as Record<string, unknown>) ?? undefined,
  }));

  // 3. Calculate Stats
  const totalErrors = formattedErrors.length;
  const unresolvedErrors = formattedErrors.filter((e) => !e.resolved).length;
  const resolvedErrors = totalErrors - unresolvedErrors;

  // Find the most frequent error source
  const sourceCounts: Record<string, number> = {};
  formattedErrors.forEach((e) => {
    sourceCounts[e.source] = (sourceCounts[e.source] || 0) + 1;
  });

  // Safety check for empty array to prevent reduce error
  const topSource =
    Object.keys(sourceCounts).length > 0
      ? Object.keys(sourceCounts).reduce((a, b) =>
          sourceCounts[a] > sourceCounts[b] ? a : b,
        )
      : "N/A";

  // Server Action to refresh data
  async function refreshData() {
    "use server";
    revalidatePath("/admin/errors");
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 pt-24 md:pt-28 space-y-8 max-w-7xl mx-auto">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
            <AlertOctagon className="w-8 h-8 text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              System Error Logs
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor and resolve critical background worker failures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <form action={refreshData}>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm flex items-center gap-2 cursor-pointer">
              <Activity className="w-4 h-4" /> Refresh
            </button>
          </form>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Unresolved Issues"
          value={unresolvedErrors}
          icon={<XCircle className="w-5 h-5 text-rose-600" />}
          trend="Requires Attention"
          trendColor="text-rose-600"
          bg="bg-rose-50/50 border-rose-100"
        />
        <StatCard
          label="Resolved Errors"
          value={resolvedErrors}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          trend="Fixed"
          trendColor="text-emerald-600"
          bg="bg-emerald-50/50 border-emerald-100"
        />
        <StatCard
          label="Total Logs"
          value={totalErrors}
          icon={<Activity className="w-5 h-5 text-blue-600" />}
          trend="All Time"
          trendColor="text-gray-500"
          bg="bg-blue-50/50 border-blue-100"
        />
        <StatCard
          label="Top Error Source"
          value={topSource}
          icon={<Filter className="w-5 h-5 text-amber-600" />}
          trend="Most Frequent"
          trendColor="text-amber-600"
          bg="bg-amber-50/50 border-amber-100"
          isText
        />
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100 bg-white flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Recent Logs</h3>
          <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
            Showing {formattedErrors.length} events
          </span>
        </div>

        {formattedErrors.length > 0 ? (
          <ErrorLogTable data={formattedErrors} />
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-gray-900 font-medium">
              All Systems Operational
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              No errors have been logged recently. Great job!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
