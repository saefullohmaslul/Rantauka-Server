const House = require("../models").house;

exports.index = async (req, res) => {
  try {
    const houses = await House.findAll();
    if (!houses) {
      res.send({
        status: true,
        message: "houses not found",
        data: null
      });
    }

    res.send({
      status: true,
      message: "success fetch houses",
      data: houses
    });
  } catch (err) {
    console.log(err);
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const house = await House.findOne({ where: { id } });
    if (!house) {
      res.send({
        status: true,
        message: "house not found",
        data: null
      });
    }

    res.send({
      status: true,
      message: "success fetch house",
      data: house
    });
  } catch (err) {
    console.log(err);
  }
};

exports.store = async (req, res) => {
  try {
    const house = await House.build(req.body);
    const response = await house.save();

    res.send({
      status: true,
      message: "success store house",
      data: response
    });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const house = await House.update(req.body, { where: { id } });
    if (house) {
      const response = await House.findOne({ where: { id } });
      res.send({
        status: true,
        message: "success update house",
        data: response
      });
    }

    res.send({
      status: true,
      message: "cannot update house"
    });
  } catch (err) {
    console.log(err);
  }
};
