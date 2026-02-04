"use client";

import { useEffect } from "react";
import { X, MapPin, Building2, Smartphone, Mail, CreditCard, Calendar } from "lucide-react";
import Image from "next/image";

interface ModalProps {
    submission: any;
    isOpen: boolean;
    onClose: () => void;
}

export function SubmissionDetailsModal({ submission, isOpen, onClose }: ModalProps) {

    useEffect(() => {
        if (!isOpen) return;

        
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !submission) return null;

    return (
        
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#0a2f1c]/70 backdrop-blur-sm">
            
           
            <div className="flex min-h-full items-start justify-center p-4 pt-24 pb-24 md:p-6 md:pt-28" onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}>

                {/* Modal Card */}
                <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden md:max-h-[calc(100vh-8rem)]">

                    {/* --- LEFT SIDE (Receipt) --- */}
                    <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 p-6 flex flex-col shrink-0 md:overflow-y-auto">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <CreditCard className="w-4 h-4" /> Payment Receipt
                        </h3>

                        {/* Image */}
                        <div className="relative aspect-[3/4] w-full bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden group hover:border-green-400 transition-colors shrink-0">
                            {submission.payment?.UpiImageUrl ? (
                                <a href={submission.payment.UpiImageUrl} target="_blank" rel="noreferrer" className="block h-full w-full">
                                    <Image
                                        src={submission.payment.UpiImageUrl}
                                        alt="Receipt"
                                        fill
                                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                                        <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-xs px-2 py-1 rounded">View Full</span>
                                    </div>
                                </a>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xs">
                                    <span>No Receipt Uploaded</span>
                                </div>
                            )}
                        </div>

                        {/* Payment Stats */}
                        <div className="mt-6 space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm shrink-0">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Amount</span>
                                <span className="font-bold text-green-700 font-mono">₹{submission.payment?.amountPaid}</span>
                            </div>
                            <div className="flex justify-between text-sm border-t pt-2">
                                <span className="text-gray-500">Date</span>
                                <span className="text-gray-800">{submission.payment?.paymentDate ? new Date(submission.payment.paymentDate).toLocaleDateString() : "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE (Details) --- */}
                    <div className="w-full md:w-2/3 flex flex-col bg-white">

                        {/* Sticky Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white shrink-0 sticky top-0 z-20">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{submission.name}</h2>
                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {submission.email}</div>
                                    <div className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> {submission.whatsappNumber}</div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        
                        <div className="p-6 space-y-8 flex-1 md:overflow-y-auto pb-32 md:pb-6">

                            {/* Section 1 */}
                            <div>
                                <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> Academic Profile
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoBox label="Education" value={submission.education} />
                                    <InfoBox label="Designation" value={submission.currentDesignation} />
                                    <InfoBox label="Institute / College" value={submission.institute} className="sm:col-span-2" />
                                    <InfoBox label="University / Org" value={submission.organization} className="sm:col-span-2" />
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Location Details
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoBox label="City" value={submission.city} />
                                    <InfoBox label="State" value={submission.state} />
                                    <InfoBox label="Full Address" value={`${submission.address} - ${submission.postalCode}`} className="sm:col-span-2" />
                                </div>
                            </div>

                            {/* Section 3 - Source (Now guaranteed to be visible) */}
                            <div>
                                <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Source
                                </h4>
                                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                                    <span className="text-sm text-blue-800">Referral Source</span>
                                    <span className="font-medium text-blue-900 capitalize">{submission.submissionRefference?.type?.toLowerCase().replace("_", " ")}</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoBox({ label, value, className = "" }: { label: string, value: string, className?: string }) {
    return (
        <div className={`bg-gray-50 p-3 rounded-lg border border-gray-100 ${className}`}>
            <label className="block text-[10px] text-gray-400 uppercase font-semibold mb-1">{label}</label>
            <p className="text-sm font-medium text-gray-900 break-words">{value || "N/A"}</p>
        </div>
    )
}