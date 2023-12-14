import { getTimeDifference } from "../utils/dateDifference";
import { PiArrowFatUpLight, PiArrowFatDownLight } from "react-icons/pi";
import { UserContext } from "../context/UserContext";
import { useState, useContext } from "react";
import { deleteComment } from "../utils/api";
import { toast } from "react-toastify";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteModal from "./deleteModal";

function CommentCard({ comment, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useContext(UserContext);



  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    setIsDeleting(true);

    deleteComment(comment.comment_id)
      .then(() => {
        toast.success("Comment deleted successfully!");
        onDelete(comment.comment_id);
      })
      .catch((error) => {
        toast.error("Error deleting comment, please try again");
        setIsDeleting(false);
      });
  };
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-4 p-4 border bg-gray-100 rounded-lg">
      <p className="text-sm">{comment.body}</p>
      <div className="flex flex-row justify-start  ">
        <p className="text-xs text-gray-500 mt-2">
          Posted by u/{comment.author} {getTimeDifference(comment.created_at)}
        </p>

        <PiArrowFatUpLight className="w-4 h-4 mt-2 ml-4" />
        <p className="text-xs text-gray-900 mt-2 ">{comment.votes}</p>
        <PiArrowFatDownLight className="w-4 h-4 mt-2" />
        <div className="pt-2 ml-auto">
          {comment.author === user.username && (
            <FaRegTrashAlt
              onClick={handleDeleteClick}
              className={` w-4 h-4 ${
                isDeleting ? "text-slate-500" : "text-red-500"
              }`}
              role="button"
            />
          )}
        </div>
      </div>
      <DeleteModal 
        isOpen={isModalOpen}
        onRequestClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default CommentCard;
