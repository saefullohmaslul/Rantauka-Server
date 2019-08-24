const express = require("express");
require("express-group-routes");
const { body } = require("express-validator");

const app = express();

const User = require("../models").user;
const AuthControllers = require("../controllers/auth");

app.group("/api/v1/", router => {
  router.post("/login", AuthControllers.login);
  router.post(
    "/signup",
    [
      body("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom(async (value, { req }) => {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            return Promise.reject("Email address alredy exist!");
          }
        })
    ],
    AuthControllers.signup
  );
});

module.exports = app;
