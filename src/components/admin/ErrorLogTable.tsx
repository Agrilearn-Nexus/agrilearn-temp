"use client";

import { useState, useEffect } from "react";
import { Eye, CheckCircle, Clock, X, AlertOctagon } from "lucide-react";

export interface ErrorLog {
  id: string;
  resolved: boolean;
  source: string;
  message: string;
  createdAt: string | Date;
  submissionId?: string;
  stack?: string;
  metadata?: Record<string, unknown>;
}

interface ErrorLogTableProps {
  data: ErrorLog[];
}

export function ErrorLogTable({ data }: ErrorLogTableProps) {
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedError(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedError) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedError]);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
        <CheckCircle className="w-10 h-10 mb-3 opacity-50" />
        <p className="text-sm font-medium">No error logs found</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Source</th>
                <th className="px-6 py-4 w-1/3">Message</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.resolved ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        Resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-100">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {log.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="truncate max-w-xs text-gray-900 font-medium"
                      title={log.message}
                    >
                      {log.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap font-mono text-xs">
                    {new Date(log.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedError(log)}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium text-xs border border-indigo-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedError && (
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity"
          onClick={() => setSelectedError(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Error Details
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    ID: {selectedError.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedError(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Message Banner */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="text-xs font-bold text-red-900 uppercase tracking-wide mb-1">
                  Error Message
                </h4>
                <p className="text-red-800 font-mono text-sm break-words leading-relaxed">
                  {selectedError.message}
                </p>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Source
                  </span>
                  <span className="font-mono text-sm text-gray-900">
                    {selectedError.source}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Submission ID
                  </span>
                  <span className="font-mono text-sm text-gray-900">
                    {selectedError.submissionId || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Occurred At
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date(selectedError.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      selectedError.resolved
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedError.resolved ? "Resolved" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Stack Trace */}
              {selectedError.stack && (
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                    Stack Trace
                  </span>
                  <div className="relative group">
                    <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs overflow-x-auto border border-gray-800 leading-normal max-h-60 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      {selectedError.stack}
                    </pre>
                  </div>
                </div>
              )}

              {/* Metadata */}
              {selectedError.metadata &&
                Object.keys(selectedError.metadata).length > 0 && (
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                      Metadata
                    </span>
                    <pre className="bg-gray-50 text-gray-700 p-4 rounded-lg text-xs overflow-x-auto border border-gray-200">
                      {JSON.stringify(selectedError.metadata, null, 2)}
                    </pre>
                  </div>
                )}
            </div>

            {/* Footer (Optional Actions) */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedError(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
