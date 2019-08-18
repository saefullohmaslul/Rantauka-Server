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

exports.show = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ where: { id } });
    res.send({
      status: true,
      message: "success fetch user",
      data: user
    });
  } catch (err) {
    console.log(err);
  }
};

exports.store = async (req, res) => {
  const { fullName, telephone, email, password } = req.body;

  try {
    const user = await User.build({
      full_name: fullName,
      telephone: telephone,
      email: email,
      password: password
    });
    const response = await user.save();
    res.send({
      status: true,
      message: "success store user in db",
      data: response
    });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { fullName, telephone, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    user.full_name = fullName;
    user.telephone = telephone;
    user.email = email;
    user.password = password;
    user.save();

    res.send({
      status: true,
      message: "success update user in db",
      data: user
    });
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ where: { id } });
    await user.destroy();

    res.send({
      status: true,
      message: "success delete user in db"
    });
  } catch (err) {
    console.log(err);
  }
};
