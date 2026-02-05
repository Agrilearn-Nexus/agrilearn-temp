import { Users, BookOpen, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "1,500+", label: "Students & Farmers" },
  { icon: BookOpen, value: "2+", label: "Programs Delivered" },
  { icon: Award, value: "5+", label: "Industry Partners" },
  { icon: Globe, value: "5+", label: "States Covered" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-[#0a2f1c] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8BA30]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#E8BA30]/20">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center px-4 group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-[#E8BA30]/10 rounded-full group-hover:bg-[#E8BA30] transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-[#E8BA30] group-hover:text-[#0a2f1c] transition-colors" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <p className="text-green-100/70 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;