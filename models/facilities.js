"use strict";
module.exports = (sequelize, DataTypes) => {
  const facilities = sequelize.define(
    "facilities",
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      houseId: DataTypes.INTEGER
    },
    {}
  );
  facilities.associate = function(models) {
    // associations can be defined here
    facilities.belongsTo(models.house);
  };
  return facilities;
};
