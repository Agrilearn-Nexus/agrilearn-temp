import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SubmissionTable } from "@/components/admin/SubmissionTable";

export default async function AdminDashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect("/admin/auth/login");
    }

    const submissions = await prisma.submissions.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            payment: true,
            submissionRefference: true,
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">
                            Manage and export student registrations
                        </p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg border shadow-sm">
                        <span className="text-sm font-medium text-gray-600">Total Submissions: </span>
                        <span className="text-lg font-bold text-green-600">{submissions.length}</span>
                    </div>
                </div>

                <SubmissionTable data={submissions} />
            </div>
        </div>
    );
}