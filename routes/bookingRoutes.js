const express = require("express");
require("express-group-routes");

const app = express();

const BookingCountroller = require("../controllers/booking");
const isAuth = require("../middlewares/is-auth");

app.group("/api/v1", routes => {
  // booking page
  routes.get("/booking/:houseId", isAuth, BookingCountroller.getBooking);

  routes.post("/booking", isAuth, BookingCountroller.store);
  // booking list
  routes.get("/bookings", isAuth, BookingCountroller.index);
});

module.exports = app;
