const House = require("../models").house;
const User = require("../models").user;
const Image = require("../models").image;
const Facilities = require("../models").facilities;

exports.index = async (req, res, next) => {
  try {
    const houses = await House.findAll({
      attributes: [
        "id",
        "house_name",
        "kecamatan",
        "house_price",
        "booking_status",
        "house_type"
      ],
      include: [
        {
          model: Image,
          attributes: ["uri"]
        }
      ]
    });

    if (!houses) {
      const error = new Error("House not found");
      error.statusCode = 401;
      throw error;
    }

    res.send(houses);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.store = async (req, res) => {
  const {
    house_name,
    provinsi,
    kabupaten,
    kecamatan,
    latitude,
    longitude,
    house_type,
    house_length,
    house_width,
    house_description,
    house_price,
    bookingStatus,
    facilities
  } = req.body;

  try {
    const images = req.files;

    const house = await House.create({
      house_name,
      provinsi,
      kabupaten,
      kecamatan,
      latitude,
      longitude,
      house_type,
      house_length,
      house_width,
      house_description,
      house_price,
      booking_status: true,
      userId: req.userId
    });

    const houseId = house.id;

    if (facilities) {
      let facilitiesJSON = [];
      facilities.map(val => {
        facilitiesJSON.push(JSON.parse(val));
      });
      const facilitiesTrue = facilitiesJSON.filter(val => {
        return val.status == true;
      });

      facilitiesTrue.map(fasilitas => {
        Facilities.create({
          name: fasilitas.nama,
          status: fasilitas.status,
          code: fasilitas.code,
          houseId
        });
      });
    }

    if (images) {
      images.map(image => {
        console.log(image);
        Image.create({
          uri: `img/${image.filename}`,
          houseId
        });
      });
    }

    res.send({
      status: true,
      message: "success store house",
      data: house
    });
  } catch (err) {
    console.log(err);
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  try {
    const house = await House.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["email", "id", "full_name", "telephone"]
        },
        {
          model: Image,
          attributes: ["uri"]
        },
        {
          model: Facilities,
          attributes: ["name", "status", "code"]
        }
      ]
    });

    if (!house) {
      const error = new Error("House not found");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).send(house);
  } catch (err) {
    console.log(err);
  }
};
