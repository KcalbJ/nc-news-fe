import { getTimeDifference } from "../utils/dateDifference";
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";

function CommentCard({ comment }) {
  return (
    <div className="mb-4 p-4 border bg-gray-100 rounded-lg">
      <p className="text-sm">{comment.body}</p>
      <div className="flex flex-row">
        <p className="text-xs text-gray-500 mt-2">
          Posted by u/{comment.author} {getTimeDifference(comment.created_at)}
        </p>

        <PiArrowFatUpLight className="w-4 h-4 mt-2 ml-4" />
        <p className="text-xs text-gray-900 mt-2 ">{comment.votes}</p>
        <PiArrowFatDownLight className="w-4 h-4 mt-2" />
      </div>
    </div>
  );
}

export default CommentCard;
