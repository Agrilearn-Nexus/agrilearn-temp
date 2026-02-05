import { IoIosArrowRoundForward } from "react-icons/io";
import { CiPlay1 } from "react-icons/ci";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto flex flex-col items-center justify-center text-white gap-6 md:gap-8 pt-18 md:pt-26">
      <div className="animate-fade-in-up px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit flex items-center gap-2 text-sm md:text-base font-medium shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E8BA30] animate-pulse"></span>
        Transforming Agriculture Through Education
      </div>

      <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl lg:text-7xl text-center font-serif leading-tight tracking-tight drop-shadow-lg">
        Empowering Education, <br className="hidden md:block" />
        <span className="text-[#E8BA30]">Research</span> &{" "}
        <span className="text-[#E8BA30]">Agriculture</span>
      </h1>

      <p className="animate-fade-in-up delay-200 text-lg md:text-xl lg:text-2xl w-full md:w-3/4 lg:w-2/3 text-center text-gray-100/90 font-light leading-relaxed">
        Transforming agriculture through knowledge, innovation, and training for
        a sustainable future.
      </p>

      <div className="animate-fade-in-up delay-300 flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4">
        <Link
          href={"/register"}
          className="group relative overflow-hidden text-lg font-bold py-3 px-8 bg-[#E8BA30] rounded-xl text-black flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(232,186,48,0.6)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Register
            <IoIosArrowRoundForward
              size={"1.5rem"}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>

        <Link
  href="https://www.youtube.com/@agrilearnnexus"
  target="_blank"
  rel="noopener noreferrer"
  className="group text-lg font-semibold py-3 px-8 border border-white/40 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
>
  <CiPlay1 className="group-hover:scale-110 transition-transform duration-300" />
  Watch Our Story
</Link>

      </div>

      <div className="animate-fade-in-up delay-300 grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8 md:mt-10">
        {[
          { total: "1K+", work: "Farmers Trained" },
          { total: "2+", work: "Workshops Held" },
          { total: "10+", work: "Research Papers" },
          { total: "5+", work: "Partner Inst." },
        ].map((item, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md shadow-lg hover:bg-black/40 hover:border-[#E8BA30]/50 transition-all duration-500 hover:-translate-y-1"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-[#E8BA30] drop-shadow-md">
              {item.total}
            </h1>
            <div className="w-8 h-0.5 bg-white/20 my-2 group-hover:bg-[#E8BA30] transition-colors duration-500"></div>
            <p className="text-xs md:text-sm text-gray-200 font-medium tracking-wide uppercase text-center">
              {item.work}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
