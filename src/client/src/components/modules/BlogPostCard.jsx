import commentIcon from "/src/assets/chat.png";
import likeIcon from "/src/assets/heart.png";
import shareIcon from "/src/assets/send_2.png";
import saveIcon from "/src/assets/bookmark.png";
import moreIcon from "/src/assets/more.png";
import { handleGetUserByID } from "../../action/userAction";
import { handleEditBlog, handleDeleteBlog } from "../../action/blogAction";
import { message } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

const BlogPostCard = ({ post, currentUser, onDelete, onEdit }) => {
  const [user, setUser] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(post?.content || "");

  useEffect(
    () => async () => {
      try {
        const userFound = await handleGetUserByID(post?.user_id);
        setUser(userFound);
      } catch (error) {
        message.error(error.message);
      }
    },
    [post]
  );

  const createdTime = moment(post.created_time);
  const timeAgo = createdTime.fromNow();

  const isPostOwner =
    (currentUser && post?.user_id === currentUser.user_id) ||
    (currentUser && currentUser.is_admin);

  const handleEditPost = async () => {
    try {
      setEditing(!isEditing);

      const updatedPost = await handleEditBlog(post.id, editableContent);
      setDropdownOpen(false);
      onEdit(updatedPost);
    } catch (error) {
      console.error("Error editing post:", error.message);
      message.error("Error editing post");
    }
  };

  const handleCancelEdit = () => {
    setEditableContent(post?.content || "");
    setEditing(false);
  };

  const handleSaveEdit = () => {
    setEditableContent(editableContent);
    handleEditPost();
  };

  const handleDeletePost = async () => {
    try {
      const isDeleted = await handleDeleteBlog(post.id);
      if (isDeleted) {
        onDelete(post.id);
      }
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error.message);
      message.error("Error deleting post");
    }
  };
  return (
    <div className="w-1/2 mx-auto mb-3 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center pt-2 pl-4 pr-4">
        <div className="flex items-center text-gray-600 text-sm">
          <img
            className="h-12 w-12 rounded-full object-cover border-2"
            src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/10/31171151/300-hinh-nen-dien-thoai-cute-ngau-cuc-dep-duoc-tai-nhieu1667185911.jpg"
            alt=""
          />
          <div className="ml-2 items-center">
            <div className="flex flex-row space-x-2 items-center">
              <h1 className="text-base font-semibold text-black">
                {user.name}
              </h1>
              <h1>{timeAgo}</h1>
            </div>
            <h1>TP Hồ Chí Minh, Việt Nam</h1>
          </div>
        </div>

        <div className="ml-auto pr-2 relative">
          <img
            className="h-5 w-5 cursor-pointer"
            src={moreIcon}
            alt=""
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="auth-menu absolute transform mt-1 bg-gray-100 border rounded-md shadow-lg w-32 text-center z-10 transition duration-300">
              {isPostOwner && (
                <div
                  className="block w-full px-4 py-2 cursor-pointer rounded-t hover:bg-gray-200"
                  onClick={() => {
                    setEditing(!isEditing);
                    setDropdownOpen(!isDropdownOpen);
                  }}
                >
                  Edit
                </div>
              )}

              {isPostOwner && (
                <div
                  className="block w-full px-4 py-2 cursor-pointer rounded-b hover:bg-gray-200"
                  onClick={handleDeletePost}
                >
                  Delete
                </div>
              )}
              {!isPostOwner && (
                <div className="block w-full px-4 py-2 cursor-pointer rounded-b hover:bg-gray-200">
                  Report
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 text-black bg-blue-300 p-4">
        {isEditing ? (
          <div>
            <textarea
              className="w-full h-28 bg-blue-300 outline-none"
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                className="px-4 py-2 mr-2 bg-green-500 text-white rounded"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        )}
      </div>

      <div className="flex items-center p-2.5 ml-3 mr-3">
        {/* Like Icon */}
        <div className="flex items-center mr-4">
          <img src={likeIcon} alt="like" className="h-7 w-7" />
        </div>

        {/* Comment Icon */}
        <div className="flex items-center mr-4">
          <img src={commentIcon} alt="comment" className="h-7 w-7" />
        </div>

        {/* Share Icon */}
        <div className="flex items-center">
          <img src={shareIcon} alt="share" className="h-7 w-7" />
        </div>

        {/* Save Icon */}
        <div className="ml-auto">
          <img src={saveIcon} alt="save" className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
