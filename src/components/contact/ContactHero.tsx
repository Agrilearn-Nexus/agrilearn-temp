import Image from "next/image";

const ContactHero = () => {
  return (
    <div className="relative h-[70vh] min-h-100 w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/contactHero.png" // Using your public image
          alt="Agricultural Field"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Green Overlay */}
        <div className="absolute inset-0 bg-[#0a2f1c]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center pt-20">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#E8BA30] bg-white/5 rounded-full border border-[#E8BA30]/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          WE'D LOVE TO HEAR FROM YOU
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Contact <span className="text-[#E8BA30]">Us</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg text-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Connecting students, farmers & professors through agricultural
          excellence.
        </p>
      </div>
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
    </div>
  );
};

export default ContactHero;
