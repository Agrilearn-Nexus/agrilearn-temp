import {
    Briefcase,
    Handshake,
    Microscope,
    HandHelping,
    GraduationCap,
    Users,
} from "lucide-react"
import ObjectiveCard from "@/components/ObjectiveCard";

const ObjectiveSection = () => {
    const mainObjectives = [
        {
            icon: <Briefcase size={40} />,
            title: "Training Professionals",
            description:
                "We provide offline and online training to train professionals for the Industry, teaching them the latest techniques.",
        },
        {
            icon: <Handshake size={40} />,
            title: "Collaborating",
            description:
                "We cooperate and collaborate with institutions having similar objectives to hold seminars, conferences and discussions.",
        },
        {
            icon: <Microscope size={40} />,
            title: "Promotion of Research",
            description:
                "AEEFWS is mainly engaged in the promotion of research in the field of Agricultural and Allied Science.",
        },
        {
            icon: <HandHelping size={40} />,
            title: "Providing Assistance",
            description:
                "We are actively helping research workers by providing financial and other help.",
        },
        {
            icon: <GraduationCap size={40} />,
            title: "Educating Young Minds",
            description:
                "We believe the first step of society in the right direction would come from educating and motivating young minds.",
        },
        {
            icon: <Users size={40} />,
            title: "Build Community",
            description:
                "Foster a network of agricultural professionals, researchers, and farmers working together.",
        },
    ]

    return (
        <section id="objective" className="bg-[#ECF4EE] py-20 md:py-28 relative">
            <div className="flex flex-col items-center w-11/12 max-w-6xl mx-auto gap-4 mb-16 text-center">
                <h3 className="text-sm font-bold tracking-[0.2em] text-[#2E6041] uppercase">
                    Our Purpose
                </h3>
                <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#16261E]">
                    Our Main Objectives
                </h1>
                <p className="text-lg md:text-xl w-full md:w-2/3 text-[#2E6041]/80 leading-relaxed mt-2">
                    Driving meaningful change in agriculture through focused initiatives
                    and collaborative efforts.
                </p>
            </div>

            <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {mainObjectives.map((item, index) => (
                    <ObjectiveCard key={index} value={item} />
                ))}
            </div>
        </section>
    )
}

export default ObjectiveSection
