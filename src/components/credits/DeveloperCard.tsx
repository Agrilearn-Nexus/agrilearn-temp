"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Code2,
  Palette,
  Server,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

// --- Types ---
export interface Skill {
  icon: React.ReactNode;
  label: string;
}

export interface Developer {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: Skill[];
  email: string;
  linkedin?: string;
  github?: string;
}

// --- Data ---
export const developers: Developer[] = [
  {
    name: "Aryan Kumar",
    role: "Backend Engineer · Arks Labs",
    image: "/aryan-kumar.jpg",
    bio: "Backend Engineer at Arks Labs, Aryan developed the backend architecture of the AgriLearn Nexus website. He worked on APIs, database integration, performance optimization, and scalable system design to ensure a secure and reliable platform.",
    skills: [
      { icon: <Server className="w-4 h-4" />, label: "Backend Development" },
      { icon: <Code2 className="w-4 h-4" />, label: "API & System Design" },
      {
        icon: <Palette className="w-4 h-4" />,
        label: "Performance Optimization",
      },
    ],
    email: "aryanak9163@gmail.com",
    linkedin: "https://www.linkedin.com/in/aryankumarofficial/",
    github: "https://github.com/AryanKumarOfficial",
  },
  {
    name: "Aditya Singh",
    role: "Frontend Engineer · Arks Labs",
    image: "/aditya-singh.jpg",
    bio: "Frontend Engineer at Arks Labs, Aditya designed and developed the frontend of the AgriLearn Nexus website. He focused on modern UI/UX design, responsive layouts, and smooth user interactions to deliver a polished and engaging user experience.",
    skills: [
      { icon: <Palette className="w-4 h-4" />, label: "Frontend Development" },
      { icon: <Code2 className="w-4 h-4" />, label: "UI/UX Design" },
      { icon: <Smartphone className="w-4 h-4" />, label: "Responsive Design" },
    ],
    email: "adityasingh3902@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditya3902/",
    github: "https://github.com/aditya-singhOfficial",
  },
];


const DeveloperCard = ({
  developer,
  index,
}: {
  developer: Developer;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 transition-all duration-500 hover:shadow-xl hover:border-[#E8BA30]/50 shadow-sm">
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8BA30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Photo Section */}
          <div className="relative shrink-0">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#E8BA30]/20 group-hover:border-[#E8BA30] transition-colors duration-500 relative bg-gray-100">
              {/* Fallback if image is missing, or use Next/Image */}
              {/* Note: If you have real images, uncomment the Image component below. 
                  For now, we use a placeholder div so the layout works immediately.
               */}
              <Image
                src={developer.image}
                alt={developer.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                User Image
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#E8BA30] flex items-center justify-center shadow-lg">
              <Code2 className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              {developer.name}
            </h3>
            <p className="text-[#E8BA30] font-bold text-sm tracking-wider uppercase mt-1">
              {developer.role}
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed max-w-lg">
              {developer.bio}
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
              {developer.skills.map((skill) => (
                <span
                  key={skill.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 group-hover:bg-[#ECF4EE] group-hover:text-[#2E6041] transition-colors"
                >
                  {skill.icon}
                  {skill.label}
                </span>
              ))}
            </div>

            {/* Contact Links */}
            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              <a
                href={`mailto:${developer.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2E6041] text-white text-sm font-semibold hover:bg-[#16261E] hover:shadow-lg transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
              {developer.linkedin && (
                <a
                  href={developer.linkedin}
                  target="_blank"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:text-[#0077b5] hover:border-[#0077b5]/30 hover:bg-blue-50 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {developer.github && (
                <a
                  href={developer.github}
                  target="_blank"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:border-black/30 hover:bg-gray-50 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperCard;
