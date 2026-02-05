import HeroSection from "@/components/about/HeroSection";
import MissionVision from "@/components/about/MissionVision";
import StatsSection from "@/components/about/StatsSection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/about/CTASection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <main className="flex-grow -mt-[48px]">
        <HeroSection />
        <MissionVision />
        <StatsSection />
        <WhyChooseUs />
        <TeamSection />
        <CTASection />
      </main>
    </div>
  );
}
