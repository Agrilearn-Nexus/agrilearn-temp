"use client";

import {useState, useTransition} from "react";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Download,
    Eye,
    Filter,
    LoaderCircle,
    Search, Send,
    Trash,
    Trash2
} from "lucide-react";
import {SubmissionDetailsModal} from "./SubmissionDetailsModal";
import {deleteSubmission, resendSubmissionEmail} from "@/actions/admin"

export function SubmissionTable({data}: { data: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sourceFilter, setSourceFilter] = useState("ALL");
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
    const [isPending, startTransition] = useTransition();
    const filteredData = data.filter((item) => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
            item.name?.toLowerCase().includes(term) ||
            item.email?.toLowerCase().includes(term) ||
            item.phone?.includes(term);
        const matchesSource = sourceFilter === "ALL" || item.submissionRefference?.type === sourceFilter;
        return matchesSearch && matchesSource;
    });

    // Export Logic
    const handleExport = () => {
        const excelData = filteredData.map((item) => ({
            "Submission ID": item.id,
            "Full Name": item.name,
            "Email": item.email,
            "Phone": item.whatsappNumber,
            "Education": item.education,
            "Designation": item.currentDesignation,
            "Institute/College": item.institute,
            "University/Organization": item.organization,

            "Address": item.address,
            "City": item.city,
            "District": item.district,
            "State": item.state,
            "Postal Code": item.postalCode,
            "CertificationType": item.submissionDetail || "N/A",
            "Payment Amount": `₹${item.payment?.amountPaid || "0"}`,
            "Payment Date": item.payment?.paymentDate ? new Date(item.payment.paymentDate).toLocaleDateString() : "N/A",
            "UPI ID": item.payment?.upiId || "N/A",
            "Receipt URL": item.payment?.UpiImageUrl || "N/A",

            "Reference Source": item.submissionReference?.type,
            "Referred By": item.submissionReference?.personName || "N/A",

            "Registration Date": new Date(item.createdAt).toLocaleString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
        saveAs(new Blob([excelBuffer], {type: "application/octet-stream"}), "AgriLearn_Data.xlsx");
    };

    const getInitials = (name: string) => name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    const getStatusBadge = (status: string, reason?: string) => {
        switch (status) {
            case "COMPLETED":
                return <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700"><CheckCircle
                    className="w-3 h-3"/> DONE</span>;
            case "FAILED":
                return <span title={reason}
                             className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 cursor-help"><AlertCircle
                    className="w-3 h-3"/> FAILED</span>;
            case "PROCESSING":
            case "VALIDATING":
                return <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700"><Clock
                    className="w-3 h-3"/> PROCESSING</span>;
            case "SAVED":
                // Saved means DB is good, but Email might have failed (if reason exists) or hasn't sent yet
                if (reason) return <span title={reason}
                                         className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 cursor-help"><AlertCircle
                    className="w-3 h-3"/> EMAIL ERROR</span>;
                return <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700">SAVED</span>;
            default:
                return <span className="text-gray-500 text-xs">{status}</span>;
        }
    };

    return (
        <>
            {/* TOOLBAR */}
            <div
                className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white sticky top-0 z-20">
                <div className="flex gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-72 group">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-4 h-4"/>
                        <input
                            type="text"
                            placeholder="Search by name, email..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border-transparent focus:bg-white border focus:border-green-500 rounded-lg outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3"/>
                        <select
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value)}
                            className="pl-8 pr-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100 border-transparent rounded-lg cursor-pointer outline-none appearance-none"
                        >
                            <option value="ALL">All Sources</option>
                            <option value="WHATSAPP_GROUP">WhatsApp</option>
                            <option value="WEBSITE">Website</option>
                            <option value="PERSON">Referral</option>
                        </select>
                    </div>
                </div>

                <button onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#0a2f1c] hover:bg-[#14422b] text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
                    <Download className="w-4 h-4"/> <span>Export CSV</span>
                </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto min-h-[500px]">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-50/80 sticky top-0 backdrop-blur-sm z-10">
                    <tr>
                        <th className="px-6 py-4 font-semibold tracking-wider">Student</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Education</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Source</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Selected Plan</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {filteredData.map((row) => (
                        <tr key={row.id} className="group hover:bg-green-50/30 transition-colors">

                            {/* Name & Avatar */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-700 flex items-center justify-center font-bold text-xs shadow-inner">
                                        {getInitials(row.name)}
                                    </div>
                                    <div>
                                        <div
                                            className="font-medium text-gray-900 group-hover:text-green-800 transition-colors">{row.name}</div>
                                        <div className="text-xs text-gray-500">{row.email}</div>
                                    </div>
                                </div>
                            </td>

                            {/* Education */}
                            <td className="px-6 py-4">
                                <div className="text-gray-700 font-medium truncate max-w-[180px]"
                                     title={row.institute}>{row.institute}</div>
                                <div className="text-xs text-gray-400">{row.education}</div>
                            </td>

                            {/* Source Badge */}
                            <td className="px-6 py-4">
                   <span
                       className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                           row.submissionRefference?.type === 'WHATSAPP_GROUP' ? 'bg-green-100 text-green-700' :
                               row.submissionRefference?.type === 'WEBSITE' ? 'bg-blue-100 text-blue-700' :
                                   'bg-purple-100 text-purple-700'
                       }`}>
                      {row.submissionReference?.type === 'WHATSAPP_GROUP' ? 'WhatsApp' :
                          row.submissionReference?.type?.replace("_", " ") || 'Unknown'}
                   </span>
                            </td>

                            {/* selected plan */}
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1 max-w-[260px]">
                                    <span className="text-sm font-semibold text-gray-800 line-clamp-1">
                                      {row.submissionDetail?.split("– ₹")[0] || "N/A"}
                                    </span>

                                    {row.submissionDetail?.includes("₹") && (
                                        <span className="text-xs font-medium text-green-600">
                                            ₹{row.submissionDetail.split("₹")[1]}
                                          </span>
                                    )}
                                </div>
                            </td>

                            {/* Status */}

                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    {getStatusBadge(row.status, row.failureReason)}
                                    {row.failureReason && (
                                        <span className="text-[10px] text-red-500 max-w-[150px] truncate"
                                              title={row.failureReason}>
                                                  {row.failureReason}
                                           </span>
                                    )}
                                </div>
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-1">
                                    {/* Manual Resend Email Button (Only show if not completed or if there is an error) */}
                                    {(row.status !== "COMPLETED" || row.failureReason) && (
                                        <button
                                            onClick={() => startTransition(async () =>{
                                                await resendSubmissionEmail(row.id)
                                            } )}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Resend Confirmation Email"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    )}

                                    <button onClick={() => setSelectedSubmission(row)} className="p-2 rounded-lg transition-all">
                                        <Eye className="w-5 h-5 hover:text-[#0a2f1c]" />
                                    </button>

                                    <button onClick={() => startTransition(async () => {
                                        await deleteSubmission(row.id)
                                    })} className="p-2 rounded-lg transition-all">
                                        <Trash2 className="w-5 h-5 hover:text-rose-700" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                    <div className="p-10 text-center text-gray-400 text-sm">No students found matching your
                        filters.</div>
                )}
            </div>

            <SubmissionDetailsModal
                submission={selectedSubmission}
                isOpen={!!selectedSubmission}
                onClose={() => setSelectedSubmission(null)}
            />
        </>
    );
}
