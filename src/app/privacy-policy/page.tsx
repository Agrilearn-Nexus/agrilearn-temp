import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyContent from "@/components/privacy/PrivacyContent";
import MarqueeNotification from "@/components/MarqueeNotification";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <MarqueeNotification />
      <main className="grow">
        <PrivacyHero />
        <PrivacyContent />
      </main>
      
    </div>
  );
}