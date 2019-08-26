'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    checkIn: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    houseId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // name: DataTypes.STRING
  }, {});
  booking.associate = function(models) {
    // associations can be defined here
    booking.belongsTo(models.user),
    booking.belongsTo(models.house);
  };
  return booking;
};