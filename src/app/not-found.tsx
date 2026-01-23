import Link from "next/link"

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-green-50/30 font-sans text-gray-800">

            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#dcfce7_100%)]"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-4">

                <div className="relative">
                    <h1 className="text-[150px] font-black leading-none text-green-900/10 md:text-[200px]">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-7xl">🌱</span>
                    </div>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-green-950 md:text-4xl">
                    Crop Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-md text-lg text-gray-600">
                    Looks like you've wandered too far into the field. The page you are looking for hasn't been planted yet or has been harvested.
                </p>

                <div className="mt-10">
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-2 rounded-full bg-[#E8BA30] px-8 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#dca620] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return Home
                    </Link>
                </div>

            </div>

            <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 translate-y-1/2 rounded-full bg-green-200/20 blur-3xl"></div>
            <div className="absolute right-0 top-0 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-yellow-200/20 blur-3xl"></div>
        </div>
    )
}