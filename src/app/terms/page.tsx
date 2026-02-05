import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";
import MarqueeNotification from "@/components/MarqueeNotification";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <MarqueeNotification />
      <main className="grow">
        <TermsHero />
        <TermsContent />
      </main>
    </div>
  );
}
