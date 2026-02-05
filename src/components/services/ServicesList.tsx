import { 
  Sprout, 
  Projector, 
  Microscope, 
  Briefcase, 
  BookOpen, 
  Laptop 
} from "lucide-react";
import ServiceCard from "@/components/homepage/ServiceCard"; 

const ServicesList = () => {
  const services = [
    {
      icon: <Sprout size={32} />,
      title: "Farmer Training",
      slug: "farmer-training",
      description: "Comprehensive training modules empowering farmers with modern techniques, sustainable crop management skills, and organic farming practices.",
    },
    {
      icon: <Projector size={32} />,
      title: "Workshops",
      slug: "workshops",
      description: "Interactive hands-on sessions covering diverse agricultural topics, fostering practical learning, skill acquisition, and community knowledge exchange.",
    },
    {
      icon: <Microscope size={32} />,
      title: "Research",
      slug: "research",
      description: "Cutting-edge agricultural research initiatives focused on innovative solutions, soil health improvement, and crop productivity enhancement.",
    },
    {
      icon: <Briefcase size={32} />,
      title: "Consultancy",
      slug: "consultancy",
      description: "Expert advisory services for farms and agri-businesses, offering tailored strategies for growth, operational efficiency, and market sustainability.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Publications",
      slug: "publications",
      description: "Access to a vast repository of agricultural journals, research papers, and newsletters to keep professionals updated with industry trends.",
    },
    {
      icon: <Laptop size={32} />,
      title: "Digital Learning",
      slug: "digital-learning",
      description: "Flexible online courses and webinars allowing remote access to expert agricultural education and certification programs anytime, anywhere.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center max-w-4xl mx-auto gap-4 md:gap-6 mb-16 text-center">
          <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#E8BA30] uppercase">
            WHAT WE PROVIDE
          </h3>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#16261E]">
            Empowering Agriculture
          </h2>
          <div className="w-24 h-1.5 bg-[#2E6041] rounded-full my-2"></div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            We offer a diverse range of services to bridge the gap between traditional farming and modern agricultural advancements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((item, index) => (
            <ServiceCard key={index} value={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;