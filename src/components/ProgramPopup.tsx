"use client";

import { useEffect, useState } from "react";
import { X, Download, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProgramPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Popup Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image Container */}

        <div className="w-full md:w-1/2 relative h-72 md:h-auto shrink-0 bg-gray-50 flex items-center justify-center">
          <Image
            src="/popup_banner.jpg"
            alt="Faculty Development Program"
            fill
            className="object-contain p-1"
            priority
          />

          {/* Mobile Only Badge */}
          <div className="absolute bottom-4 left-4 md:hidden z-10">
            <span className="bg-[#E8BA30] text-black text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
              UPCOMING
            </span>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col justify-center bg-white relative">
          <div className="hidden md:block mb-4">
            <span className="bg-[#E8BA30]/20 text-[#b58d18] text-xs font-bold px-3 py-1 rounded-full border border-[#E8BA30]/30 tracking-wider">
              UPCOMING EVENT
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0a2f1c] mb-3 leading-tight">
            Faculty Development Program
          </h2>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4 font-medium">
            <Calendar size={16} className="text-[#E8BA30]" />
            <span>February 21-28, 2026</span>
          </div>

          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
            Join top agricultural scientists and innovators for an immersive
            8-day Faculty Development Program on sustainable farming
            technologies.
          </p>

          <div className="flex flex-col gap-3 pb-2">
            <Link
              href="/register"
              onClick={handleClose}
              className="group w-full py-3.5 px-6 bg-[#E8BA30] hover:bg-[#d4a825] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Register Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <a
              href="/popup_banner.jpg"
              download="brochure.jpg"
              className="group w-full py-3.5 px-6 bg-white border-2 border-[#0a2f1c] text-[#0a2f1c] hover:bg-[#0a2f1c] hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Download size={18} />
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPopup;
