'use strict';
const casual = require('casual');
const cats = [...Array(100)].map((category) => ({
    name: casual.title,
    createdAt: new Date(),
    updatedAt: new Date(),
}));

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('categories', cats, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('categories', null, {});
    },
};
