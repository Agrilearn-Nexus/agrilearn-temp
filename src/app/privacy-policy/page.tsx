import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyContent from "@/components/privacy/PrivacyContent";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      <main className="flex-grow">
        <PrivacyHero />
        <PrivacyContent />
      </main>
      
    </div>
  );
}