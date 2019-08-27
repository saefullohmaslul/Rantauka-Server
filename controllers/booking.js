const House = require("../models").house;
const User = require("../models").user;
const Booking = require("../models").booking;
const Image = require("../models").image;

exports.getBooking = async (req, res) => {
  const id = req.params.houseId;

  const house = await House.findOne({
    where: { id },
    include: [
      {
        model: Image,
        attributes: ["uri"]
      }
    ]
  });
  const userBooking = await User.findOne({
    where: { id: req.userId },
    attributes: ["full_name", "telephone"]
  });
  res.status(200).json({ house, userBooking });
};

exports.store = async (req, res) => {
  const { checkIn, duration, houseId } = req.body;

  try {
    const booking = await Booking.create({
      checkIn,
      duration,
      userId: req.userId,
      houseId,
      status: 0
    });
    res.send({
      booking
    });
  } catch (err) {
    console.log(err);
  }
};

exports.index = async (req, res) => {
  try {
    const booking = await Booking.findAll({
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
    res.status(200).send(booking);
  } catch (err) {
    console.log(err);
  }
};
