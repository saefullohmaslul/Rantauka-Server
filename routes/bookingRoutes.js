const express =  require("express");
require("express-group-routes");

const app = express();

const BookingCountroller = require("../controllers/booking");
const isAuth = require("../middlewares/is-auth");

app.group(".api/v1", routes =>{

    routes.get("/bookings", BookingCountroller.index);
    routes.get("/booking/:id", BookingCountroller.show);
    routes.post("/booking", isAuth, BookingCountroller.store);
});

module.exports = app;