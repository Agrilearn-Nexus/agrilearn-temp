import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLayout from "@/components/PageLayout";

const inter = Inter({subsets: ["latin"]});

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

        <FloatingWhatsApp/>

        <Navbar/>

        <PageLayout>
            {children}
        </PageLayout>

        <footer className="w-full relative z-20">
            <Footer/>
            <Copyright/>
        </footer>

        </body>
        </html>
    );
}