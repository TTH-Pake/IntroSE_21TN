const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  email: {
    type: String,
    ref: "accounts",
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  created_time: {
    type: Date,
    default: Date.now,
  },
  expired_time: {
    type: Date,
    // default: Date.now,
  },
});

module.exports = mongoose.model("tokens", tokenSchema);
