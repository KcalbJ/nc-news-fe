import { GoComment } from "react-icons/go";
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";
import { getTimeDifference } from "../utils/dateDifference";


function ArticleCard({ article }) {
  return (
    <div className="mt-4 rounded-lg border bg-card text-card-foreground shadow-sm bg-white flex flex-col">
      <div className="flex flex-col  space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {article.title}
        </h3>
        <p className="text-sm ">
          posted by u/{article.author}{" "}
          <span>{getTimeDifference(article.created_at)}</span>
        </p>
      </div>
      <div className="p-6 max-h-96 overflow-hidden flex justify-between">
        <img
          src={article.article_img_url}
          className="max-h-64"
          alt="article image"
        />
        <div className="flex flex-col justify-center">
          <PiArrowFatUpLight className="w-6 h-6" />
          <p className="text-center">{article.votes}</p>
          <PiArrowFatDownLight className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center pl-6">
        <button className="text-blue-500 hover:underline" href="#">
          Read More
        </button>
      </div>
      <div className="flex flex-row p-6">
        <GoComment alt="icon for comments" className="w-6 h-6" />
        <p className="text-sm"> {article.comment_count} comments</p>
      </div>
    </div>
  );
}

export default ArticleCard;
