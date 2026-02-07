"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What types of agricultural events do you organize?",
    answer: "We organize a wide range of events including national and international conferences, hands-on workshops, Faculty Development Programs (FDPs), Agri Expos, field visits, award ceremonies, and research seminars.",
  },
  {
    question: "Who can participate in these events?",
    answer: "Our events are open to students pursuing agriculture and allied sciences, farmers looking to learn modern techniques, professors and researchers, agricultural organizations, and anyone passionate about advancing agriculture.",
  },
  {
    question: "How can I register for an upcoming event?",
    answer: "You can register through our website's event page. Simply browse our upcoming events, select the one you're interested in, and fill out the registration form.",
  },
  {
    question: "Do you offer certificates for participation?",
    answer: "Yes! All participants receive certificates upon successful completion of events. For FDPs and workshops, we provide certificates recognized by academic institutions.",
  },
  {
    question: "Can my institution collaborate with AgriLearn Nexus?",
    answer: "Absolutely! We actively seek partnerships with universities, research institutions, and agricultural organizations. Please reach out through our contact form.",
  },
  {
    question: "Are there virtual or hybrid event options available?",
    answer: "Yes, many of our events offer both in-person and virtual participation options. This ensures accessibility for participants who may not be able to travel.",
  },
  {
    question: "Is there any financial assistance for students?",
    answer: "We offer scholarships and fee waivers for deserving students, especially those from rural backgrounds. Contact us with your academic details.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F9F9F5]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-[#E8BA30] mb-2">
            COMMON QUESTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c]">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 bg-[#0a2f1c] rounded-full mx-auto mt-4"></div>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? "border-[#E8BA30] shadow-lg shadow-[#E8BA30]/10" 
                  : "border-gray-100 hover:border-[#E8BA30]/30"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-serif font-bold text-lg ${openIndex === index ? "text-[#E8BA30]" : "text-[#0a2f1c]"}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 p-2 rounded-full transition-colors ${openIndex === index ? "bg-[#E8BA30] text-[#0a2f1c]" : "bg-gray-100 text-gray-500"}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-dashed border-gray-100 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;