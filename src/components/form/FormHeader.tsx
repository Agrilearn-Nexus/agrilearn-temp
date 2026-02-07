"use client";

import React from "react";
import Image from "next/image";

import { GrOrganization, GrCalendar } from "react-icons/gr";
import { FiClock } from "react-icons/fi";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { BiBuildingHouse } from "react-icons/bi";
import { FaLaptop } from "react-icons/fa";

const FormHeader = () => {
  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-[#3F7A5A] text-white flex flex-col items-center py-10 px-4 text-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <BiBuildingHouse size={28} />
            </div>

            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Image
                src={`/logo.jpeg`}
                alt="Company Logo"
                className="rounded-full object-cover"
                width={48}
                height={48}
              />
            </div>

            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <BiBuildingHouse size={28} />
            </div>
          </div>

          <h1 className="font-serif font-bold text-3xl md:text-5xl tracking-wide mb-2">
            Faculty Development Program
          </h1>

          <h2 className="font-sans text-sm md:text-lg font-medium tracking-widest uppercase opacity-90">
            Registration Form – {new Date().getFullYear()}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Section */}
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                FDP Details
              </h3>

              <div className="space-y-5">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <GrOrganization size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 leading-tight">
                      International Conference on Sustainable Agriculture & Food
                      Security
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Innovations in Agricultural Research for a Changing
                      Climate
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <FaLaptop size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">VIRTUAL</p>
                    <p className="text-sm text-gray-500">Bihar, India</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="text-[#3F7A5A]">
                    <GrCalendar size={20} />
                  </div>
                  <p className="font-bold text-gray-800">
                    February 21-28, 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                Important Information
              </h3>

              <div className="space-y-5">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <FiClock size={22} />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                      Registration Deadline:
                    </p>
                    <p className="font-bold text-gray-800">February 20, 2026</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <MdOutlinePhone size={24} />
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                      Contact Number:
                    </p>

                    <a
                      href="tel:+917488468326"
                      className="font-bold text-gray-800 hover:text-[#3F7A5A] transition-colors"
                    >
                      +91 7488468326
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <CiMail strokeWidth={0.5} size={24} />
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                      Email:
                    </p>

                    <a
                      href="mailto:support@agrilearnnexus.com"
                      className="font-bold text-gray-800 text-sm hover:text-[#3F7A5A] transition-colors block"
                    >
                      support@agrilearnnexus.com
                    </a>

                    <a
                      href="mailto:office@agrilearnnexus.com"
                      className="font-bold text-gray-800 text-sm hover:text-[#3F7A5A] transition-colors block"
                    >
                      office@agrilearnnexus.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 bg-[#3F7A5A]/10 border-l-[6px] border-[#3F7A5A] p-4 rounded-r-lg">
            <p className="text-sm text-[#2a523c] leading-relaxed">
              <span className="font-bold">NOTE:</span> All certificates and
              relevant information will be provided via email. Hard copy
              certificates will be dispatched to the postal address mentioned in
              the registration form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
