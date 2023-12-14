import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
function Articles() {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ sort_by: sortBy, order: sortOrder });

    getArticles(topicSlug, sortBy, sortOrder)
      .then((articlesArr) => {
        setArticles(articlesArr);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [topicSlug, sortBy, sortOrder, setSearchParams]);

  const handleSortChange = (newSortBy) => {
    setSortOrder((prevOrder) =>
      newSortBy === sortBy ? (prevOrder === "asc" ? "desc" : "asc") : "desc"
    );
    setSortBy(newSortBy);
  };

  if (isLoading) {
    return (
      <p className="text-orange-400 text-2xl text-center mt-24 animate-bounce">
        Loading.....
      </p>
    );
  }

  const SortDropdown = () => (
    <select
      className="px-4 py-2 text-sm font-medium  text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600"
      onChange={(e) => handleSortChange(e.target.value)}
      value={sortBy}
    >
      <option value="created_at">Sort by Date</option>
      <option value="comment_count">Sort by Comments</option>
      <option value="votes">Sort by Votes</option>
    </select>
  );

  return (
    <section className="p-4">
      <div className="flex flex-row gap-5 justify-center items-center mb-4">
        <SortDropdown />
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600"
          onClick={() => handleSortChange(sortBy)}
        >
          {sortOrder === "asc" ? "Ascending Order" : "Descending Order"}
        </button>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}

export default Articles;
