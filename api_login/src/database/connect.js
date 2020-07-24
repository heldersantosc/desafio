require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const uri = process.env.MONGO_DB_HOST;

mongoose.connect(uri, {
  dbName: process.env.MONGO_DATABASE,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = mongoose;
