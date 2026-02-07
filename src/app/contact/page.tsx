import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import FAQSection from "@/components/contact/FAQSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="grow">
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Form Section */}
        <ContactForm />

        {/* FAQ Section */}
        <FAQSection />
      </main>

    </div>
  );
}