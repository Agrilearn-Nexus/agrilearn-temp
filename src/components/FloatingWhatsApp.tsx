import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/917488468326?text=Hello%2C%20I%27d%20like%20more%20information%20about%20Agrilearn%20Nexus%20and%20its%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-110 hover:shadow-[0_6px_16px_rgba(37,211,102,0.4)] transition-all duration-300 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp size={32} />
        </a>
    );
};

export default FloatingWhatsApp;