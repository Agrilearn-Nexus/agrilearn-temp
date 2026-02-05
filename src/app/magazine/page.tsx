// ... imports
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import MagazineHero from "@/components/magazine/MagazineHero";
import FeaturedArticle, {
  ArticleProps,
} from "@/components/magazine/FeaturedArticle";
import ArticleGrid from "@/components/magazine/ArticleGrid";
import MarqueeNotification from "@/components/MarqueeNotification";

const magazineData: (ArticleProps & { isFeatured?: boolean })[] = [
  {
    id: 1,
    title:
      "The Future of Sustainable Agriculture in India: Challenges and Opportunities",
    excerpt:
      "Exploring innovative practices, government policies, and technological advancements...",
    image: "/hero-agriculture.jpg",
    date: "February 15, 2026",
    author: "Dr. Rajesh Kumar",
    category: "Sustainable Farming",
    slug: "future-sustainable-agriculture-india",
    pdfUrl: "/Dummy_Magazine.pdf",
    isFeatured: true,
  },
  {
    id: 2,
    title:
      "Drones in Agriculture: Revolutionizing Crop Monitoring and Management",
    excerpt:
      "How drone technology is providing farmers with real-time data for precision farming...",
    image: "/hero-agriculture.jpg",
    date: "February 10, 2026",
    author: "Priya Sharma",
    category: "Agri-Tech",
    slug: "drones-in-agriculture",
    pdfUrl: "/Dummy_Magazine.pdf",
  },
  {
    id: 3,
    title: "Organic Farming Success Stories from Rural India",
    excerpt:
      "Inspiring case studies of farmers who have successfully transitioned to organic methods...",
    image: "/hero-agriculture.jpg",
    date: "February 5, 2026",
    author: "Vikram Singh",
    category: "Organic Farming",
    slug: "organic-farming-success-stories",
    pdfUrl: "/Dummy_Magazine.pdf",
  },
  {
    id: 4,
    title: "Understanding Soil Health: The Foundation of Productive Farming",
    excerpt:
      "A deep dive into soil science, covering key indicators of soil health...",
    image: "/hero-agriculture.jpg",
    date: "January 28, 2026",
    author: "Dr. Anita Desai",
    category: "Soil Science",
    slug: "understanding-soil-health",
    pdfUrl: "/Dummy_Magazine.pdf",
  },
];

export default function MagazinePage() {
  const featuredArticle = magazineData.find((article) => article.isFeatured);
  const otherArticles = magazineData.filter((article) => !article.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <MarqueeNotification />
      <main className="grow">
        <MagazineHero />

        <section className="py-24 relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-100 to-transparent -z-10"></div>

          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center mb-20 text-center">
              <span className="text-sm font-bold tracking-[0.2em] text-[#E8BA30] uppercase mb-3">
                LATEST READS
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a2f1c]">
                Featured & Recent Articles
              </h2>
              <div className="w-24 h-1.5 bg-[#0a2f1c] rounded-full my-6"></div>
            </div>

            {featuredArticle && (
              <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <FeaturedArticle article={featuredArticle} />
              </div>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <ArticleGrid articles={otherArticles} />
            </div>

            <div className="mt-20 flex justify-center animate-in fade-in duration-1000 delay-500">
              {/* <button className="group relative overflow-hidden px-10 py-4 bg-transparent border-2 border-[#0a2f1c] text-[#0a2f1c] font-bold rounded-full transition-all hover:shadow-lg">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Load More Articles
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full group-hover:scale-105 transition-all duration-300 group-hover:bg-[#0a2f1c]/90"></div>
              </button> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
