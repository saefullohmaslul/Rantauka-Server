const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models").user;

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const { password, fullName, email, telephone } = req.body;

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array()[0].msg;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase(),
      telephone,
      password: hashedPassword,
      full_name: fullName
    });

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      "Ast3p0L3nT4y!0r@ncYpT7fV8qPr0c$",
      { expiresIn: "168h" }
    );

    res.status(201).send({
      token,
      user: {
        fullName: user.full_name,
        email: user.email,
        telephone: user.telephone
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array()[0].msg;
      throw error;
    }

    const user = await User.findOne({ where: { email } });
    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) {
      const error = new Error("Validation failed");
      error.data = "Wrong password";
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      "Ast3p0L3nT4y!0r@ncYpT7fV8qPr0c$",
      { expiresIn: "168h" }
    );

    res.send({
      token,
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.show = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["full_name", "telephone"]
    });

    if (!user) {
      const error = new Error("Get user failed");
      error.data = "User not found";
      error.statusCode = 404;
      throw error;
    }

    res.status(200).send(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getToken = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["email", "id"]
    });

    if (!user) {
      const error = new Error("Get user failed");
      error.data = "User not found";
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      "Ast3p0L3nT4y!0r@ncYpT7fV8qPr0c$",
      { expiresIn: "168h" }
    );

    res.send({
      token,
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
