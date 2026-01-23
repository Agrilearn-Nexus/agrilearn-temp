import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Component Imports
import Navbar from "@/components/Navbar"; // Ensure this path matches your folder structure
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AgriLearn Nexus",
    description: "Empowering Agriculture through Innovation",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} w-full min-h-screen flex flex-col font-sans relative`}>

        {/* Floating Actions (Z-Index High) */}
        <FloatingWhatsApp />

        {/* Navigation */}
        <header className="relative z-50">
            <Navbar />
        </header>

        {/* Main Content Page */}
        <div className="flex-grow flex flex-col">
            {children}
        </div>

        {/* Footer Section */}
        <footer className="w-full relative z-20">
            <Footer />
            <Copyright />
        </footer>

        </body>
        </html>
    );
}