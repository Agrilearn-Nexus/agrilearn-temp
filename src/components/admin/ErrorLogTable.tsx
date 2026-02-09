"use client";

import { useState } from "react";
import { Eye, CheckCircle, Clock } from "lucide-react";

export function ErrorLogTable({ data }: { data: any[] }) {
    const [selectedError, setSelectedError] = useState<any>(null);

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500">
                    <tr>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Source</th>
                        <th className="px-6 py-4">Message</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {data.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4">
                                {log.resolved ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                            <CheckCircle className="w-3 h-3 mr-1"/> Resolved
                                        </span>
                                ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                                            <Clock className="w-3 h-3 mr-1"/> Pending
                                        </span>
                                )}
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-gray-600">{log.source}</td>
                            <td className="px-6 py-4 text-gray-900 font-medium truncate max-w-xs" title={log.message}>
                                {log.message}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(log.createdAt).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => setSelectedError(log)}
                                    className="text-indigo-600 hover:text-indigo-900 font-medium text-xs border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Simple Details Modal */}
            {selectedError && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedError(null)}>
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Error Details</h3>
                            <button onClick={() => setSelectedError(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800 font-mono text-sm break-words">
                                {selectedError.message}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-gray-500 font-semibold mb-1">Source</span>
                                    {selectedError.source}
                                </div>
                                <div>
                                    <span className="block text-gray-500 font-semibold mb-1">Submission ID</span>
                                    {selectedError.submissionId || "N/A"}
                                </div>
                            </div>

                            {selectedError.stack && (
                                <div>
                                    <span className="block text-gray-500 font-semibold mb-2">Stack Trace</span>
                                    <pre className="bg-gray-900 text-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
                                        {selectedError.stack}
                                    </pre>
                                </div>
                            )}

                            {selectedError.metadata && (
                                <div>
                                    <span className="block text-gray-500 font-semibold mb-2">Metadata</span>
                                    <pre className="bg-gray-100 text-gray-700 p-4 rounded-lg text-xs overflow-x-auto">
                                        {JSON.stringify(selectedError.metadata, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}