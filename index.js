const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
require("express-group-routes");

const app = express();

const PORT = process.env.PORT || 5000;

const AuthControllers = require("./controllers/auth");
const HouseControllers = require("./controllers/house");
const ErrorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.group("/api/v1/", router => {
  // auth endpoint
  router.post("/login", AuthControllers.login);
  router.post("/signup", AuthControllers.signup);

  // house endpoint
  router.get("/houses", HouseControllers.index);
  router.get("/house/:id", HouseControllers.show);
  router.post("/house", HouseControllers.store);
  router.post("/house/:id", HouseControllers.update);
});

app.use(ErrorController);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`server running in port ${PORT}`);
});
