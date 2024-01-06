import axios from "axios";
import { message } from "antd";

export const handleGetAllBlogs = async () => {
  try {
    const response = await axios.get(`https://127.0.0.1:8000/blog`);

    if (response.data.success) {
      return response.data.blogs;
    } else {
      message.error(response.data.error);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

export const handleEditBlog = async (blogId, updatedContent) => {
  try {
    const response = await axios.put(
      `https://127.0.0.1:8000/blog/editBlog/${blogId}`,
      {
        updatedContent,
      }
    );

    if (response.data.success) {
      message.success("Change successful!");
      return response.data.updatedBlog;
    } else {
      message.error(response.data.error);
    }
  } catch (error) {
    console.error("Error editing blog:", error.message);
  }
};

export const handleDeleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(
      `https://127.0.0.1:8000/blog/deleteBlog/${blogId}`
    );

    if (response.data.success) {
      message.success("Delete successful!");
      return true;
    }
  } catch (error) {
    console.error("Error deleting blog:", error.message);
  }
};

export const handleCreateBlog = async (content, user_id) => {
  try {
    const response = await axios.post(
      "https://127.0.0.1:8000/blog/createBlog",
      {
        content,
        user_id,
      }
    );
    if (response.data) {
      message.success("Posting completed successfully.");
      return response.data;
    } else message.error("Error! Blog posting failed");
  } catch (error) {
    console.error("Error creating blog:", error.message);
    throw error;
  }
};
