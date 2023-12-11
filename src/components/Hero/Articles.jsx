import ArticleCard from "./ArticleCard"
import { getArticles } from "../utils/api";
import { useEffect, useState } from 'react';
function Articles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getArticles().then((articlesArr) => {
         
          setArticles(articlesArr);
          setIsLoading(false);
        });
      }, []);
      if (isLoading) return <p className="text-orange-400 text-2xl text-center mt-24 animate-bounce">Loading.....</p>;

  return (
    <section className="p-4">
    {articles.map((article) => (
        <ArticleCard key={article.index} article={article} />
      ))}
  
  </section>
  )
}

export default Articles