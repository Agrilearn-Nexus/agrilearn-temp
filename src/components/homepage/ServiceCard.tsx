import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

const ServiceCard = ({ value }: { value: any }) => {
  // Use provided slug or generate one as fallback
  const slug = value.slug || value.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link 
      href={`/services/${slug}`}
      className="group w-full flex flex-col gap-6 p-8 bg-[#F9F9F5] rounded-2xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(46,96,65,0.15)] hover:-translate-y-2 border border-transparent hover:border-[#E8BA30]/20 cursor-pointer block"
    >
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#F3F3EC] rounded-full z-0 group-hover:bg-[#E8BA30]/10 group-hover:scale-150 transition-all duration-700 ease-in-out"></div>

      <div className="relative z-10 bg-[#396F4D] w-16 h-16 flex items-center justify-center rounded-2xl text-white shadow-lg group-hover:bg-[#E8BA30] group-hover:text-black transition-colors duration-300">
        {value.icon}
      </div>

      <div className="relative z-10 flex flex-col gap-4 grow">
        <h3 className="text-2xl font-serif font-bold text-[#16261E] group-hover:text-[#2E6041] transition-colors">
          {value.title}
        </h3>

        <p className="text-base text-gray-600 leading-relaxed">
          {value.description}
        </p>

        <div className="mt-auto pt-4 flex items-center gap-2">
          <span className="text-sm font-bold text-[#2E6041] uppercase tracking-wider group-hover:underline decoration-2 underline-offset-4">
            Learn More
          </span>
          <IoIosArrowRoundForward
            size={"1.5rem"}
            className="text-[#E8BA30] transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;