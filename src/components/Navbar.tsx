"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navLinks = ["home", "services", "objective", "vision", "contact"]

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <nav className="relative z-[100]">
            <div className="flex justify-between items-center p-4 md:p-8 text-white relative z-[101]">

                {/* Logo */}
                <Link href="/" className="flex gap-2 items-center">
                    <Image
                        src={`/logo.jpeg`}
                        className="w-10 rounded-full border border-white/20"
                        alt="AgriLearn Nexus Logo"
                        width={40}
                        height={40}
                    />
                    <h2 className="text-xl md:text-2xl font-serif tracking-wide">
                        AgriLearn Nexus
                    </h2>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex gap-8 items-center">
                    <div className="flex gap-8">
                        {navLinks.map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className="capitalize text-[18px] font-medium relative group overflow-hidden"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8BA30] transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div>
                        <button
                            className="text-[18px] font-medium px-6 py-2 border border-white/30 rounded-full hover:bg-[#E8BA30] hover:border-[#E8BA30] hover:text-black transition-all duration-300 shadow-lg cursor-pointer hover:scale-105">
                            Get Started
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
            <span
                className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                }`}
            ></span>
                        <span
                            className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-out ${
                                isOpen ? "opacity-0" : "opacity-100"
                            }`}
                        ></span>
                        <span
                            className={`block w-8 h-0.5 bg-white transition-all duration-300 ease-out ${
                                isOpen ? "-rotate-45 -translate-y-2" : ""
                            }`}
                        ></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center gap-10 text-white transition-all duration-500 ease-in-out md:hidden ${
                    isOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-10"
                }`}
            >
                <div
                    className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-green-600/20 rounded-full blur-3xl pointer-events-none"></div>
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((item, index) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setIsOpen(false)}
                            className="capitalize text-3xl font-serif font-medium hover:text-[#E8BA30] transition-colors duration-300 transform hover:scale-105"
                            style={{
                                transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                            }}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <button
                    className="text-xl font-medium px-8 py-3 border border-[#E8BA30] text-[#E8BA30] rounded-full mt-6 active:scale-95 transition-transform cursor-pointer hover:scale-105"
                    onClick={() => setIsOpen(false)}
                >
                    Get Started
                </button>
            </div>
        </nav>
    )
}

export default Navbar
