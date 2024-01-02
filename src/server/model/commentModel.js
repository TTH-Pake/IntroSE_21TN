const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  user_id: {
    type : Number,// Reference the users model
    required: true,
  },
  recipe_id: {
    type: Number,
    required: true,
  },
  content: String,
  created_time: {
    type: Date,
    default: Date.now,
  }
});

commentSchema.pre('save', async function (next) {
  if (!this.id) {
    const lastComment = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
    this.id = lastComment ? lastComment.id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("comments", commentSchema);
