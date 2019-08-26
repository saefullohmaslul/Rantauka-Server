"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      full_name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.house),
    user.hasMany(models.booking);
  };
  return user;
};
