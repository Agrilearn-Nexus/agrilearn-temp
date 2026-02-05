"use client"

import {usePathname} from "next/navigation"
import React from "react";

export default function PageLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHomePage = pathname === "/" || pathname === "/register"

    return (
        <div className={`grow flex flex-col w-full`}>
            {children}
        </div>
    )
}