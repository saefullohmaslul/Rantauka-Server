const express = require("express");
require("express-group-routes");

const app = express();

const WishlistCountroller = require("../controllers/Wishlist");
const isAuth = require("../middlewares/is-auth");

app.group("/api/v1", routes => {
 
  routes.post("/wishlist", isAuth, WishlistCountroller.store);
  routes.get("/wishlists", isAuth, WishlistCountroller.index);
  routes.delete("/wishlist/:id", isAuth, WishlistCountroller.delete);
});

module.exports = app;
