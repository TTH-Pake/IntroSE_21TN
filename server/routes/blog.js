const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog");


router.get("/", blogController.getAllBlogs);
router.get("/blog", blogController.getAllBlogs);
module.exports = router;
