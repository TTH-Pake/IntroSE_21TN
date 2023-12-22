require("dotenv").config();
const express = require("express");

const Blogs = require("../model/blogModel");

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find({});

        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editBlogControl = async (req, res) => {
    const { blogId } = req.params;
    const { updatedContent } = req.body;

    try {

        const updatedBlog = await Blogs.findOneAndUpdate(
            { id: blogId },
            { $set: { content: updatedContent } },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, updatedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const deleteBlogControl = async (req, res) => {
    const { blogId } = req.params;
    try {
        const deletedBlog = await Blogs.deleteOne({ id: blogId });

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = {
    getAllBlogs,
    editBlogControl,
    deleteBlogControl,
};
