"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { handleSignOut } from "@/actions/auth";
import {
  ChevronDown,
  ChevronRight,
  FileWarning,
  LayoutDashboard,
  LogOut,
  Trash2,
  Users,
} from "lucide-react";
import { Session } from "next-auth";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { User } from "next-auth";

interface NavbarProps {
  user?: User | null;
  session: Session | null;
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
      className={`fixed left-0 w-full z-100 transition-all duration-300 ${navbarBgClass}`}
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

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-1">
            {navLinks.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-4 py-2 capitalize text-[16px] font-medium flex items-center gap-1 hover:text-[#E8BA30] transition-colors"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-300"
                    />
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
            {user?.role === "ADMIN" ? (
              <>
                <UserDropdown handleSignOutAction={handleSignOut} user={user} />
              </>
            ) : (
              <Link
                href="/register"
                className="text-[15px] px-6 py-2 bg-[#E8BA30] text-[#0a2f1c] rounded-full hover:bg-white hover:text-[#0a2f1c] transition-all font-bold shadow-lg hover:shadow-[#E8BA30]/20"
              >
                Register
              </Link>
            )}
          </div>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 h-dvh bg-[#0a2f1c] z-40 flex flex-col pt-24 pb-10 px-6 transition-all duration-300 overflow-y-auto ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
          {navLinks.map((item) => (
            <div
              key={item.name}
              className="border-b border-white/10 last:border-0"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-4 text-xl font-serif text-white hover:text-[#E8BA30] transition-colors grow"
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.name ? null : item.name,
                      )
                    }
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
                    mobileExpanded === item.name
                      ? "max-h-96 opacity-100 mb-4"
                      : "max-h-0 opacity-0"
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
        <div className="mt-10 w-full max-w-sm mx-auto flex flex-col gap-4">
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
                  {user.name?.[0] || "U"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-white font-medium text-sm truncate">
                    {user.name}
                  </span>
                  <span className="text-gray-400 text-xs truncate">
                    {user.email}
                  </span>
                </div>
              </div>

              {/* Role-based navigation */}
              {user.role === "ADMIN" && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-base font-medium px-5 py-3 rounded-xl border border-[#E8BA30]/40 text-[#E8BA30] hover:bg-[#E8BA30] hover:text-[#0a2f1c] transition-all"
                >
                  Go to Dashboard
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="w-full text-center text-base font-medium px-5 py-3 rounded-xl bg-red-600/90 text-white hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="text-center text-base font-medium px-5 py-3 rounded-xl border border-white/30 text-white hover:bg-white hover:text-[#0a2f1c] transition-all"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="text-center text-base font-semibold px-5 py-3 rounded-xl bg-[#E8BA30] text-[#0a2f1c] hover:bg-white transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export function UserDropdown({
  user,
  handleSignOutAction,
}: {
  user: User;
  handleSignOutAction: () => Promise<void> | void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-muted"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-sm font-semibold">
              {user.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          {/* Online indicator */}
          <AvatarBadge className="h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl shadow-xl border bg-popover py-4"
      >
        {/* User Info */}
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{user.name}</span>
          <span className="text-xs text-muted-foreground truncate">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Main actions */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin/users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/admin/logs/cleanup"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Cleanup Logs
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin/logs/errors" className="flex items-center gap-2">
              <FileWarning className="h-4 w-4" />
              Error Logs
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleSignOutAction}
          className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navbar;
