const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
require("express-group-routes");

const app = express();

const PORT = process.env.PORT || 5000;

const UserControllers = require("./controllers/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.group("/api/v1/", router => {
  router.get("/users", UserControllers.index);
});

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`server running in port ${PORT}`);
});
