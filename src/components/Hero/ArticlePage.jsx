import { getArticleById } from "../utils/api";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoComment } from "react-icons/go";
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";
import { getTimeDifference } from "../utils/dateDifference";

function ArticlePage() {
    const { articleId } = useParams();
    const [article, setArticle] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getArticleById(articleId).then((articleById) => {
         
          setArticle(articleById);
          setIsLoading(false);
        });
      }, [articleId]);
      if (isLoading) return <p className="text-orange-400 text-2xl text-center mt-24 animate-bounce">Loading.....</p>;
  return (
    <div className="flex justify-center mx-auto max-w-2xl">
    
    {article ? (
      (
        <div className="mt-4   rounded-lg border bg-card text-card-foreground shadow-sm bg-white flex flex-col">
          <div className="flex flex-col  space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {article.title}
            </h3>
            <p className="text-sm ">
              posted by u/{article.author}{" "}
              <span>{getTimeDifference(article.created_at)}</span>
            </p>
          </div>
          <div className="p-6 max-h-96 overflow-hidden flex justify-between ">
          <img
              src={article.article_img_url}
              className="max-h-96"
              alt="article image"
            />
          
        
            <div className="flex flex-col justify-center pr-2 ">
              <PiArrowFatUpLight className="w-6 h-6 " />
              <p className="text-center">{article.votes}</p>
              <PiArrowFatDownLight className="w-6 h-6" />
            </div>
            
          </div>
          <div className="flex items-center break-words pl-6 pr-6">
            <p className="text-m">{article.body}</p>
           
          </div>
          <div className="flex flex-row p-6 border-b-4">
            <GoComment alt="icon for comments" className="w-6 h-6" />
            <p className="text-sm"> {article.comment_count} comments</p>
          </div>
          <form className="mb-6 p-8">
        <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border border-gray-500">
            <label  className="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                className="px-0 w-full text-sm  bg-gray-50  text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
        </div>
        
      )
    ) : (
      <p>Article not found</p>
    )}
  </div>
  )
}

export default ArticlePage