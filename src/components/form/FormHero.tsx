import { MdKeyboardArrowDown } from "react-icons/md";

const FormHero = () => {
  return (
    // UPDATED: Removed 'pt-32' so mobile stays centered. 
    // Added 'md:pt-44' to push content down ONLY on tablets & laptops.
    <div className="w-11/12 md:w-10/12 mx-auto flex flex-col items-center justify-center text-white gap-6 md:gap-8 md:pt-44">
      
      <div className="animate-fade-in-up px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit flex items-center gap-2 text-sm md:text-base font-medium shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E8BA30] animate-pulse"></span>
        Registration Now Open
      </div>

      <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl lg:text-7xl text-center font-serif leading-tight tracking-tight drop-shadow-lg">
        Faculty Development Program, <br className="hidden md:block" />
        <span className="text-[#E8BA30]">2026</span>
      </h1>

      <p className="animate-fade-in-up delay-200 text-lg md:text-xl lg:text-2xl w-full md:w-3/4 lg:w-2/3 text-center text-white font-medium leading-relaxed">
        Empowering Education, Research & Agriculture
      </p>
      
      <p className="animate-fade-in-up delay-200 text-lg md:text-xl lg:text-2xl w-full md:w-3/4 lg:w-2/3 text-center leading-relaxed font-light text-gray-100/90">
        Join leading researchers, educators, and professionals from around the
        world for three days of knowledge sharing, networking, and innovation in
        agricultural sciences.
      </p>

      <div className="animate-fade-in-up delay-300 flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4">
        <a
          href="#registerNow"
          className="group relative overflow-hidden text-lg font-bold py-3 px-8 bg-[#E8BA30] rounded-xl text-black flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(232,186,48,0.6)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Register Now
            <MdKeyboardArrowDown
              size={"1.5rem"}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </a>
      </div>
    </div>
  );
};

export default FormHero;