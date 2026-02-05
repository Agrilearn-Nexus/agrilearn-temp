import {
    Sprout,
    Projector,
    Microscope,
    Briefcase,
    BookOpen,
    Laptop,
} from "lucide-react";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
    const services = [
        {
            icon: <Sprout size={32} />,
            title: "Farmer Training",
            slug: "farmer-training",
            description: "Empowering farmers with modern techniques, sustainable crop management skills, and organic farming practices.",
        },
        {
            icon: <Projector size={32} />,
            title: "Workshops",
            slug: "workshops",
            description: "Interactive hands-on sessions covering diverse agricultural topics, fostering practical learning.",
        },
        {
            icon: <Microscope size={32} />,
            title: "Research",
            slug: "research",
            description: "Cutting-edge agricultural research initiatives focused on innovative solutions and soil health.",
        },
        {
            icon: <Briefcase size={32} />,
            title: "Consultancy",
            slug: "consultancy",
            description: "Expert advisory services for farms and agri-businesses, offering tailored strategies for growth.",
        },
        {
            icon: <BookOpen size={32} />,
            title: "Publications",
            slug: "publications",
            description: "Access to a vast repository of agricultural journals, research papers, and newsletters.",
        },
        {
            icon: <Laptop size={32} />,
            title: "Digital Learning",
            slug: "digital-learning",
            description: "Flexible online courses and webinars allowing remote access to expert agricultural education.",
        },
    ];

    return (
        <section id="services" className="bg-white py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#2E6041] via-[#E8BA30] to-[#2E6041]"></div>

            <div className="flex flex-col items-center w-11/12 max-w-7xl mx-auto gap-4 md:gap-6 mb-16">
                <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#E8BA30] uppercase">
                    What We Offer
                </h3>
                <h1 className="font-serif text-3xl md:text-5xl font-semibold text-center text-[#16261E]">
                    Our Services
                </h1>
                <div className="w-24 h-1.5 bg-[#2E6041] rounded-full my-2"></div>
                <p className="text-lg md:text-xl w-full md:w-2/3 text-center text-gray-600 leading-relaxed">
                    Comprehensive solutions designed to empower the agricultural community through education and innovation.
                </p>
            </div>

            <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {services.map((item, index) => (
                    <ServiceCard key={index} value={item} />
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;