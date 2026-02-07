"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Globe, Sparkles, Mail, Phone } from "lucide-react";
import DeveloperCard, { developers } from "@/components/credits/DeveloperCard";

const Credits = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[540px] flex flex-col overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/credits-hero-bg.jpg"
            alt="Credits Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 max-w-6xl mx-auto 
            px-4 sm:px-6 md:px-0
            text-center flex-grow flex flex-col justify-center
            pb-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8BA30]/20 border border-[#E8BA30]/30 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#E8BA30]" />
              <span className="text-[#E8BA30] text-sm font-bold">
                Website Credits
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl 
                font-serif font-bold 
                leading-snug md:leading-tight 
                text-white">
              Crafted with <span className="text-[#E8BA30]">Passion</span>
              <br className="hidden sm:block" />
              by Our Development Team
            </h1>

            <p className="text-gray-200 text-base sm:text-lg 
                mt-5 sm:mt-6 
                max-w-2xl mx-auto 
                leading-relaxed">
              This website was designed and developed by our talented team.
              We specialize in creating beautiful, high-performance digital
              experiences.
            </p>
          </motion.div>
        </div>

        {/* SVG Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-gray-50"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ================= DEVELOPERS ================= */}
      <section className="py-14 md:py-16 px-6 bg-white border-y border-gray-100">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Meet the <span className="text-[#E8BA30]">Builders</span>
            </h2>
            <p className="text-gray-500 mt-3">
              The minds behind this digital experience
            </p>
          </motion.div>

          <div className="space-y-8">
            {developers.map((dev, index) => (
              <DeveloperCard key={dev.name} developer={dev} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORK SHOWCASE ================= */}
      <section className="py-20 md:py-24 px-6">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white border border-gray-200 p-10 md:p-14 shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[#2E6041]">
              What We <span className="text-[#E8BA30]">Delivered</span>
            </h2>

            <p className="max-w-3xl mx-auto mt-4 mb-10 text-center text-gray-600 leading-relaxed">
              From design to deployment, our focus remained on clean
              architecture, modern interaction patterns, and a future-ready
              technology stack.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Globe className="w-7 h-7" />,
                  title: "Responsive Website",
                  desc: "Optimized for all devices with consistent layouts and smooth performance.",
                  extra:
                    "Carefully tested across screen sizes for usability and balance.",
                },
                {
                  icon: <Sparkles className="w-7 h-7" />,
                  title: "Modern UI/UX",
                  desc: "Minimal interface with subtle animations for polished interaction.",
                  extra:
                    "Designed to reduce friction and improve user flow.",
                },
                {
                  icon: <Code2 className="w-7 h-7" />,
                  title: "Clean Codebase",
                  desc: "Maintainable, scalable code using modern best practices.",
                  extra:
                    "Built with Next.js and Tailwind CSS.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#E8BA30]/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#E8BA30]/10 flex items-center justify-center mx-auto mb-5 text-[#E8BA30]">
                    {item.icon}
                  </div>

                  <h3 className="font-serif font-semibold text-lg mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    {item.desc}
                  </p>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.extra}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
                The final outcome is a reliable, visually consistent, and
                scalable solution aligned with modern web standards.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="py-12 px-6">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#2E6041] text-white p-10 md:p-12 text-center border-2 border-[#E8BA30]/20"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Want a Website Like This?
            </h2>

            <p className="text-gray-200 max-w-lg mx-auto mb-7">
              We build stunning, high-performance websites for modern
              businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:aryanak9163@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8BA30] text-[#16261E] font-bold hover:bg-white transition-all"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>

              <a
                href="tel:+918235172505"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Credits;
