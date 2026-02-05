import ArticleCard from "./ArticleCard";
import { ArticleProps } from "./FeaturedArticle";

const ArticleGrid = ({ articles }: { articles: ArticleProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;