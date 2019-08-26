'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    

      return queryInterface.bulkInsert('users', [{
        full_name: 'John Doe',
        password: 'xxx',
        email: 'mr@gmail.com',
        telephone: 0839302
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
