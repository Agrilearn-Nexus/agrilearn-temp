import { ArrowRight, Phone, Mail } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-[#0a2f1c] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#E8BA30]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Begin Your <span className="text-[#E8BA30]">Agricultural Journey?</span>
          </h2>
          <p className="text-lg text-green-100/80 mb-10 leading-relaxed">
            Join thousands of students and farmers who are transforming their careers with AgriLearn Nexus. Let's grow together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/register" 
              className="group bg-[#E8BA30] hover:bg-white text-[#0a2f1c] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Programs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* <Link 
              href="/contact"
              className="border-2 border-white/20 text-white hover:bg-white hover:text-[#0a2f1c] font-semibold py-4 px-8 rounded-xl transition-all"
            >
              Contact Us
            </Link> */}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-green-100/70 text-sm font-medium">
            <a href="tel:+917488468326" className="flex items-center justify-center gap-2 hover:text-[#E8BA30] transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 7488468326</span>
            </a>
            <a href="mailto:support@agrilearnnexus.com" className="flex items-center justify-center gap-2 hover:text-[#E8BA30] transition-colors">
              <Mail className="w-4 h-4" />
              <span>support@agrilearnnexus.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;