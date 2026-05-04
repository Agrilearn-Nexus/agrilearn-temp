import { SubmissionTable } from "@/components/admin/SubmissionTable";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { forbidden, unauthorized } from "next/navigation";
export default async function ArchievedPage() {
  const session = await auth();
  if (!session) {
    unauthorized();
  }

  if (session.user.role !== "ADMIN") {
    forbidden();
  }

  const data = await prisma.submissions.findMany({
    where: {
      status: "ARCHIVED",
      isDeleted: true,
    },
    include: {
      payment: true,
      submissionReference: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div>
      <div className="bg-[#0a2f1c] pt-32 pb-20 px-6 md:px-10 shadow-lg relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800/20 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
              Admin Dashboard
            </h1>
            <p className="text-green-200 mt-2 font-light text-lg">
              Welcome back,{" "}
              <span className="font-semibold text-[#E8BA30]">
                {session.user.name}
              </span>
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-green-400 uppercase tracking-widest font-semibold mb-1">
              Current Session
            </p>
            <p className="text-white font-medium text-lg">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-12 space-y-8 relative z-10 pb-20">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <SubmissionTable data={data} mode="archived" />
        </div>
      </div>
    </div>
  );
}
