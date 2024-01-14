import React, { useState } from "react";
import axios from "axios";
import { SendIcon } from "../../assets";

const CommentInput = ({ recipeId, userId, onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      try {
        const content = comment;
        setComment("");

        const response = await axios.post("https://127.0.0.1:8000/comment", {
          user_id: userId,
          recipe_id: recipeId,
          content: content,
        });

        onCommentSubmit();
      } catch (error) {
        console.error("Error creating comment:", error.message);
      }
    }
  };
  return (
    <form onSubmit={handleSendComment}>
      <div className="ml-3 flex bg-white p-2 mt-2 mb-1 border border-gray-700 rounded-full">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comments here..."
          className="flex-1 outline-none border-none ml-2"
        />
        <button
          type="button"
          onClick={handleSendComment}
          className="text-black rounded-md mr-2"
        >
          <img src={SendIcon} alt="send" className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
