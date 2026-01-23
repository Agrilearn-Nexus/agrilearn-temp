const ObjectiveCard = ({ value }: { value: any }) => {
    return (
        <div className="group w-full flex flex-col items-center text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:border-[#E8BA30]/30">

            <div className="mb-6 p-4 rounded-full bg-[#396F4D] text-white shadow-lg group-hover:scale-110 group-hover:bg-[#E8BA30] group-hover:text-black transition-all duration-300">
                {value.icon}
            </div>

            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#16261E] mb-3 group-hover:text-[#2E6041] transition-colors">
                {value.title}
            </h1>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {value.description}
            </p>
        </div>
    )
}

export default ObjectiveCard
