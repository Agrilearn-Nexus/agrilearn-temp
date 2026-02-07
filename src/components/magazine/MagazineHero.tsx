import Image from "next/image";

const MagazineHero = () => {
  return (
    <section className="relative w-full h-[65vh] min-h-100 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-agriculture.jpg"
          alt="AgriLearn Nexus Magazine"
          fill
          className="object-cover"
          priority
        />
        
        <div className="absolute inset-0 bg-[#0a2f1c]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#E8BA30] bg-white/5 rounded-full border border-[#E8BA30]/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          OUR PUBLICATIONS
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          The AgriLearn <span className="text-[#E8BA30]">Magazine</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Insights, innovations, and stories from the world of agriculture. Stay
          informed and inspired with our latest articles.
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
    </section>
  );
};

export default MagazineHero;
