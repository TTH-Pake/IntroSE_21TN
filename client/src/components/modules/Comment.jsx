import { useEffect, useState } from "react";
import { message } from "antd";
import avatarIcon from "/src/assets/avatar.png";
import PropTypes from "prop-types";
import { handleGetCommentsByRecipeId } from "../../action/recipesAction";
import { handleGetUserByID } from "../../action/userAction";

const Comment = ({ comments }) => {
  const [detailedComments, setDetailedComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      let newComments = [];

      for (const comment of comments) {
        try {
          const result = await handleGetUserByID(comment.user_id);

          newComments.push({
            user_name: result.name,
            content: comment.content,
          });
        } catch (error) {
          console.error("Error fetching comments:", error.message);
          
        }
      }

      setDetailedComments(newComments);
    };

    fetchComments();
  }, [comments]); // Include comments in the dependency array
  return (
    <div>
      <ul>
        {detailedComments && detailedComments.length > 0 ? (
          detailedComments.map((comment, index) => (
            <div key={index} className="mb-2 flex">
              <img
                src={avatarIcon}
                alt="Avatar"
                className="h-8 w-8 rounded-full mr-3 mt-1"
              />
              <div>
                <p className="font-bold">{comment.user_name}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <li>No comments available.</li>
        )}
      </ul>
    </div>
  );
};

export default Comment;
