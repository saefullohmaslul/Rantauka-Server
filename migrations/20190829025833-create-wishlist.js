'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wishlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: "users",
          key: "id"
        },
        onUpdate: "cascade" ,
        onDelete: "cascade"
     },
     houseId:{
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: "houses",
         key: "id"
       },
       onUpdate: "cascade",
       onDelete: "cascade"
     },
     createdAt: {
      allowNull: false,
      type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wishlists');
  }
};