'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', 
    [
      {
        id: 1,
        name: 'mary',
        // email: 'mary@email.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04'
      },
      {
        id: 2,
        name: 'john',
        // email: 'johny@email.com',
        password: '3c28d2b0881bf46457a853e0b07531c6'
      }
    ], { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {})
  }
};
