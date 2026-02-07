"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/actions/auth";
import { ChevronDown, ChevronRight } from "lucide-react";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// --- CONFIGURATION: Define your links here ---
const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    dropdown: [
      { name: "Who We Are", href: "/about" },
      { name: "Our Vision", href: "/#vision" }, // Anchors to home sections
      { name: "Our Objective", href: "/#objective" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Farmer Training", href: "/services/farmer-training" },
      { name: "Workshops", href: "/services/workshops" },
      { name: "Research", href: "/services/research" },
      { name: "Consultancy", href: "/services/consultancy" },
      { name: "Publications", href: "/services/publications" },
      { name: "Digital Learning", href: "/services/digital-learning" },
    ],
  },
  {
    name: "Resources",
    href: "#", // Placeholder parent
    dropdown: [
      { name: "Magazine", href: "/magazine" },
      { name: "Events", href: "/events" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Mobile accordion state (tracks which menu is open)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const pathname = usePathname();
  
  // Transparency Check Logic
  const isTransparentNav =
    pathname === "/" ||
    pathname === "/register" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/events" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms" ||
    pathname.startsWith("/services") ||
    pathname === "/magazine" ||
    pathname.startsWith("/magazine/") ||
    pathname.startsWith("/credits");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const navbarBgClass =
    isTransparentNav && !scrolled && !isOpen
      ? "bg-transparent py-6"
      : "bg-[#0a2f1c]/95 backdrop-blur-md shadow-lg py-3";

  return (
    <nav
      style={{ top: "var(--marquee-height, 0px)" }}
      className={`fixed left-0 w-full z-[100] transition-all duration-300 ${navbarBgClass}`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 text-white relative z-50">
        
        {/* LOGO */}
        <Link href="/" className="flex gap-3 items-center group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-white/20 group-hover:border-[#E8BA30] transition-colors">
            <Image
              src="/logo.jpeg"
              alt="AgriLearn Nexus Logo"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-serif tracking-wide font-bold">
            AgriLearn Nexus
          </h2>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-1">
            {navLinks.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-4 py-2 capitalize text-[16px] font-medium flex items-center gap-1 hover:text-[#E8BA30] transition-colors"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-[#0a2f1c] border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-md">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-5 py-3 text-sm text-gray-200 hover:bg-[#E8BA30] hover:text-[#0a2f1c] transition-colors border-b border-white/5 last:border-0"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="text-[15px] font-medium px-5 py-2 border border-white/30 rounded-full hover:bg-white hover:text-[#0a2f1c] transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => handleSignOut()}
                  className="cursor-pointer text-[15px] font-medium px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/register"
                className="text-[15px] font-medium px-6 py-2 bg-[#E8BA30] text-[#0a2f1c] rounded-full hover:bg-white hover:text-[#0a2f1c] transition-all font-bold shadow-lg hover:shadow-[#E8BA30]/20"
              >
                Register
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 h-[100dvh] bg-[#0a2f1c] z-40 flex flex-col pt-24 pb-10 px-6 transition-all duration-300 overflow-y-auto ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
          {navLinks.map((item) => (
            <div key={item.name} className="border-b border-white/10 last:border-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  // --- FIX APPLIED HERE ---
                  // Changed from `!item.dropdown && setIsOpen(false)` 
                  // to `setIsOpen(false)` so it always closes on click.
                  onClick={() => setIsOpen(false)}
                  className="py-4 text-xl font-serif text-white hover:text-[#E8BA30] transition-colors flex-grow"
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                    className="p-4 text-white hover:text-[#E8BA30]"
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${mobileExpanded === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              {/* Mobile Submenu */}
              {item.dropdown && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileExpanded === item.name ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#E8BA30]/30 ml-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 text-base text-gray-300 hover:text-white flex items-center gap-2"
                      >
                        <ChevronRight size={14} className="text-[#E8BA30]" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE AUTH LINKS */}
        <div className="mt-8 w-full max-w-sm mx-auto flex flex-col gap-4">
          {user ? (
            <>
              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-center text-lg font-medium px-5 py-3 border border-white/30 rounded-xl text-white hover:bg-white hover:text-[#0a2f1c] transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="cursor-pointer text-center text-lg font-medium px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="text-center text-lg font-medium px-5 py-3 bg-[#E8BA30] text-[#0a2f1c] rounded-xl hover:bg-white transition-all font-bold"
            >
              Register Now
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;