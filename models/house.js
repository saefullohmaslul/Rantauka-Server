"use strict";
module.exports = (sequelize, DataTypes) => {
  const house = sequelize.define(
    "house",
    {
      house_name: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      kabupaten: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      house_type: DataTypes.STRING,
      house_length: DataTypes.FLOAT,
      house_width: DataTypes.FLOAT,
      house_description: DataTypes.TEXT,
      house_price: DataTypes.INTEGER,
      booking_status: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER
    },
    {}
  );
  house.associate = function(models) {
    // associations can be defined here
    house.hasMany(models.image),
      house.belongsTo(models.user),
      house.hasMany(models.facilities);
  };
  return house;
};
