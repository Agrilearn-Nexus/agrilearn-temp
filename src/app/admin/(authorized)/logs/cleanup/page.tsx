import CleanupLogTable from "@/components/admin/CleanupLogTable";

export default function CleanupLogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20 space-y-8 relative z-10 pb-20">
        <div className="grid grid-cols-1 gap-8 ">
          <CleanupLogTable />
        </div>
      </div>
    </div>
  );
}
