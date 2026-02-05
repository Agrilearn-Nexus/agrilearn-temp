import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const ContactHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center py-20 md:py-32 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-agriculture.jpg"
          alt="Contact Us Background"
          fill
          className="object-cover"
          priority
        />

        {/* ✅ SAME gradient overlay as other heroes */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 pt-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#E8BA30] bg-[#0a2f1c]/50 rounded-full border border-[#E8BA30]/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            GET IN TOUCH
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Contact <span className="text-[#E8BA30]">Us</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            We'd love to hear from you! Whether you have a question about our agricultural events, 
            need assistance, or just want to share your feedback.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-300">
          <ContactCard 
            icon={<Phone className="w-6 h-6 text-[#0a2f1c]" />}
            title="Phone"
            content="+91 7488468326"
            href="tel:+917488468326"
          />
          <ContactCard 
            icon={<Mail className="w-6 h-6 text-[#0a2f1c]" />}
            title="Email"
            content="support@agrilearnnexus.com"
            href="mailto:support@agrilearnnexus.com"
          />
          <ContactCard 
            icon={<MapPin className="w-6 h-6 text-[#0a2f1c]" />}
            title="Address"
            content="Tilak Nagar Road, Near Manoupchar Kendra, Begusarai, 851101, India"
            isText
          />
        </div>
      </div>

      {/* ✅ EXACT SAME Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-gray-50"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

// Card Component unchanged
function ContactCard({ icon, title, content, href, isText }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group text-center hover:-translate-y-1 shadow-lg">
      <div className="w-14 h-14 mx-auto bg-[#E8BA30] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#E8BA30]/20">
        {icon}
      </div>
      <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
      {isText ? (
        <p className="text-gray-200 group-hover:text-white transition-colors">{content}</p>
      ) : (
        <a
          href={href}
          className="text-gray-200 hover:text-[#E8BA30] transition-colors font-medium block group-hover:scale-105 transform duration-200"
        >
          {content}
        </a>
      )}
    </div>
  );
}

export default ContactHero;
