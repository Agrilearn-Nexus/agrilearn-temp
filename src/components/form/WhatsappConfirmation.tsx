"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FaWhatsapp, FaExternalLinkAlt } from "react-icons/fa"; // Added icon for better visibility

const WhatsappConfirmation = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="w-full flex justify-center p-4 md:p-8">
            <div className="w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-t-8 border-[#3F7A5A] overflow-hidden">
                <div className="p-6 md:p-10">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#3F7A5A] text-white flex items-center justify-center font-bold text-xl font-serif">
                            5
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#1a1a1a]">
                            WhatsApp Group Confirmation
                        </h2>
                    </div>

                    <div className="w-full h-px bg-gray-200 mb-6" />

                    {/* WhatsApp Box */}
                    <div className="bg-[#3F7A5A]/10 border border-[#3F7A5A]/20 rounded-lg p-6 flex items-start gap-4">
                        <div className="mt-1">
                            <FaWhatsapp className="text-[#3F7A5A]" size={24} />
                        </div>

                        <div className="w-full">
                            <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("whatsappGroupJoined", {
                                        required: "You have to join the WhatsApp group",
                                    })}
                                    className="mt-1 sm:mt-0 w-5 h-5 rounded border-gray-300 accent-[#3F7A5A] focus:ring-[#3F7A5A] cursor-pointer shrink-0"
                                />
                                <span className="font-bold text-gray-800 text-lg leading-tight">
                                    I have joined the official WhatsApp Group{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>

                            {/* UPDATED SECTION: Responsive Layout */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 ml-8">
                                <p className="text-sm text-gray-600 leading-snug">
                                    Join our WhatsApp group for important updates and announcements.
                                </p>

                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://chat.whatsapp.com/EpCPtmNaNDtJJ1VYVdEKQ5"
                                    className="text-blue-700 text-sm font-bold hover:underline whitespace-nowrap inline-flex items-center gap-1 transition-colors"
                                >
                                    Join Now <FaExternalLinkAlt size={12} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {errors.whatsappGroupJoined && (
                        <p className="text-red-500 text-xs mt-2 ml-12">
                            {errors.whatsappGroupJoined.message as string}
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default WhatsappConfirmation;