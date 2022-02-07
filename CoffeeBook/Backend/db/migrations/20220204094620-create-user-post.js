"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserPosts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                },
            },
            postId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Posts",
                },
            },
            vote: {
                type: Sequelize.INTEGER
            },
            favorited: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserPosts");
    },
};
