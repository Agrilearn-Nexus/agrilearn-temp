"use client";

import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { referenceTypes } from "@/lib/enums/register";
import { motion, AnimatePresence } from "motion/react";

const ReferenceDetails = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedReference = useWatch({
    control,
    name: "referenceSource",
    defaultValue: "",
  });

  const showPersonFields = selectedReference === "PERSON";

  useEffect(() => {
    if (selectedReference && selectedReference !== "PERSON") {
      setValue("referredPerson", "");
      setValue("referredPersonDesignation", "");
    }
  }, [selectedReference, setValue]);

  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <div className="w-full bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-t-8 border-[#3F7A5A] overflow-hidden">
        <div className="p-6 md:p-10">
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
                {referenceTypes.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 cursor-pointer group p-3 rounded-lg border transition-all ${
                      selectedReference === option 
                        ? "border-[#3F7A5A] bg-[#3F7A5A]/5" 
                        : "border-gray-200 hover:border-[#3F7A5A]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register("referenceSource", {
                        required: "You must select a referrer.",
                      })}
                      className="w-4 h-4 accent-[#3F7A5A] cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">
                      {option.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>

              {errors.referenceSource && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.referenceSource?.message as string}
                </p>
              )}
            </div>

            <AnimatePresence>
              {showPersonFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold text-gray-800 mb-2 block">
                        Name of Referred Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Name of the person who referred you"
                        {...register("referredPerson", {
                          required: showPersonFields
                            ? "Person name is required"
                            : false,
                        })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A] transition-colors"
                      />
                      {errors.referredPerson && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.referredPerson?.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-800 mb-2 block">
                        Referred Person Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Professor, Student, Manager"
                        {...register("referredPersonDesignation")}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3F7A5A]/20 focus:border-[#3F7A5A] transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetails;