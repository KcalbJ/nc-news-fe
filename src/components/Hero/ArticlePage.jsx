import {
  getArticleById,
  getCommentsByArticleId,
  voteOnArticle,
} from "../utils/api";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";
import { getTimeDifference } from "../utils/dateDifference";
import CommentCard from "./CommentCard";

function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentsSectionRef = useRef(null);
  const [votes, setVotes] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const scrollToComments = () => {
    if (commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVoteClick = (voteValue) => {
    setVotes((currVotes) => currVotes + voteValue);

    voteOnArticle(articleId, voteValue)
      .then(() => {
        setErrorMessage(null);
      })
      .catch((err) => {
        setVotes((currVotes) => currVotes - voteValue);
        console.error("Error:", err);
        setErrorMessage("Failed to submit vote. Please try again.");
      });
  };

  const handleUpVoteClick = () => {
    handleVoteClick(1);
  };

  const handleDownVoteClick = () => {
    handleVoteClick(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId).then((articleById) => {
      setArticle(articleById);
      setVotes(articleById.votes);
      setIsLoading(false);
    });
  }, [articleId]);

  useEffect(() => {
    if (articleId) {
      getCommentsByArticleId(articleId).then((commentsData) => {
        setComments(commentsData);
      });
    }
  }, [articleId]);

  if (isLoading)
    return (
      <p className="text-orange-400 text-2xl text-center mt-24 animate-bounce">
        Loading.....
      </p>
    );
  return (
    <div className="flex justify-center mx-auto max-w-2xl">
      {article ? (
        <div className="mt-4 rounded-lg border shadow-sm bg-white flex flex-col">
          <div className="flex flex-col  space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {article.title}
            </h3>
            <p className="text-sm">
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
              <button onClick={handleUpVoteClick} className="w-8 h-8 mr-2">
                <PiArrowFatUpLight className="w-full h-full" />
              </button>
              <p className="text-lg font-semibold">{votes}</p>
              <button onClick={handleDownVoteClick} className="w-8 h-8 m4-2">
                <PiArrowFatDownLight className="w-full h-full" />
              </button>
            </div>
          </div>
          <div className="flex items-center break-words pl-6 pr-6">
            <p className="text-m">{article.body}</p>
          </div>
          <div
            className="flex flex-row p-6 border-b-4 cursor-pointer"
            onClick={scrollToComments}
          >
            <GoComment alt="icon for comments" className="w-6 h-6" />
            <p className="text-sm"> {article.comment_count} comments</p>
          </div>
          <form className="mb-6 p-8">
            <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border border-gray-500">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-sm  bg-gray-50  text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>
          <div ref={commentsSectionRef} className="p-6 border-t-4">
            <h4 className="text-lg font-semibold mb-2">Comments</h4>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default ArticlePage;
