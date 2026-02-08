import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {SubmissionTable} from "@/components/admin/SubmissionTable";
import {School, TrendingUp, UserPlus, Users} from "lucide-react";

export default async function AdminDashboard() {
    const session = await auth();
    if (!session?.user) redirect("/admin/auth/login");

    const submissions = await prisma.submissions.findMany({
        orderBy: {createdAt: "desc"},
        include: {payment: true, submissionReference: true},
    });

    const totalStudents = submissions.length;
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    const newJoiners = submissions.filter(s => new Date(s.createdAt) > oneDayAgo).length;
    const uniqueColleges = new Set(submissions.map(s => s.institute?.trim().toLowerCase())).size;

    return (
        <div className="min-h-screen bg-gray-50">
            
            
            <div className="bg-[#0a2f1c] pt-32 pb-20 px-6 md:px-10 shadow-lg relative overflow-hidden">

                {/* Background Decorative Element */}
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-green-800/20 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none"/>

                <div
                    className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                            Admin Dashboard
                        </h1>
                        <p className="text-green-200 mt-2 font-light text-lg">
                            Welcome back, <span className="font-semibold text-[#E8BA30]">{session.user.name}</span>
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-green-400 uppercase tracking-widest font-semibold mb-1">Current
                            Session</p>
                        <p className="text-white font-medium text-lg">
                            {new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-12 space-y-8 relative z-10 pb-20">

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Registrations"
                        value={totalStudents}
                        icon={<Users className="w-5 h-5 text-blue-600"/>}
                        trend="All time"
                        color="border-l-4 border-blue-500"
                    />
                    <StatCard
                        label="New Joined (24h)"
                        value={newJoiners}
                        icon={<UserPlus className="w-5 h-5 text-green-600"/>}
                        trend="Active Admission Cycle"
                        color="border-l-4 border-green-500"
                    />
                    <StatCard
                        label="Institutes Reached"
                        value={uniqueColleges}
                        icon={<School className="w-5 h-5 text-purple-600"/>}
                        trend="Expanding Coverage"
                        color="border-l-4 border-purple-500"
                    />
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <SubmissionTable data={submissions}/>
                </div>
            </div>
        </div>
    );
}

function StatCard({label, value, icon, trend, color}: any) {
    return (
        <div
            className={`bg-white p-6 rounded-lg shadow-sm ${color} flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start z-10">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-2 z-10">
                <TrendingUp className="w-3 h-3"/>
                <span>{trend}</span>
            </div>
        </div>
    )
}