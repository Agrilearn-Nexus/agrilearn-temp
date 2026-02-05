import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";


export interface ArticleProps {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
    slug: string;
    pdfUrl: string; 
}

const FeaturedArticle = ({ article }: { article: ArticleProps }) => {
  return (
    <Link 
      href={article.pdfUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative block bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#E8BA30]/30"
    >
      <div className="grid md:grid-cols-5 h-full">
        {/* Image Section */}
        <div className="md:col-span-3 relative h-72 md:h-auto overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-[#0a2f1c]/60 to-transparent md:bg-linear-to-l"></div>
           <div className="absolute top-6 left-6 bg-[#E8BA30] text-[#0a2f1c] text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-sm">
            FEATURED STORY
          </div>
        </div>
        
        {/* Content Section */}
        <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-white relative z-10">
          <span className="text-[#E8BA30] font-bold text-sm tracking-[0.15em] uppercase mb-3 block">
            {article.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a2f1c] mb-6 group-hover:text-[#2E6041] transition-colors leading-tight">
            {article.title}
          </h2>
          
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#E8BA30]" />
              <span className="font-medium">{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#0a2f1c]/10 rounded-full flex items-center justify-center">
                <User size={14} className="text-[#0a2f1c]" />
              </div>
              <span className="font-medium">{article.author}</span>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
          
          <span className="inline-flex items-center gap-3 text-white bg-[#0a2f1c] px-8 py-4 rounded-full font-bold tracking-wide hover:bg-[#E8BA30] hover:text-[#0a2f1c] transition-all w-fit group-hover:shadow-lg hover:-translate-y-0.5">
            Read Full Article (PDF)
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;