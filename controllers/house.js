const House = require("../models").house;
const User = require("../models").user;
const Image = require("../models").image;
const Facilities = require("../models").facilities;

exports.index = async (req, res, next) => {
  try {
    const houses = await House.findAll({
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

    res.send({
      status: true,
      message: "success fetch houses",
      data: houses
    });
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
    booking,
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
      booking,
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
          houseId
        });
      });
    }

    if (images) {
      images.map(image => {
        Image.create({
          uri: image.path,
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
          attributes: ["name", "status"]
        }
      ]
    });
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
