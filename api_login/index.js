require("dotenv").config({ path: ".env" });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const Routes = require("./src/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(Routes);
app.disable("x-powered-by");

/** conexao com mongo */
const mongoose = require("mongoose");
const uri = process.env.MONGO_DB_HOST;
const database = process.env.MONGO_DATABASE;

mongoose.connect(uri, {
  dbName: database,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Database: ${database}`);
});
mongoose.connection.on("error", (error) => {
  console.log("Error: ", error);
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

/** ******* */

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, function () {
  console.log("API running on port:", port);
});
