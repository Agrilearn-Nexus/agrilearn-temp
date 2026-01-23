"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

const ReferenceDetails = () => {
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
                            4
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#1a1a1a]">
                            Reference Details
                        </h2>
                    </div>

                    <div className="w-full h-px bg-gray-200 mb-6" />

                    <div className="space-y-6">

                        {/* Reference Source */}
                        <div>
                            <label className="text-sm font-bold text-gray-800 mb-3 block">
                                How did you hear about this conference?{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    "Social Media",
                                    "WhatsApp Group",
                                    "Google / Website",
                                    "Advertisement",
                                    "Other",
                                ].map((option, idx) => (
                                    <label
                                        key={idx}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            value={option}
                                            {...register("referenceSource", {
                                                required: "You must select a referrer.",
                                            })}
                                            className="w-4 h-4 accent-[#3F7A5A] cursor-pointer"
                                        />
                                        <span className="text-gray-700 group-hover:text-[#3F7A5A] transition-colors">
                      {option}
                    </span>
                                    </label>
                                ))}
                            </div>

                            {errors.referenceSource && (
                                <p className="text-red-500 text-xs">
                                    {errors.referenceSource.message as string}
                                </p>
                            )}
                        </div>

                        {/* Referred Person */}
                        <div>
                            <label className="text-sm font-bold text-gray-800 mb-2 block">
                                Name of Referred Person
                            </label>
                            <input
                                type="text"
                                placeholder="Name of the person who referred you"
                                {...register("referredPerson")}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A] transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                If referred by someone, please mention their name
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferenceDetails;
