import MarqueeNotification from "@/components/MarqueeNotification";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <MarqueeNotification />
      <main className="grow">
        <ServicesHero />
        <ServicesList />
      </main>
      
    </div>
  );
}