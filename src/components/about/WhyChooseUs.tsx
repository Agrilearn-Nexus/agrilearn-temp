import { GraduationCap, Leaf, Users, Lightbulb, Shield, TrendingUp } from "lucide-react";

const features = [
  { icon: GraduationCap, title: "Expert-Led Programs", description: "Learn from seasoned agricultural experts and renowned professors." },
  { icon: Leaf, title: "Sustainable Focus", description: "Emphasis on eco-friendly and sustainable farming practices." },
  { icon: Users, title: "Community Driven", description: "Join a network of farmers, students, and educators." },
  { icon: Lightbulb, title: "Innovative Methods", description: "Cutting-edge teaching techniques and modern technologies." },
  { icon: Shield, title: "Certified Courses", description: "Industry-recognized certifications for career advancement." },
  { icon: TrendingUp, title: "Practical Training", description: "Hands-on field experience and real-world applications." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-[#0a2f1c] bg-[#0a2f1c]/10 rounded-full mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c] mb-4">
            What Sets Us Apart
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg">
            We combine traditional agricultural wisdom with modern educational approaches to create transformative learning experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-8 bg-gray-50 rounded-2xl border border-transparent hover:border-[#E8BA30]/50 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-[#0a2f1c]/10 rounded-xl group-hover:bg-[#E8BA30] transition-all duration-300">
                <feature.icon className="w-7 h-7 text-[#0a2f1c] group-hover:text-[#0a2f1c]" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2f1c] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;