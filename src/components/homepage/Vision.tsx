import { LuQuote } from "react-icons/lu"

const Vision = () => {
    return (
        <section
            id="vision"
            className="relative bg-center bg-cover bg-no-repeat bg-fixed py-20 md:py-32"
            style={{ backgroundImage: `url(/vision-background.jpg)` }}
        >
            <div className="absolute inset-0 bg-[#16261E]/80 mix-blend-multiply"></div>

            <div className="relative z-10 w-11/12 max-w-5xl mx-auto flex flex-col gap-8 items-center text-center">

                <h3 className="text-[#E8BA30] text-sm md:text-base font-bold tracking-[0.3em] uppercase animate-fade-in-up">
                    Our Vision
                </h3>

                <div className="text-[#E8BA30] animate-fade-in-up delay-100">
                    <LuQuote className="text-5xl md:text-7xl opacity-80" />
                </div>

                <p className="text-2xl md:text-4xl lg:text-5xl text-white font-serif font-medium leading-tight md:leading-snug animate-fade-in-up delay-200 drop-shadow-lg">
                    To become a leading platform transforming agriculture through
                    education, research, and innovation while empowering communities for a{" "}
                    <span className="text-[#E8BA30] italic">sustainable future</span>.
                </p>

                <div className="flex items-center gap-4 mt-8 animate-fade-in-up delay-300">
                    <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#E8BA30]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#E8BA30] shadow-[0_0_15px_#E8BA30]"></div>
                    <div className="w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#E8BA30]"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10 animate-fade-in-up delay-300">
                    {["Innovation", "Sustainability", "Empowerment"].map((word, index) => (
                        <span
                            key={index}
                            className="text-white/80 font-serif text-lg md:text-xl tracking-wider uppercase border-b-2 border-transparent hover:text-[#E8BA30] hover:border-[#E8BA30] transition-all duration-300 cursor-default"
                        >
              {word}
            </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Vision
