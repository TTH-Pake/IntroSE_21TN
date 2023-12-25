import axios from 'axios';
import { message } from "antd";

export const handleGetAllBlogs = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/blog`);

        if (response.data.success) {
            return response.data.blogs;
        }
        else {
            message.error(response.data.error);
        }

    } catch (error) {
        console.error("Error fetching blogs:", error.message);
    }
};

export const handleEditBlog = async (blogId, updatedContent) => {
    try {

        const response = await axios.put(`http://127.0.0.1:8000/blog/editBlog/${blogId}`, {
            updatedContent,
        });

        if (response.data.success) {
            message.success("Change successfully!");
            return response.data.updatedBlog;
        }
        else {
            message.error(response.data.error);
        }
    } catch (error) {
        console.error("Error editing blog:", error.message);
    }
};

export const handleDeleteBlog = async (blogId) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/blog/deleteBlog/${blogId}`);

        if (response.data.success) {
            message.success("Delete successfully!");
            return true;
        }
    } catch (error) {
        console.error("Error deleting blog:", error.message);
    }
};