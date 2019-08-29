'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    houseId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
    wishlist.belongsTo(models.user),
    wishlist.belongsTo(models.house);
  };
  return wishlist;
};