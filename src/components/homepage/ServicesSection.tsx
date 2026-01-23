import {
    Mic2,
    GraduationCap,
    Projector,
    UserCog,
    Tractor,
    Trophy,
} from "lucide-react"
import ServiceCard from "./ServiceCard"

const ServicesSection = () => {
    const services = [
        {
            icon: <Mic2 size={32} />,
            title: "Conference",
            description:
                "National and international gatherings connecting scientific researchers, industry professionals, and farmers to discuss agricultural innovations.",
        },
        {
            icon: <GraduationCap size={32} />,
            title: "Trainings",
            description:
                "Specialized skill-development programs designed for students and professionals to master modern agricultural practices and technologies.",
        },
        {
            icon: <Projector size={32} />,
            title: "Workshops",
            description:
                "Hands-on interactive sessions focusing on practical implementations, from organic farming techniques to digital tools.",
        },
        {
            icon: <UserCog size={32} />,
            title: "FDP Program",
            description:
                "Faculty Development Programs aimed at upgrading the teaching methodologies and research capabilities of academic staff.",
        },
        {
            icon: <Tractor size={32} />,
            title: "Agri Fair & Expo",
            description:
                "Large-scale exhibitions showcasing the latest farm machinery, hybrid seeds, and agri-tech solutions to the farming community.",
        },
        {
            icon: <Trophy size={32} />,
            title: "Award Conclave",
            description:
                "Prestigious events dedicated to recognizing and honoring excellence among innovative farmers, scientists, and agri-startups.",
        },
    ]

    return (
        <section id={"services"} className="bg-white py-16 md:py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E6041] via-[#E8BA30] to-[#2E6041]"></div>

            <div className="flex flex-col items-center w-11/12 max-w-7xl mx-auto gap-4 md:gap-6 mb-16">
                <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#E8BA30] uppercase">
                    What We Offer
                </h3>
                <h1 className="font-serif text-3xl md:text-5xl font-semibold text-center text-[#16261E]">
                    Services – What We Do
                </h1>
                <div className="w-24 h-1.5 bg-[#2E6041] rounded-full my-2"></div>
                <p className="text-lg md:text-xl w-full md:w-2/3 text-center text-gray-600 leading-relaxed">
                    Comprehensive services designed to transform agriculture through
                    education, research, and community engagement.
                </p>
            </div>

            <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {services.map((item, index) => (
                    <ServiceCard key={index} value={item} />
                ))}
            </div>
        </section>
    )
}

export default ServicesSection
