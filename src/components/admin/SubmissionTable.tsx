"use client";

import {useState} from "react";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {Download, Eye, Filter, Search} from "lucide-react";
import {SubmissionDetailsModal} from "./SubmissionDetailsModal";

export function SubmissionTable({data}: { data: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sourceFilter, setSourceFilter] = useState("ALL");
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

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

            "Reference Source": item.submissionRefference?.type,
            "Referred By": item.submissionRefference?.personName || "N/A",

            "Registration Date": new Date(item.createdAt).toLocaleString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
        saveAs(new Blob([excelBuffer], {type: "application/octet-stream"}), "AgriLearn_Data.xlsx");
    };

    const getInitials = (name: string) => name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

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
                        <th className="px-6 py-4 font-semibold tracking-wider">Payment</th>
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
                      {row.submissionRefference?.type === 'WHATSAPP_GROUP' ? 'WhatsApp' :
                          row.submissionRefference?.type?.replace("_", " ") || 'Unknown'}
                   </span>
                            </td>

                            {/* Payment Status */}
                            <td className="px-6 py-4">
                                {row.payment?.UpiImageUrl ? (
                                    <div className="flex items-center gap-1.5 text-green-600 font-medium text-xs">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                                        Verified
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-orange-500 font-medium text-xs">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/>
                                        Pending
                                    </div>
                                )}
                                <div className="text-[10px] text-gray-400 mt-0.5">
                                    {row.payment?.paymentDate ? new Date(row.payment.paymentDate).toLocaleDateString() : ""}
                                </div>
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => setSelectedSubmission(row)}
                                    className="p-2 text-gray-400 hover:text-[#0a2f1c] hover:bg-green-100 rounded-lg transition-all"
                                >
                                    <Eye className="w-5 h-5"/>
                                </button>
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
