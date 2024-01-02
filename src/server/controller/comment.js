require("dotenv").config();
const express = require("express");


const Comment = require("../model/commentModel");

const createCommentControl = async (req, res) => {
  const commentData = req.body;
  try {
    const newComment = new Comment(commentData);
    const savedComment = await newComment.save();
    res.status(201).json({ success: true, message: "Comment added successfully", comment: savedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
const editCommentControl = async (req, res) => {
  const id = req.body.id
  const content = req.body.content
  try {
    // Fetch all ingredients
    const updatedComment = await Comment.findOneAndUpdate(
      { id: id },
      { content: content },
      { new: true },
    )
    res.json({ success: true, updatedComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
const deleteCommentControl = async (req, res) => {
  try {
    // Fetch all ingredients
    const deletedComment = await Comment.findOneAndDelete({ id: req.body.id });
    if (!deletedComment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
module.exports = {
  createCommentControl,
  editCommentControl,
  deleteCommentControl,
};
