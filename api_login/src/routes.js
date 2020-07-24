const express = require("express");
const routes = express.Router();

const AuthController = require("./controller/AuthControler");
const CepController = require("./controller/CepController");
const UserController = require("./controller/UserController");

routes.get("/", (req, res) => {
  res.redirect("/login");
});
routes.post("/login", UserController.login);
routes.post("/auth", AuthController.verifyToken);
routes.post("/search-cep", CepController.search);
routes.post("/create-customer", UserController.create);
routes.post("/create-enterprise", UserController.create);

module.exports = routes;
