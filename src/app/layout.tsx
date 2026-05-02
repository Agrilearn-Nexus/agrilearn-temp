import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLayout from "@/components/PageLayout";
import React from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

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
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${inter.className} w-full min-h-screen flex flex-col font-sans relative`}
      >
        <Toaster
          position="top-right"
          duration={3000}
          closeButton
          richColors />
        <FloatingWhatsApp />

        <Navbar session={session} user={session?.user} />

        <PageLayout>{children}</PageLayout>

        <footer className="w-full relative z-20">
          <Footer />
          <Copyright />
        </footer>
      </body>
    </html>
  );
}
