const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog");


router.get("/", blogController.getAllBlogs);
router.get("/blog", blogController.getAllBlogs);
// Edit a blog
router.put("/editBlog/:blogId", blogController.editBlogControl);

// Delete a blog
router.delete("/deleteBlog/:blogId", blogController.deleteBlogControl);

// Create a blog
router.post("/createBlog", blogController.createBlogControl);

module.exports = router;
