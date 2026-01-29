"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiCheckCircle, FiCopy, FiUploadCloud } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";

const PaymentDetails = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const paymentReceipt = watch("paymentReceipt");

  // --- 1. Data Definitions ---
  const feeStructure = [
    { category: "MSc", softCopy: "₹149", hardCopy: "₹199" },
    { category: "PhD Research Scholar", softCopy: "₹149", hardCopy: "₹199" },
    { category: "Assistant Professor", softCopy: "₹199", hardCopy: "₹249" },
    { category: "Associate Professor", softCopy: "₹199", hardCopy: "₹249" },
    { category: "Scientist", softCopy: "₹199", hardCopy: "₹249" },
  ];

  // Map full categories to shorter abbreviations for the dropdown display
  const getAbbreviation = (category: string) => {
    const map: Record<string, string> = {
      "MSc": "MSc",
      "PhD": "PhD",
      "Research Scholar": "Res. Scholar",
      "Assistant Professor": "Asst. Prof.",
      "Associate Professor": "Assoc. Prof.",
      "Scientist": "Scientist",
    };
    return map[category] || category;
  };

  const optionArray = [
    { category: "MSc", type: "Soft Copy", price: 149 },
    { category: "MSc", type: "Hard Copy", price: 199 },
    { category: "PhD", type: "Soft Copy", price: 149 },
    { category: "PhD", type: "Hard Copy", price: 199 },
    { category: "Research Scholar", type: "Soft Copy", price: 149 },
    { category: "Research Scholar", type: "Hard Copy", price: 199 },
    { category: "Assistant Professor", type: "Soft Copy", price: 199 },
    { category: "Assistant Professor", type: "Hard Copy", price: 249 },
    { category: "Associate Professor", type: "Soft Copy", price: 199 },
    { category: "Associate Professor", type: "Hard Copy", price: 249 },
    { category: "Scientist", type: "Soft Copy", price: 199 },
    { category: "Scientist", type: "Hard Copy", price: 249 },
  ];

  const upiOptions = ["7485850688@pthdfc", "satyamsinghbgs90-1@okicici"];
  const [selectedUpi, setSelectedUpi] = useState(upiOptions[0]);
  const [copied, setCopied] = useState(false);

  // --- 2. Handlers ---
  const handleCopy = async () => {
    if (selectedUpi) {
      await navigator.clipboard.writeText(selectedUpi);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  const feeRegister = register("feeDetails", {
    required: "Please select a certificate type",
  });

  const handleFeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    feeRegister.onChange(e);
    const selectedValue = e.target.value;
    const match = selectedValue.match(/(\d+)$/);

    if (match) {
      setValue("amountPaid", match[0], { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("amountPaid", "");
    }
  };

  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <div className="w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-t-8 border-[#3F7A5A] overflow-hidden">
        <div className="p-6 md:p-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#3F7A5A] text-white flex items-center justify-center font-bold text-xl font-serif">
              2
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1a1a1a]">
              Payment Details
            </h2>
          </div>

          <div className="w-full h-px bg-gray-200 mb-8" />

          {/* Fee Table */}
          <h3 className="text-lg font-bold text-gray-800 mb-4 font-serif">
            Registration Fee Structure
          </h3>

          <div className="overflow-hidden rounded-lg border border-gray-200 mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#3F7A5A] text-white">
                  <th className="p-4 font-semibold text-sm uppercase tracking-wide border-r border-[#3F7A5A]/50">
                    Category
                  </th>
                  <th className="p-4 font-semibold text-sm uppercase tracking-wide border-r border-[#3F7A5A]/50">
                    Soft Copy
                  </th>
                  <th className="p-4 font-semibold text-sm uppercase tracking-wide">
                    Hard Copy
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {feeStructure.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-4 font-medium border-r border-gray-100">
                      {row.category}
                    </td>
                    <td className="p-4 font-bold text-[#3F7A5A] border-r border-gray-100">
                      {row.softCopy}
                    </td>
                    <td className="p-4 font-bold text-[#3F7A5A]">
                      {row.hardCopy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Certificate Type Selection */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
            <div className="flex gap-3 items-start mb-4">
              <BsInfoCircle className="text-blue-600 mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-blue-900">
                  Certificate Type & Fee Details{" "}
                  <span className="text-red-500">*</span>
                </h4>
                <p className="text-sm text-blue-800 mt-1">
                  Select your category and preferred certificate format.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded w-full max-w-5xl justify-between mx-auto sm:mx-0">
              <select
                name={feeRegister.name}
                ref={feeRegister.ref}
                onBlur={feeRegister.onBlur}
                onChange={handleFeeChange}
               
                className="border rounded-md border-blue-200 p-4 w-full truncate pr-8"
              >
                <option value="">Select Category - Type - Fee</option>
                {optionArray.map((item, i) => (
                  
                  <option
                    key={i}
                    value={`${item.category} – ${item.type} – ₹${item.price}`}
                  >
                    
                    {getAbbreviation(item.category)} – {item.type} – ₹{item.price}
                  </option>
                ))}
              </select>
            </div>

            {errors.feeDetails && (
              <p className="text-red-500 text-xs mt-2">
                {errors.feeDetails.message as string}
              </p>
            )}
          </div>

          {/* UPI Payment Section */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
            <div className="flex gap-3 items-start mb-4">
              <BsInfoCircle className="text-blue-600 mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-blue-900">
                  Payment via UPI <span className="text-red-500">*</span>
                </h4>
                <p className="text-sm text-blue-800 mt-1">
                  Pay to the UPI ID below and upload the receipt.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-3 rounded w-full max-w-5xl justify-between mx-auto sm:mx-0">
              <select
                className="border rounded-md border-blue-200 p-4 w-full"
                value={selectedUpi}
                onChange={(e) => setSelectedUpi(e.target.value)}
              >
                {upiOptions.map((upi, index) => (
                  <option key={index} value={upi}>
                    {upi}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleCopy}
                className="bg-[#3F7A5A] rounded-full px-4 py-2 text-white font-sans text-sm whitespace-nowrap flex flex-row items-center gap-2 cursor-pointer"
              >
                {!copied ? <FiCopy size={16} /> : <FiCheckCircle size={16} />}
                {copied ? "Copied!" : "Copy ID"}
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-800 mb-2">
                  Amount Paid (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Amount will be auto-filled"
                  readOnly={true}
                  {...register("amountPaid", { required: "Amount is required" })}
                  className="w-full px-4 py-3 bg-gray-100 cursor-default border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A]"
                />
                {errors.amountPaid && (
                  <p className="text-red-500 text-xs">
                    {errors.amountPaid.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-800 mb-2">
                  Payment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("paymentDate", { required: "Date is required" })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A]"
                />
                {errors.paymentDate && (
                  <p className="text-red-500 text-xs">
                    {errors.paymentDate.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-800 mb-2">
                Upload Payment Receipt <span className="text-red-500">*</span>
              </label>

              <div
                className={`relative grow border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer group min-h-40 ${
                  paymentReceipt && paymentReceipt.length > 0
                    ? "bg-green-50 border-[#3F7A5A]"
                    : "bg-gray-50 border-gray-300 hover:bg-green-50 hover:border-[#3F7A5A]"
                }`}
              >
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  {...register("paymentReceipt", {
                    required: "Payment screenshot is required",
                  })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {paymentReceipt && paymentReceipt.length > 0 ? (
                  <div className="flex flex-col items-center animate-fadeIn">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                      <FiCheckCircle size={28} className="text-[#3F7A5A]" />
                    </div>
                    <p className="text-[#3F7A5A] font-bold text-lg break-all px-4">
                      {paymentReceipt[0].name}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 bg-white px-2 py-1 rounded-full shadow-sm">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FiUploadCloud size={24} className="text-[#3F7A5A]" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, or PDF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
              {errors.paymentReceipt && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.paymentReceipt.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;