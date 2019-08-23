const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");

const multer = require("./middlewares/multer");
const routes = require("./routes");
const ErrorController = require("./controllers/error");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(multer);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(routes);
app.use(ErrorController);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`server running in port ${PORT}`);
});
