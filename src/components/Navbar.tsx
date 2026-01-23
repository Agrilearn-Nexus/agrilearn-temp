"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {usePathname} from "next/navigation"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    const navLinks = [
        {name: "Home", href: "/#home"},
        {name: "Services", href: "/#services"},
        {name: "Objective", href: "/#objective"},
        {name: "Vision", href: "/#vision"},
        {name: "Contact", href: "/#contact"}
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navbarBgClass = (isHomePage && !scrolled)
        ? "bg-transparent py-6"
        : "bg-green-950/95 backdrop-blur-md shadow-lg py-3"

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${navbarBgClass}`}>
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8 text-white">

                <Link href="/" className="flex gap-3 items-center group">
                    <div
                        className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-white/20 group-hover:border-[#E8BA30] transition-colors">
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

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="capitalize text-[16px] font-medium relative group overflow-hidden hover:text-[#E8BA30] transition-colors"
                            >
                                {item.name}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8BA30] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/register"
                              className="text-[16px] font-medium px-5 py-2 border border-white/30 rounded-full hover:bg-[#E8BA30] hover:text-black hover:border-[#E8BA30] transition-all">
                            Register
                        </Link>
                        <button
                            className="text-[16px] font-medium px-5 py-2 bg-[#E8BA30] text-black border border-[#E8BA30] rounded-full hover:bg-white hover:border-white transition-all shadow-lg hover:scale-105">
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2">
                        <div className="flex flex-col gap-1.5">
                            <span
                                className={`block w-8 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span
                                className={`block w-8 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                            <span
                                className={`block w-8 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            <div
                className={`fixed inset-0 bg-green-950/98 z-[99] flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                {navLinks.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}
                          className="text-2xl font-serif text-white hover:text-[#E8BA30]">{item.name}</Link>
                ))}
            </div>
        </nav>
    )
}

export default Navbar