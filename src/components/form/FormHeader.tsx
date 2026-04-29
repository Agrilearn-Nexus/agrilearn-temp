"use client";

import React from "react";
import Image from "next/image";
import data from "@/data/registrationDetails.json"; // Importing the JSON data

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
                src={data.theme.logo.src}
                alt={data.theme.logo.alt}
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
            {data.header.title}
          </h1>

          <h2 className="font-sans text-sm md:text-lg font-medium tracking-widest uppercase opacity-90">
            {data.header.subtitle} – {new Date().getFullYear()}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            
            {/* Left Section - FDP Details */}
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                {data.fdpDetails.sectionTitle}
              </h3>

              <div className="space-y-5">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <GrOrganization size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 leading-tight">
                      {data.fdpDetails.event.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {data.fdpDetails.event.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <FaLaptop size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{data.fdpDetails.location.mode}</p>
                    <p className="text-sm text-gray-500">{data.fdpDetails.location.place}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-[#3F7A5A]">
                    <GrCalendar size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {data.fdpDetails.date}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {data.fdpDetails.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Important Information */}
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                {data.importantInformation.sectionTitle}
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
                    <p className="font-bold text-gray-800">{data.importantInformation.registrationDeadline}</p>
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
                      href={`tel:${data.importantInformation.contact.phone.value}`}
                      className="font-bold text-gray-800 hover:text-[#3F7A5A] transition-colors"
                    >
                      {data.importantInformation.contact.phone.display}
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
                    {data.importantInformation.contact.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="font-bold text-gray-800 text-sm hover:text-[#3F7A5A] transition-colors block mt-1"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="mt-8 bg-[#3F7A5A]/10 border-l-[6px] border-[#3F7A5A] p-4 rounded-r-lg">
            <p className="text-sm text-[#2a523c] leading-relaxed">
              <span className="font-bold">{data.note.label}</span> {data.note.text}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FormHeader;