import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      <main className="grow">
        <TermsHero />
        <TermsContent />
      </main>
      
    </div>
  );
}