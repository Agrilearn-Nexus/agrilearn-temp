"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

const PersonalDetails = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="w-full flex justify-center p-4 md:p-8">
            <div className="w-full bg-white rounded-lg shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-t-[6px] border-[#3F7A5A] overflow-hidden">
                <div className="p-8 md:p-10">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#3F7A5A] text-white flex items-center justify-center font-bold text-lg font-serif">
                            1
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#3F7A5A]">
                            Personal Details
                        </h2>
                    </div>

                    <div className="h-px bg-gray-200 w-full mb-8 mt-4" />

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-800 text-sm">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                {...register("fullName", { required: "Full Name is required" })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-xs">
                                    {errors.fullName.message as string}
                                </p>
                            )}
                        </div>

                        {/* Education */}
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-800 text-sm">
                                Education <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., M.Sc. Agriculture"
                                {...register("education", {
                                    required: "Education is required",
                                })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.education && (
                                <p className="text-red-500 text-xs">
                                    {errors.education.message as string}
                                </p>
                            )}
                        </div>

                        {/* Designation */}
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-800 text-sm">
                                Current Designation <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Research Scholar, Professor"
                                {...register("designation", {
                                    required: "Designation is required",
                                })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.designation && (
                                <p className="text-red-500 text-xs">
                                    {errors.designation.message as string}
                                </p>
                            )}
                        </div>

                        {/* College */}
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-800 text-sm">
                                College / Institute <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name of your college/institute"
                                {...register("college", {
                                    required: "College is required",
                                })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.college && (
                                <p className="text-red-500 text-xs">
                                    {errors.college.message as string}
                                </p>
                            )}
                        </div>

                        {/* University */}
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-800 text-sm">
                                University / Organization <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name of university/organization"
                                {...register("university", {
                                    required: "University is required",
                                })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.university && (
                                <p className="text-red-500 text-xs">
                                    {errors.university.message as string}
                                </p>
                            )}
                        </div>

                        {/* WhatsApp */}
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-800 text-sm">
                                Contact Number (WhatsApp) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                {...register("whatsapp", {
                                    required: "WhatsApp number is required",
                                    minLength: { value: 10, message: "Enter a valid number" },
                                })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.whatsapp && (
                                <p className="text-red-500 text-xs">
                                    {errors.whatsapp.message as string}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                Please provide a WhatsApp-enabled number
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="font-bold text-gray-800 text-sm">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3F7A5A] focus:border-[#3F7A5A] bg-[#F9FAFB]"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">
                                    {errors.email.message as string}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-800 mb-2 block">
                                Postal Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Enter your complete postal address"
                                {...register("postalAddress", {
                                    required: "Postal Address is required",
                                })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A] transition-colors resize-none"
                            />
                            {errors.postalAddress && (
                                <p className="text-red-500 text-xs">
                                    {errors.postalAddress.message as string}
                                </p>
                            )}
                        </div>

                        {/* Location Grid */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                                {/* City */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold text-gray-800 mb-2">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        {...register("city", { required: "City is required" })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A]"
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-xs">
                                            {errors.city.message as string}
                                        </p>
                                    )}
                                </div>

                                {/* District */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold text-gray-800 mb-2">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="District"
                                        {...register("district", {
                                            required: "District is required",
                                        })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A]"
                                    />
                                    {errors.district && (
                                        <p className="text-red-500 text-xs">
                                            {errors.district.message as string}
                                        </p>
                                    )}
                                </div>

                                {/* Postal Code */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold text-gray-800 mb-2">
                                        Postal Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="PIN Code"
                                        {...register("postalCode", {
                                            required: "Postal Code is required",
                                        })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A]"
                                    />
                                    {errors.postalCode && (
                                        <p className="text-red-500 text-xs">
                                            {errors.postalCode.message as string}
                                        </p>
                                    )}
                                </div>

                                {/* State */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-bold text-gray-800 mb-2">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("state", { required: "State is required" })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A] appearance-none cursor-pointer"
                                    >
                                        <option value="">Select</option>
                                        {[
                                            "Andhra Pradesh",
                                            "Arunachal Pradesh",
                                            "Assam",
                                            "Bihar",
                                            "Chhattisgarh",
                                            "Goa",
                                            "Gujarat",
                                            "Haryana",
                                            "Himachal Pradesh",
                                            "Jharkhand",
                                            "Karnataka",
                                            "Kerala",
                                            "Madhya Pradesh",
                                            "Maharashtra",
                                            "Manipur",
                                            "Meghalaya",
                                            "Mizoram",
                                            "Nagaland",
                                            "Odisha",
                                            "Punjab",
                                            "Rajasthan",
                                            "Sikkim",
                                            "Tamil Nadu",
                                            "Telangana",
                                            "Tripura",
                                            "Uttar Pradesh",
                                            "Uttarakhand",
                                            "West Bengal",
                                            "Andaman and Nicobar Islands",
                                            "Chandigarh",
                                            "Dadra and Nagar Haveli and Daman and Diu",
                                            "Delhi",
                                            "Jammu and Kashmir",
                                            "Ladakh",
                                            "Lakshadweep",
                                            "Puducherry",
                                        ].map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && (
                                        <p className="text-red-500 text-xs">
                                            {errors.state.message as string}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
