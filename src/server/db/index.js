const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kppyxho.mongodb.net/NMCNPM?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;
