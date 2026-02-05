import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EventsList = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c] mb-4">
             Featured Program
          </h2>
          <div className="w-24 h-1 bg-[#E8BA30] mx-auto rounded-full" />
        </div>

        {/* Event Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex flex-col md:flex-row">
            
            {/* Left: Image */}
            <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
              <Image
                src="/hero-agriculture.jpg" // Specific image for this event
                alt="Faculty Development Program"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#E8BA30] text-[#0a2f1c] text-xs font-bold px-3 py-1.5 rounded shadow-md">
                UPCOMING
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#0a2f1c]/5 text-[#0a2f1c] text-xs font-bold px-3 py-1 rounded-full border border-[#0a2f1c]/10 tracking-wide uppercase">
                  Training Program
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0a2f1c] mb-4 leading-tight">
                Faculty Development Program, 2026
              </h3>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#E8BA30]" />
                  <span className="font-medium">February 21-28, 2026</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#E8BA30]" />
                  <span className="font-medium">10:00 AM - 4:00 PM (Daily)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#E8BA30]" />
                  <span className="font-medium">Virtual</span>
                </div>
              </div>

              <p className="text-gray-500 mb-8 leading-relaxed">
                A comprehensive 8-day program designed for agricultural professors and researchers to explore sustainable farming technologies, modern irrigation methods, and curriculum innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center gap-2 bg-[#0a2f1c] hover:bg-[#0d3b24] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Register Now
                  <ArrowRight size={18} />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0a2f1c] text-[#0a2f1c] hover:bg-gray-50 font-bold py-3.5 px-8 rounded-xl transition-all">
                  Download Brochure
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EventsList;