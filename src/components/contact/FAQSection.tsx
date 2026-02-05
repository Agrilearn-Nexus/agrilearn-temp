"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "How can I register for an agricultural event?",
    answer: "You can register for any of our agricultural events by visiting our Events page and clicking on the 'Register Now' button. Fill in the form, and you'll receive a confirmation email."
  },
  {
    question: "Who can attend the agricultural training programs?",
    answer: "Our programs are open to students, professors, researchers, farmers, and anyone interested in agricultural education. We have tracks for all experience levels."
  },
  {
    question: "Are certificates provided after completion?",
    answer: "Yes, all participants who successfully complete our training programs receive a verified certificate of completion."
  },
  {
    question: "How can I become a speaker or trainer?",
    answer: "We welcome agricultural experts! Please send your CV and a brief proposal to our email address. Our team will review your application within 7-10 days."
  },
  {
    question: "Do you offer online/virtual training?",
    answer: "Yes, we offer both in-person and virtual programs. Online sessions are conducted via interactive platforms with real-time Q&A."
  }
];

const FAQSection = () => {
  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-[#0a2f1c] bg-[#0a2f1c]/10 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#0a2f1c] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our agricultural education events.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom Accordion Component
function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-300 ${isOpen ? 'border-[#E8BA30] shadow-md' : 'border-gray-200 hover:border-[#E8BA30]/50'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={`font-bold text-lg ${isOpen ? 'text-[#0a2f1c]' : 'text-gray-700'}`}>
          {question}
        </span>
        <span className={`p-1 rounded-full ${isOpen ? 'bg-[#E8BA30] text-[#0a2f1c]' : 'bg-gray-100 text-gray-500'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default FAQSection;