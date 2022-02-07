'use strict';
const casual = require('casual');
const cat = [...Array(100)].map((user) => (
  {
    name: casual.title,
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', cat, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
