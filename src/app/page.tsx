import Hero from "@/components/homepage/Hero"
import ServicesSection from "@/components/homepage/ServicesSection"
import ObjectiveSection from "@/components/homepage/ObjectiveSection"
import Vision from "@/components/homepage/Vision"
import Image from "next/image"
import ProgramPopup from "@/components/ProgramPopup"
import MarqueeNotification from "@/components/MarqueeNotification" // 1. IMPORT HERE

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col font-sans">
            
            <ProgramPopup />

            {/* 2. PLACE HERE - Top level, so it sits above everything */}
            <MarqueeNotification />

            {/* Hero Section Wrapper */}
            <div className="relative w-full min-h-screen flex flex-col">

                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`/hero-agriculture.jpg`}
                        alt="Agriculture Field"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col min-h-screen">
                    
                    {/* Note: I removed the old 'mt-[72px]' div here because the 
                       MarqueeNotification component now handles its own positioning 
                       and pushes the navbar down automatically. */}

                    <div className="flex-grow flex items-center justify-center py-12 md:py-0">
                        <Hero />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="w-full bg-white relative z-20">
                <ServicesSection />
                <ObjectiveSection />
                <Vision />
            </main>

        </div>
    )
}