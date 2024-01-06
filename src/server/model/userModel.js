const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: {
    type: Number,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
    default: "other",
  },

  is_admin: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  age: {
    type: Number,
    required: false,
    default: 0,
  },

  user_recipes: {
    type: [Number],
    default: [],
  },

  favourites: {
    type: [Number],
    default: [],
  },

  followers: {
    type: [Number],
    default: [],
  },

  profile_image: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/358/473/png-clipart-computer-icons-user-profile-person-child-heroes.png",
  },

  last_login: {
    type: Date,
    default: Date.now,
  },

  // google_id: {
  //   type: String,
  //   default: null,
  // },

  // facebook_id: {
  //   type: String,
  //   default: null,
  // },

  account: {
    type: Schema.Types.ObjectId,
    ref: "accounts",
    required: false,
  },
  phone: { type: String },
});

module.exports = mongoose.model("users", schema);
