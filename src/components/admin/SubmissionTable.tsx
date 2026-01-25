"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Search, Download, ExternalLink, Trash2 } from "lucide-react";
import { deleteSubmission } from "@/actions/admin";
interface Submission {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    whatsappNumber?: string | null;
    education?: string | null;
    institute?: string | null;
    organization?: string | null;
    city?: string | null;
    state?: string | null;
    createdAt: Date;

    payment?: {
        upiId?: string | null;
        paymentDate?: Date | null;
        UpiImageUrl?: string | null;
        amountPaid?: string | null;
    } | null;

    submissionRefference?: {
        type?: string | null;
        personName?: string | null;
    } | null;
}

export function SubmissionTable({ data }: { data: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter((item: Submission) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.includes(searchTerm)
    );

    const handleExport = () => {

        if(filteredData.length === 0) {
            alert("No submissions found to export");
            return;
        }

        const excelData = filteredData.map((item) => ({
            "Student Name": item.name,
            "Email": item.email,
            "WhatsApp": item.whatsappNumber || item.phone,
            "Education": item.education,
            "College": item.institute,
            "University": item.organization,
            "City": item.city,
            "State": item.state,
            "Reference Source": item.submissionRefference?.type,
            "Referred By": item.submissionRefference?.personName || "N/A",
            "Payment Date": item.payment?.paymentDate
                ? new Date(item.payment.paymentDate).toLocaleDateString()
                : "N/A",
            "UPI ID": item.payment?.upiId || "N/A",
            "Receipt URL": item.payment?.UpiImageUrl || "N/A",
            "Registration Date": new Date(item.createdAt).toLocaleString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, `AgriLearn_Submissions_${new Date().toISOString().split("T")[0]}.xlsx`);
    };

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone..."
                        className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    Export to Excel
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3">Student</th>
                        <th className="px-6 py-3">Contact</th>
                        <th className="px-6 py-3">Education</th>
                        <th className="px-6 py-3">Reference</th>
                        <th className="px-6 py-3">Payment</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div>{row.name}</div>
                                    <div className="text-xs text-gray-500 font-normal">{row.city}, {row.state}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900">{row.email}</div>
                                    <div className="text-xs text-gray-500">{row.whatsappNumber}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="truncate max-w-[150px]" title={row.institute || ""}>
                                        {row.institute}
                                    </div>
                                    <div className="text-xs text-gray-500">{row.education}</div>
                                </td>
                                <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                      {row.submissionRefference?.type?.replace("_", " ")}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {row.payment?.UpiImageUrl ? (
                                            <a
                                                href={row.payment.UpiImageUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-green-600 hover:underline flex items-center gap-1"
                                            >
                                                View <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">No Receipt</span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {row.payment?.paymentDate ? new Date(row.payment.paymentDate).toLocaleDateString() : ""}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      Received
                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={async () => {
                                            if(confirm("Are you sure you want to delete this student?")) {
                                                await deleteSubmission(row.id);
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-full transition-colors"
                                        title="Delete Submission"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                No submissions found matching your search.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination Placeholder */}
            <div className="px-6 py-4 border-t bg-gray-50 text-xs text-gray-500 flex justify-between">
                <span>Showing {filteredData.length} entries</span>
            </div>
        </div>
    );
}