"use strict";
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define(
    "image",
    {
      uri: DataTypes.STRING,
      houseId: DataTypes.INTEGER
    },
    {}
  );
  image.associate = function(models) {
    // associations can be defined here
    image.belongsTo(models.house);
  };
  return image;
};
