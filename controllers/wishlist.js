const House = require("../models").house;
const Wishlist = require("../models").wishlist;
const Image = require("../models").image;

exports.index = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: House,
          include: [
            {
              model: Image
            }
          ]
        }
      ]
    });
    res.status(200).send(wishlist);
  } catch (err) {
    console.log(err);
  }
};

exports.store = async (req, res) => {
  const { houseId } = req.body;

  try {
    const wishlist = await Wishlist.create({
      userId: req.userId,
      houseId
    });
    res.send({
      wishlist
    });
  } catch (err) {
    console.log(err);
  }
};

exports.delete = (req, res) => {
  Wishlist.destroy({ where: { id: req.params.id } }).then(wishlist => {
    res.send({
      message: "success",
      wishlist
    });
  });
};
