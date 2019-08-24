const express = require("express");
require("express-group-routes");

const app = express();

const HouseControllers = require("../controllers/house");
const isAuth = require("../middlewares/is-auth");

app.group("/api/v1/", router => {
  // house endpoint
  router.get("/houses", HouseControllers.index);
  router.get("/house/:id", HouseControllers.show);
  router.post("/house", isAuth, HouseControllers.store);
  // router.post("/house/:id", isAuth, HouseControllers.update);
});

module.exports = app;
