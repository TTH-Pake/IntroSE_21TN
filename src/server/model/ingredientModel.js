const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Ingredient", schema);
