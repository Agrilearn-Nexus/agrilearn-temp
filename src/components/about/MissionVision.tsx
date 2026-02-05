import { Target, Eye, Heart } from "lucide-react";
import Image from "next/image";

const MissionVision = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Side */}
          <div className="relative animate-in fade-in slide-in-from-left duration-700">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#E8BA30]/20 to-[#0a2f1c]/20 rounded-3xl blur-2xl" />
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
               <Image 
                 src="/hero-agriculture.jpg" 
                 alt="Mission"
                 fill
                 className="object-cover"
               />
            </div>
            {/* Float Card */}
            <div className="absolute -bottom-6 -right-6 bg-[#E8BA30] text-[#0a2f1c] px-6 py-4 rounded-xl shadow-xl">
              <span className="text-3xl font-bold block">1+</span>
              <p className="text-sm font-bold uppercase tracking-wide">Years of Excellence</p>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-[#0a2f1c] bg-[#0a2f1c]/10 rounded-full mb-4">
                WHO WE ARE
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c] mb-4">
                Bridging Education & Agriculture
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                AgriLearn Nexus is a dedicated platform committed to revolutionizing agricultural education. We create comprehensive programs that connect students, professors, and farmers.
              </p>
            </div>
            
            <div className="space-y-6">
              <FeatureRow 
                icon={<Target className="w-6 h-6 text-white" />} 
                title="Our Mission"
                desc="To provide accessible, practical agricultural education that empowers individuals."
                bg="bg-[#0a2f1c]"
              />
              <FeatureRow 
                icon={<Eye className="w-6 h-6 text-[#0a2f1c]" />} 
                title="Our Vision"
                desc="A world where every farmer has access to cutting-edge knowledge."
                bg="bg-[#E8BA30]"
              />
              <FeatureRow 
                icon={<Heart className="w-6 h-6 text-white" />} 
                title="Our Values"
                desc="Sustainability, innovation, collaboration, and a deep respect for the land."
                bg="bg-green-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function FeatureRow({icon, title, desc, bg}: any) {
    return (
        <div className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${bg}`}>
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-[#0a2f1c] mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </div>
    )
}

export default MissionVision;