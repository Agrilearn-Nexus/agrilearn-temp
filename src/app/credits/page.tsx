"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Code2, Globe, Sparkles, Mail, Phone } from "lucide-react";
import DeveloperCard, { developers } from "@/components/credits/DeveloperCard";

const Credits = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[600px] flex flex-col overflow-hidden pt-24">
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

        {/* Navigation */}
        {/* <div className="container relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#E8BA30] transition-colors duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2 opacity-90">
            <Code2 className="w-5 h-5 text-[#E8BA30]" />
            <span className="font-serif font-bold text-gray-100 text-sm">
              Built by Our Team
            </span>
          </div>
        </div> */}

        {/* Hero Content */}
        <div className="container relative z-10 max-w-6xl mx-auto text-center flex-grow flex flex-col justify-center pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8BA30]/20 border border-[#E8BA30]/30 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#E8BA30]" />
              <span className="text-[#E8BA30] text-sm font-bold">
                Website Credits
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-white">
              Crafted with <span className="text-[#E8BA30]">Passion</span>
              <br />
              by Our Development Team
            </h1>

            <p className="text-gray-200 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              This website was designed and developed by our talented team. We
              specialize in creating beautiful, high-performance digital
              experiences.
            </p>
          </motion.div>
        </div>

        {/* ===== SVG WAVE DIVIDER ===== */}
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
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="container max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
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
      <section className="py-24 px-6">
        <div className="container max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white border border-gray-200 p-10 md:p-16 shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-[#2E6041]">
              What We <span className="text-[#E8BA30]">Delivered</span>
            </h2>


            <p className="max-w-3xl mx-auto mt-3 mb-14 text-center text-gray-600 leading-relaxed">
              From design to deployment, our focus remained on clean
              architecture, modern interaction patterns, and a future-ready
              technology stack.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-7 h-7" />,
                  title: "Responsive Website",
                  desc: "Optimized for all devices, ensuring consistent layouts and smooth performance on mobiles, tablets, and desktops.",
                  extra:
                    "Carefully tested across screen sizes to maintain readability, usability, and visual balance.",
                },
                {
                  icon: <Sparkles className="w-7 h-7" />,
                  title: "Modern UI/UX",
                  desc: "A clean, minimal interface combined with subtle animations for a polished and engaging experience.",
                  extra:
                    "Designed with user behavior in mind to reduce friction and improve overall interaction flow.",
                },
                {
                  icon: <Code2 className="w-7 h-7" />,
                  title: "Clean Codebase",
                  desc: "Structured and maintainable code built using modern best practices and scalable patterns.",
                  extra:
                    "Powered by Next.js and Tailwind CSS to ensure speed, flexibility, and future extensibility.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#E8BA30]/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#E8BA30]/10 flex items-center justify-center mx-auto mb-6 text-[#E8BA30]">
                    {item.icon}
                  </div>

                  <h3 className="font-serif font-semibold text-lg mb-4">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {item.desc}
                  </p>

                  {/* 🔹 Extra content line */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.extra}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 🔹 Bottom summary content */}
            <div className="mt-16 text-center">
              <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
                The final outcome is a reliable, visually consistent, and
                scalable solution that aligns with modern web standards and
                supports future enhancements.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="py-8 px-6">
        <div className="container w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#2E6041] text-white p-8 md:p-12 text-center border-2 border-[#E8BA30]/20"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Want a Website Like This?
            </h2>

            <p className="text-gray-200 max-w-lg mx-auto mb-8">
              We build stunning, high-performance websites for modern
              businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@company.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8BA30] text-[#16261E] font-bold hover:bg-white transition-all"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>

              <a
                href="tel:+919999999999"
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
