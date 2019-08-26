const House = require('../models').house;
const User = require('../models').user;
const Booking = require('../models')


exports.index = async (req, res) => {
    Booking.findAll({
            attributes:[
                "id",
                "house_name",
                "checkIn",
                "checkOut",
                "status"
            ],
            include: [
                {
                    model: User,
                    attributes:[
                        "id",
                        "full_name",
                        "telephone"
                    ]
                }
            ],
            include: [
                {
                    model: House,
                    attributes: [
                        "id",
                        "house_name",
                        "house_price"
                    ]
                }
            ]
        }).then(booking=>res.send(booking))        
}

exports.store = async (req, res) => {
    const { checkIn, duration, houseId } = req.body;

    try {
        const booking = await Booking.create({
            checkIn,
            duration,
            userId: req.userId,
            houseId

        });
        res.send({
            booking
        })
    }
    catch (err){
        console.log(err);
    }
}

exports.show = async (req, res) => {
    const id = req.params.id;
    try {
        const booking = await Booking.findOne({
            where: { id }
        });
        res.send({
            status: true,
            message: "OK",
            data: booking
        });
    } catch (err){
        console.log(err);
    }
};