const express = require("express");
require("express-group-routes");

const app = express();

const AuthControllers = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

app.group("/api/v1/", router => {
  router.post("/login", authMiddleware.login, AuthControllers.login);
  router.post("/signup", authMiddleware.signup, AuthControllers.signup);
});

module.exports = app;
