import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {auth} from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLayout from "@/components/PageLayout";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "AgriLearn Nexus",
    description: "Empowering Agriculture through Innovation",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <html lang="en">
        <body className={`${inter.className} w-full min-h-screen flex flex-col font-sans relative`}>

        <FloatingWhatsApp/>

        <Navbar user={session?.user}/>

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