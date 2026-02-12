import React from "react";
import { prisma } from "@/lib/prisma";

const CleanupLogTable = async () => {
  const logs = await prisma.cleanupLog.findMany({
    orderBy: { startedAt: "desc" },
    take: 10,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-serif font-bold text-gray-900">
          Nightly Cleanup Logs
        </h3>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Schedule: 03:00 AM
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">R2 Files</th>
              <th className="px-6 py-4 text-center">DB Links</th>
              <th className="px-6 py-4 text-center">Cleaned</th>
              <th className="px-6 py-4 text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No cleanup logs found yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(log.startedAt).toLocaleDateString()}{" "}
                    <span className="text-gray-400 text-xs">
                      {new Date(log.startedAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        log.status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {log.totalR2Files}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">
                    {log.linkedDbFiles}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {log.deletedCount > 0 ? (
                      <span className="text-red-600 font-bold">
                        -{log.deletedCount}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500 font-mono">
                    {log.durationMs}ms
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CleanupLogTable;