"use client";
import React, {useState} from "react";
import {Search, Loader2, CheckCircle, XCircle, Clock} from "lucide-react";
import {checkStatus} from "@/actions/public";

export default function TrackStatusPage() {
    const [id, setId] = useState("");
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setStatus(null);

        if (!id) {
            setError("Submission ID is required");
            setLoading(false);
            return;
        }

        const result = await checkStatus(id);
        if (result.success) {
            setStatus(result.data);
        } else {
            setError(result.error || "Not found");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-[#0a2f1c] mb-2">Track Application</h1>
                <p className="text-gray-500 mb-6 text-sm">Enter your Submission ID (e.g. ANFDP26...) to check
                    status.</p>

                <form onSubmit={handleCheck} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Submission ID"
                        value={id}
                        onChange={(e) => setId(e.target.value.toUpperCase())}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-500"
                    />
                    <button disabled={loading}
                            className="bg-[#0a2f1c] text-white px-4 py-2 rounded-lg hover:bg-green-900 disabled:opacity-50">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Search className="w-5 h-5"/>}
                    </button>
                </form>

                {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">{error}</div>}

                {status && (
                    <div className="text-center space-y-4 animate-fade-in">
                        <div className="flex justify-center">
                            {status.status === "COMPLETED" ? <CheckCircle className="w-16 h-16 text-green-500"/> :
                                status.status === "FAILED" ? <XCircle className="w-16 h-16 text-red-500"/> :
                                    <Clock className="w-16 h-16 text-blue-500"/>}
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{status.name}</h2>
                            <p className="text-sm text-gray-500">{status.institute}</p>
                        </div>

                        <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold
                ${status.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                            status.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {status.status.replace("_", " ")}
                        </div>

                        {status.status === "FAILED" && (
                            <p className="text-xs text-red-500 mt-2">Issue: {status.failureReason || "Verification failed. Please contact support."}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}