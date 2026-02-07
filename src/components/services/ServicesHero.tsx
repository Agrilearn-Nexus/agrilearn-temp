import Image from "next/image";

const ServicesHero = () => {
  return (
    <section className="relative h-[60vh] min-h-125 flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-agriculture.jpg"
          alt="Agricultural Services"
          fill
          className="object-cover"
          priority
        />

        {/* ✅ SAME overlay used in other heroes */}
        <div className="absolute inset-0 bg-[#0a2f1c]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-11/12 md:w-10/12 mx-auto text-center flex flex-col items-center gap-6 md:gap-8">
        <span className="animate-fade-in-up px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm md:text-base font-medium text-[#E8BA30] shadow-lg">
          OUR EXPERTISE
        </span>

        <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-tight">
          Our <span className="text-[#E8BA30]">Services</span>
        </h1>

        <p className="animate-fade-in-up delay-200 max-w-2xl text-lg md:text-xl text-gray-200 leading-relaxed">
          Comprehensive solutions designed to empower the agricultural community
          through education, innovation, and expert guidance.
        </p>
      </div>

      {/* ✅ SAME SVG WAVE DIVIDER */}
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
  );
};

export default ServicesHero;
    