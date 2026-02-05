import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { ArticleProps } from "./FeaturedArticle";

const ArticleCard = ({ article }: { article: ArticleProps }) => {
  return (
    // Updated Link to point to pdfUrl
    <Link 
      href={article.pdfUrl} 
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#E8BA30]/50 hover:-translate-y-1 h-full relative"
    >
      
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#0a2f1c]/20 group-hover:bg-[#0a2f1c]/10 transition-colors"></div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0a2f1c] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {article.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#E8BA30]" />
            <span className="font-medium">{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-[#E8BA30]" />
            <span className="font-medium line-clamp-1">{article.author}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-[#0a2f1c] mb-4 group-hover:text-[#2E6041] transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
            <span className="text-[#0a2f1c] font-bold group-hover:text-[#E8BA30] transition-colors flex items-center gap-2 text-sm uppercase tracking-wider">
            Read PDF
            </span>
            <div className="w-10 h-10 rounded-full bg-[#0a2f1c]/5 flex items-center justify-center group-hover:bg-[#E8BA30] group-hover:text-[#0a2f1c] transition-all">
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform"/>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;