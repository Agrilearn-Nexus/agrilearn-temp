"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const MarqueeNotification = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to update the global CSS variable based on marquee height
    const updateHeight = () => {
      if (marqueeRef.current) {
        const height = marqueeRef.current.offsetHeight;
        // Set a CSS variable on the HTML root
        document.documentElement.style.setProperty('--marquee-height', `${height}px`);
      }
    };

    // Run on mount
    updateHeight();

    // Run on resize (in case text wraps on mobile)
    window.addEventListener("resize", updateHeight);

    // Cleanup: Remove the variable when leaving the homepage
    return () => {
      document.documentElement.style.removeProperty('--marquee-height');
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const marqueeItems = [...Array(4)]; 

  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 60s linear infinite;
        }
        .marquee-container:hover .animate-marquee-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div
        ref={marqueeRef}
        className="fixed top-0 left-0 w-full bg-[#E8BA30] text-[#0a2f1c] overflow-hidden py-3 z-[110] shadow-md border-b border-[#0a2f1c]/10"
      >
        <div className="flex w-full whitespace-nowrap overflow-hidden select-none marquee-container">
          {/* Track 1 */}
          <div className="animate-marquee-scroll flex items-center min-w-full shrink-0 transform-gpu will-change-transform">
            {marqueeItems.map((_, i) => (
              <span key={`t1-${i}`} className="flex items-center gap-4 mx-8 text-sm md:text-base tracking-wide">
                <span className="font-extrabold uppercase">📢 Upcoming Event:</span>
                <span className="font-medium">
                  Faculty Development Program on Sustainable Farming Technologies
                </span>
                <span className="font-bold bg-[#0a2f1c] text-white px-2 py-0.5 rounded text-xs md:text-sm">
                  Feb 21-28, 2026
                </span>
                <Link href="/register" className="underline font-bold text-[#0a2f1c] hover:text-black transition-colors">
                  REGISTER NOW
                </Link>
              </span>
            ))}
          </div>

          {/* Track 2 */}
          <div className="animate-marquee-scroll flex items-center min-w-full shrink-0 transform-gpu will-change-transform">
            {marqueeItems.map((_, i) => (
              <span key={`t2-${i}`} className="flex items-center gap-4 mx-8 text-sm md:text-base tracking-wide">
                <span className="font-extrabold uppercase">📢 Upcoming Event:</span>
                <span className="font-medium">
                  Faculty Development Program on Sustainable Farming Technologies
                </span>
                <span className="font-bold bg-[#0a2f1c] text-white px-2 py-0.5 rounded text-xs md:text-sm">
                  Feb 21-28, 2026
                </span>
                <Link href="/register" className="underline font-bold text-[#0a2f1c] hover:text-black transition-colors">
                  REGISTER NOW
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarqueeNotification;