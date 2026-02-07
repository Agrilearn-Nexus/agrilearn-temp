import Link from "next/link";
import { Code2 } from "lucide-react";

const Copyright = () => {
  return (
    <div className="w-full px-4 md:px-16 py-6 bg-[#16261E] border-t border-gray-700 text-[#B7B8AD] text-sm md:text-base">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-center md:text-left order-2 md:order-1">
          © {new Date().getFullYear()} AgriLearn Nexus. All rights reserved.
        </p>

        
        <Link
          href="/credits"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                     bg-white/5 border border-white/10 text-xs text-gray-400
                     hover:text-[#E0B732] hover:border-[#E0B732]/30 
                     transition-all duration-300 order-3 md:order-2"
        >
          <Code2 className="w-4 h-4" />
          Designed & Developed by PixelStack Technologies
        </Link>

        {/* Legal Links */}
        <div className="flex gap-6 md:gap-8 order-1 md:order-3">
          <Link
            href="/privacy-policy"
            className="text-[#B7B8AD] hover:text-[#E0B732] transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-[#B7B8AD] hover:text-[#E0B732] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
