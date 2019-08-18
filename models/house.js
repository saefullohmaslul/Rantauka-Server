"use strict";
module.exports = (sequelize, DataTypes) => {
  const house = sequelize.define(
    "house",
    {
      house_name: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      kabupaten: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      house_type: DataTypes.STRING,
      house_length: DataTypes.DECIMAL,
      house_width: DataTypes.DECIMAL,
      house_description: DataTypes.TEXT,
      house_price: DataTypes.INTEGER,
      booking: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER
    },
    {}
  );
  house.associate = function(models) {
    // associations can be defined here
    house.hasMany(models.image), house.belongsTo(models.user);
  };
  return house;
};
