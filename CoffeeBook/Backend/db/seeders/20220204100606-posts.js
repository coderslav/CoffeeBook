"use strict";
const casual = require("casual");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let posts = [];
for (let i = 0; i < 100; i++) {
    let randomAmountOfPosts = getRandomInt(10) + 1;
    for (let j = 0; j < randomAmountOfPosts; j++) {
        posts.push({
            title: casual.title,
            mediaLink: "https://picsum.photos/300/300",
            content: casual.text,
            author: i+1,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Posts", posts, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Posts", null, {});
    },
};
