import Hero from "@/components/homepage/Hero"
import ServicesSection from "@/components/homepage/ServicesSection"
import ObjectiveSection from "@/components/homepage/ObjectiveSection"
import Vision from "@/components/homepage/Vision"
import Image from "next/image"
import ProgramPopup from "@/components/ProgramPopup" // 1. Import it here

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col font-sans">
            
            {/* 2. Add the component here. 
               Since it uses 'fixed' positioning, placing it at the top keeps the DOM structure clean. */}
            <ProgramPopup />

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