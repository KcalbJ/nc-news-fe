import {
  getArticleById,
  getCommentsByArticleId,
  postComment,
  voteOnArticle,
} from "../utils/api";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";
import { getTimeDifference } from "../utils/dateDifference";
import CommentCard from "./CommentCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const commentsSectionRef = useRef(null);
  const [votes, setVotes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { user, isLoading } = useContext(UserContext);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
    postComment(articleId, { username: user.username, body: newComment })
      .then((postedCom) => {
        setComments((curComments) => [postedCom, ...curComments]);
        toast.success("Comment posted successfully!");
        setSubmitted(false);
      })
      .catch((error) => {
        toast.error("Error posting comment, please try again");
      });
    setNewComment("");
  };

  const handleVoteClick = (voteValue) => {
    setVotes((currVotes) => currVotes + voteValue);

    voteOnArticle(articleId, voteValue)
      .then(() => {})
      .catch((error) => {
        setVotes((prevVotes) => prevVotes - voteValue);
        toast.error("Error updating votes, please try again");
      });
  };

  const handleUpVoteClick = () => {
    handleVoteClick(1);
  };

  const handleDownVoteClick = () => {
    handleVoteClick(-1);
  };

  const scrollToComments = () => {
    if (commentsSectionRef.current) {
      commentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleCommentDelete = (deletedCommentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== deletedCommentId)
    );
  };

  useEffect(() => {
    setIsLoad(true);
    getArticleById(articleId)
    .then((articleById) => {
      setArticle(articleById);
      setVotes(articleById.votes);
    })
    .catch((error) => {
      console.error("Error fetching article:", error);
      setArticle(null);
    })
    .finally(() => {
      setIsLoad(false);
    });
  }, [articleId]);

  useEffect(() => {
    getCommentsByArticleId(articleId).then((commentsData) => {
      setComments(commentsData);
    });
  }, [articleId]);

  if (isLoad)
    return (
      <p className="text-orange-400 text-2xl text-center mt-24 animate-bounce">
        Loading.....
      </p>
    );
    if (!article)
    return (
      <div className="flex justify-center mx-auto max-w-2xl">
        <p>Article not found</p>
      </div>
    );
  return (
    <div className="flex justify-center mx-auto max-w-2xl">
      <ToastContainer />
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
          <div className="p-6 max-h-96 overflow-hidden flex  pr-10 justify-between ">
            <img
              src={article.article_img_url}
              className="max-h-96"
              alt="article image"
            />

            <div className="flex flex-col justify-center pr-2 ">
              <button onClick={handleUpVoteClick} className="w-8 h-8 mr-2">
                <PiArrowFatUpLight className="w-full h-full" />
              </button>
              <p className="text-lg font-semibold ml-2 ">{votes}</p>
              <button onClick={handleDownVoteClick} className="w-8 h-8 mr-2">
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
          <form className="mb-6 p-8" onSubmit={handleCommentSubmit}>
            <div className="py-2 px-4 mb-4 bg-gray-50 rounded-lg rounded-t-lg border border-gray-500">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                rows="6"
                value={newComment}
                onChange={handleCommentChange}
                className="px-0 w-full text-sm bg-gray-50 text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitted}
              onSubmit={handleCommentSubmit}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-slate-200 rounded-lg  hover:bg-slate-800 hover:text-white"
            >
              {submitted ? "Posting..." : "Post comment"}
            </button>
          </form>
          <div ref={commentsSectionRef} className="p-6 border-t-4">
            <h4 className="text-lg font-semibold mb-2">Comments</h4>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  onDelete={handleCommentDelete}
                />
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
}

export default ArticlePage;
