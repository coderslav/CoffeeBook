"use strict";

const casual = require("casual");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async up(queryInterface, Sequelize) {
        let commenters = [];
        const posts = await queryInterface.sequelize.query(
            'SELECT * FROM "Posts";',
            {
                type: queryInterface.sequelize.QueryTypes.SELECT,
            }
        );
        for (let i = 0; i < posts.length; i++) {
            let commentAmount = getRandomInt(10) + 1;
            for (let j = 0; j < commentAmount; j++) {
                let randomcommenter = getRandomInt(100) + 1;
                while (posts[0].author === randomcommenter) {
                    randomcommenter = getRandomInt(100) + 1;
                }
                commenters.push({
                    comment: casual.text,
                    postId: i + 1,
                    author: randomcommenter,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        }
        return queryInterface.bulkInsert("Comments", commenters, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Comments", null, {});
    },
};
