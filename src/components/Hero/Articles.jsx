import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Articles() {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(topicSlug).then((articlesArr) => {
      setArticles(articlesArr);
      setIsLoading(false);
    });
  }, [topicSlug]);

  if (isLoading)
    return (
      <p className="text-orange-400 text-2xl text-center mt-24 animate-bounce">
        Loading.....
      </p>
    );

  return (
    <section className="p-4">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

export default Articles;
