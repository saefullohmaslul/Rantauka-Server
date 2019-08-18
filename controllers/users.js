const User = require("../models").user;

exports.index = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      res.send({
        status: true,
        message: "users not found",
        data: null
      });
    }
    res.send({
      status: true,
      message: "sucess fetch users",
      data: users
    });
  } catch (err) {
    console.log(err);
  }
};

exports.store = async (req, res) => {
  try {
    const user = User.create({});
  } catch (err) {}
};
