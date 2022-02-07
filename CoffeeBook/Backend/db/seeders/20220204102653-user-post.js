"use strict";

const casual = require("casual");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async up(queryInterface, Sequelize) {
        const posts = await queryInterface.sequelize.query(
            'SELECT * FROM "Posts";',
            {
                type: queryInterface.sequelize.QueryTypes.SELECT,
            }
        );
        let userposts = [];
        for (let i = 0; i < posts.length; i++) {
            let userRandomProd = [];
            let amount = getRandomInt(10)+1;
            for (let j = 0; j < amount; j++) {
                let fav = false;
                let randompost = getRandomInt(100)+1;
                while (userRandomProd.includes(randompost)) {
                    randompost = getRandomInt(100) + 1;
                }
                if (getRandomInt(10) == 4) {
                    fav = true;
                }
                let vote = getRandomInt(3);
                if (vote ===2)
                {
                  vote = -1;
                }
                userposts.push({
                    userId: randompost,
                    postId: i + 1,
                    favorited: fav,
                    vote : vote,//+1, 0 or -1
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                userRandomProd.push(randompost);
            }
        }
        return queryInterface.bulkInsert("UserPosts", userposts, {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("UserPosts", null, {});
    },
};
