import Image from "next/image";

const EventsHero = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-agriculture.jpg" // Use a relevant event background image
          alt="Events Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-[#0a2f1c]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#E8BA30] bg-white/5 rounded-full border border-[#E8BA30]/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          CALENDAR
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Agrilearnnexus <span className="text-[#E8BA30]">Events</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Join our workshops, seminars, and training programs designed to empower students, professors, and farmers with cutting-edge agricultural knowledge and practices.
        </p>
      </div>
    </section>
  );
};

export default EventsHero;