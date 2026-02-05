import MarqueeNotification from "@/components/MarqueeNotification";
import Navbar from "@/components/Navbar";
import ContactHero from "@/components/contact/ContactHero";
import FAQSection from "@/components/contact/FAQSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <MarqueeNotification />
        <main className="flex-grow">
        <ContactHero />
        <FAQSection />
        
      </main>
    </div>
  );
}