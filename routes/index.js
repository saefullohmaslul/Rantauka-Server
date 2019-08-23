const express = require("express");
require("express-group-routes");

const app = express();

const AuthControllers = require("../controllers/auth");
const HouseControllers = require("../controllers/house");

const isAuth = require("../middlewares/is-auth");

app.group("/api/v1/", router => {
  // auth endpoint
  router.post("/login", AuthControllers.login);
  router.post("/signup", AuthControllers.signup);

  // house endpoint
  router.get("/houses", HouseControllers.index);
  router.get("/house/:id", HouseControllers.show);
  router.post("/house", isAuth, HouseControllers.store);
  // router.post("/house/:id", isAuth, HouseControllers.update);
});

module.exports = app;
