const express = require("express");
require("express-group-routes");

const app = express();

const HouseControllers = require("../controllers/house");
const isAuth = require("../middlewares/is-auth");

app.group("/api/v1/", router => {
  router.get("/houses", HouseControllers.index);
  router.get("/house/:id", HouseControllers.show);
  router.post("/house", isAuth, HouseControllers.store);
});

module.exports = app;
