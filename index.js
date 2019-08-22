const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
require("express-group-routes");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const PORT = process.env.PORT || 5000;

const isAuth = require("./middlewares/is-auth");

const AuthControllers = require("./controllers/auth");
const HouseControllers = require("./controllers/house");
const ErrorController = require("./controllers/error");

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).array("image")
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

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

app.use(ErrorController);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`server running in port ${PORT}`);
});
