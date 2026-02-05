import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

interface ServiceDetailProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
    icon: React.ReactNode;
  };
}

const ServiceDetail = ({ data }: ServiceDetailProps) => {
  return (
    <article>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0a2f1c]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="mx-auto w-20 h-20 bg-[#E8BA30] rounded-full flex items-center justify-center text-[#0a2f1c] mb-6 shadow-lg shadow-[#E8BA30]/20 animate-in fade-in zoom-in duration-500">
                {data.icon}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                {data.title}
            </h1>
            <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto">
                {data.subtitle}
            </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0a2f1c] mb-8 transition-colors group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Services
            </Link>

            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Description */}
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-serif font-bold text-[#0a2f1c] mb-6">
                        Overview
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        {data.description}
                    </p>
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-[#0a2f1c] mb-4">
                            Why Choose This Program?
                        </h3>
                        <p className="text-gray-600">
                            Our {data.title} program is curated by industry experts to ensure maximum impact. 
                            Whether you are looking to upskill or transform your agricultural practices, 
                            this service provides the tools and network you need to succeed.
                        </p>
                    </div>
                </div>

                {/* Features Box */}
                <div className="md:w-1/3 w-full bg-[#0a2f1c] text-white p-8 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-[#E8BA30] mb-6 uppercase tracking-wider">
                        Key Features
                    </h3>
                    <ul className="space-y-4">
                        {data.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="text-[#E8BA30] shrink-0 mt-1" size={20} />
                                <span className="text-gray-200">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <Link 
                        href="/contact" 
                        className="mt-8 block w-full py-3 bg-[#E8BA30] text-[#0a2f1c] text-center font-bold rounded-xl hover:bg-white hover:text-[#0a2f1c] transition-all"
                    >
                        Enquire Now
                    </Link>
                </div>
            </div>

          </div>
        </div>
      </section>
    </article>
  );
};

export default ServiceDetail;