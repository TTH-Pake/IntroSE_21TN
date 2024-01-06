const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  content: String,
  created_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blogs", blogSchema);
