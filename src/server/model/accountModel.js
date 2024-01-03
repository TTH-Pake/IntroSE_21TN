const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: {
    type: Number,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: false,
    required: true,
  },

  password: {
    type: String,
    required: true,
    default: "123456",
  },
  is_verified: {
    type: Boolean,
    default: false,
  },

  google_id: {
    type: String,
    unique: true,
    default: null,
  },

  facebook_id: {
    type: String,
    unique: true,
    default: null,
  },

  created_time: Date,
});

module.exports = mongoose.model("accounts", schema);
