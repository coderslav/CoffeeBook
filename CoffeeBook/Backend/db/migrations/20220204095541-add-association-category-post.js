"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("CategoryPosts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Categories",
                },
            },
            postId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Posts",
                },
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("CategoryPosts");
    },
};
