'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'Friends',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          }
        },
        friendId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          }
        },
      }
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Friends');
  }
};
