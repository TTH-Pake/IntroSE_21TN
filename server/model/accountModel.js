const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({

    user_id: {
      type: Number,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true,
    },

    email:
    {
      type:String,
      unique:true,
      required:true,
    }
  
  
});


module.exports = mongoose.model('accounts',schema);
