const { body } = require("express-validator");

const User = require("../models").user;

exports.login = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        where: { email: value.toLowerCase() }
      });
      if (!user) {
        return Promise.reject("User with this email not be found");
      }
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter password")
];

exports.signup = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        where: { email: value.toLowerCase() }
      });
      if (user) {
        return Promise.reject("Email address alredy exist!");
      }
    }),
  body("fullName")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty"),
  body("telephone")
    .isMobilePhone()
    .withMessage("Please enter a valid phone number"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long")
    .matches(/\d/)
    .withMessage("must contain a number")
];
