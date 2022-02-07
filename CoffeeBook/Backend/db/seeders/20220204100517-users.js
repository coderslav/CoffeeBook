'use strict';
const casual = require('casual');
const users = [...Array(100)].map((user) => (
  {
    email: casual.email,
    password: casual.password,
    firstName: casual.first_name,
    lastName: casual.last_name,
    profilePicturePath: 'https://picsum.photos/300/300',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
