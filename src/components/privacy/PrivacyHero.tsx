import Image from "next/image";

const PrivacyHero = () => {
  return (
    <section className="relative h-[70vh] min-h-100 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/privacyHero.jpg"
          alt="Privacy Policy Background"
          fill
          className="object-cover"
          priority
        />

        {/* ✅ SAME gradient overlay as HeroSection */}
        <div className="absolute inset-0 bg-[#0a2f1c]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#E8BA30] bg-[#0a2f1c]/50 rounded-full border border-[#E8BA30]/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          LEGAL & SECURITY
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Privacy <span className="text-[#E8BA30]">Policy</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Your privacy is important to us. Learn how AgriLearn Nexus protects
          and manages your personal information.
        </p>
      </div>

      {/* ✅ EXACT SAME Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-gray-50"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default PrivacyHero;
