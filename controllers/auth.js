const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models").user;

exports.signup = async (req, res, next) => {
  const { password, fullName, confirmPassword, email, telephone } = req.body;

  try {
    if (confirmPassword !== password) {
      const error = new Error("Please fill the same password");
      error.statusCode = 401;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      telephone,
      password: hashedPassword,
      full_name: fullName
    });

    res.send({
      status: true,
      message: "success register user",
      data: {
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("User with this email not be found");
      error.statusCode = 401;
      throw error;
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      "Ast3p0L3nT4y!0r@ncYpT7fV8qPr0c$",
      { expiresIn: "24h" }
    );

    res.send({
      token,
      userId: user.id
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
