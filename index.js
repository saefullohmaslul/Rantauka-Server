const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");

const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const houseRoutes = require("./routes/houseRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const ErrorController = require("./controllers/error");

const app = express();
const PORT = process.env.PORT || 5000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "static", "img"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("image")
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  "/img",
  express.static(path.join(__dirname, "public", "static", "img"))
);

app.use(authRoutes);
app.use(houseRoutes);
app.use(bookingRoutes);
app.use(wishlistRoutes);
app.use(ErrorController);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`server running in port ${PORT}`);
});
