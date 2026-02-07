"use client";

import { useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, Loader2, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formKey, setFormKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "", 
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    let hasError = false;

    if (!data.name.trim()) {
      setError("name", { type: "manual", message: "Full name is required" });
      hasError = true;
    }
    if (!data.email.trim()) {
      setError("email", { type: "manual", message: "Email is required" });
      hasError = true;
    }
    if (!data.phone.trim()) {
      setError("phone", { type: "manual", message: "Phone number is required" });
      hasError = true;
    }
    if (!data.role) {
      setError("role", { type: "manual", message: "Please select a role" });
      hasError = true;
    }
    if (!data.subject.trim()) {
      setError("subject", { type: "manual", message: "Subject is required" });
      hasError = true;
    }
    if (!data.message.trim()) {
      setError("message", { type: "manual", message: "Message is required" });
      hasError = true;
    }

    if (hasError) return;

    console.log("Form Data Submitted:", data);

    //backend connect kr lena aryan.....

    toast.success("Message Sent! We'll get back to you within 24 hours.");
    
    reset(); 
    
    setFormKey((prev) => prev + 1);
  };

  return (
    <section className="py-20 bg-white relative">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Sidebar: Contact Info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#E8BA30] mb-2">
                GET IN TOUCH
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c]">
                Let's Connect
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Have questions about our agricultural events, conferences, or
                workshops? We're here to help you connect with the right
                opportunities.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: <Mail size={20} />,
                  title: "Email Us",
                  info: "support@agrilearnnexus.com",
                  href: "mailto:support@agrilearnnexus.com",
                  isExternal: false,
                },
                {
                  icon: <Phone size={20} />,
                  title: "Call Us",
                  info: "+91 74884 68326",
                  href: "tel:+917488468326",
                  isExternal: false,
                },
                {
                  icon: <MapPin size={20} />,
                  title: "Visit Us",
                  info: "Tilak Nagar Road, Near Manoupchar Kendra, Begusarai, 851101, India",
                  href: "https://www.google.com/maps/search/?api=1&query=Tilak+Nagar+Road,+Near+Manoupchar+Kendra,+Begusarai,+851101,+India",
                  isExternal: true,
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 group cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0a2f1c]/5 flex items-center justify-center text-[#0a2f1c] group-hover:bg-[#E8BA30] group-hover:text-[#0a2f1c] transition-colors duration-300 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0a2f1c] text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">{item.info}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-[#0a2f1c]/5 border border-gray-100">
              
              <form key={formKey} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0a2f1c] ml-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Full name is required" })}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#E8BA30] focus:ring-[#E8BA30]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0a2f1c] ml-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#E8BA30] focus:ring-[#E8BA30]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Role Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0a2f1c] ml-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("phone", { required: "Phone number is required" })}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#E8BA30] focus:ring-[#E8BA30]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0a2f1c] ml-1">
                      I am a <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register("role", { required: "Please select a role" })}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer text-gray-700 ${
                            errors.role
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-200 focus:border-[#E8BA30] focus:ring-[#E8BA30]"
                          }`}
                      >
                        <option value="">
                          Select your role
                        </option>
                        <option value="student">Student</option>
                        <option value="farmer">Farmer</option>
                        <option value="professor">
                          Professor / Researcher
                        </option>
                        <option value="organization">Organization</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
                        size={18}
                      />
                    </div>
                    {errors.role && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0a2f1c] ml-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    placeholder="What is this regarding?"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                        errors.subject
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#E8BA30] focus:ring-[#E8BA30]"
                      }`}
                  />
                   {errors.subject && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.subject.message}
                      </p>
                    )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0a2f1c] ml-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-[#E8BA30] focus:ring-[#E8BA30]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E8BA30] text-[#0a2f1c] font-bold py-4 rounded-xl hover:bg-[#d6a920] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;