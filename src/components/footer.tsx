import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { ImYoutube } from "react-icons/im";

const Footer = () => {
  // Define precise navigation links
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  // Define service links to match your dynamic routes
  const serviceLinks = [
    { name: "Farmer Training", href: "/services/farmer-training" },
    { name: "Workshops", href: "/services/workshops" },
    { name: "Research", href: "/services/research" },
    { name: "Consultancy", href: "/services/consultancy" },
    { name: "Publications", href: "/services/publications" },
    { name: "Digital Learning", href: "/services/digital-learning" },
  ];

  return (
    <footer
      id="contact"
      className="bg-[#16261E] text-[#B7B8AD] border-t border-gray-700"
    >
      <div className="px-6 py-12 md:px-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Brand Section */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gray-600 overflow-hidden">
              <Image
                src={"/logo.jpeg"}
                alt="AgriLearn Nexus Logo"
                width={48}
                height={48}
                className="object-cover"
                priority
              />
            </div>
            <h1 className="text-2xl font-serif text-[#FBFBF8]">
              AgriLearn Nexus
            </h1>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-gray-400">
            Empowering agriculture through education, research, and innovation.
            Building a sustainable future for farming communities.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-2">
            {[
              {
                icon: <FaFacebookSquare size={24} />,
                url: "https://facebook.com",
              },
              { icon: <FaXTwitter size={24} />, url: "https://twitter.com" },
              { icon: <SiLinkedin size={24} />, url: "https://linkedin.com" },
              { icon: <FaInstagram size={24} />, url: "https://instagram.com" },
              { icon: <ImYoutube size={24} />, url: "https://youtube.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FBFBF8] hover:text-[#E0B732] hover:scale-110 transition-all duration-300"
                aria-label="social-link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-serif text-[#FBFBF8] border-b border-gray-600 w-fit pb-1">
            Quick Links
          </h1>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="w-fit hover:text-[#E0B732] hover:translate-x-1 transition-transform duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-serif text-[#FBFBF8] border-b border-gray-600 w-fit pb-1">
            Our Services
          </h1>
          <div className="flex flex-col gap-2">
            {serviceLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="w-fit hover:text-[#E0B732] hover:translate-x-1 transition-transform duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-serif text-[#FBFBF8] border-b border-gray-600 w-fit pb-1">
            Contact Us
          </h1>

          <div className="flex gap-3 items-start">
            <IoLocationOutline
              size={28}
              className="text-[#E0B732] shrink-0 mt-1"
            />
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E0B732] transition-colors leading-snug"
            >
              Tilak Nagar Road, Near Manoupchar Kendra, Begusarai, 851101, India
            </a>
          </div>

          <div className="flex gap-3 items-center">
            <IoCallOutline size={22} className="text-[#E0B732] shrink-0" />
            <a
              href="tel:+917488468326"
              className="hover:text-[#E0B732] transition-colors"
            >
              +91 7488468326
            </a>
          </div>

          <div className="flex gap-3 items-center">
            <CiMail size={24} className="text-[#E0B732] shrink-0" />
            <a
              href="mailto:support@agrilearnnexus.com"
              className="hover:text-[#E0B732] transition-colors break-all"
            >
              support@agrilearnnexus.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;