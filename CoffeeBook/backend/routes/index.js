const express = require('express');
const router = express.Router();
const { Post, Category, User } = require('../models');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

router.post('/', requireAuthenticate, (req, res) => {
    res.send(`Welcome to CoffeeBook ! \n`);
});

// Get all posts by order of creation with offset=request and limit=10
router.post('/latestposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['userId'] },
                include: [
                    { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                    { model: User, as: 'postUserComment', through: { attributes: { exclude: ['postId', 'userId'] } }, attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                ],
                offset: req.body.offset ? req.body.offset : 0,
                limit: 10,
            })
        )
    );
    res.send(posts);
});

//Get all posts by order of average note with offset=request and limit=10
router.post('/bestposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Post.findAll({
                order: [['voteAvg', 'DESC']],
                attributes: { exclude: ['userId'] },
                include: [
                    { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                    { model: User, as: 'postUserComment', through: { attributes: { exclude: ['postId', 'userId'] } }, attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                ],
                offset: req.body.offset ? req.body.offset : 0,
                limit: 10,
            })
        )
    );
    res.send(posts);
});

router.post('/getuserposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await User.findOne({
                where : { id : req.body.userId },
                include: { 
                    model: Post, 
                    as: "userPost", 
                    order: [['createdAt', 'DESC']],
                    attributes: { exclude: ['userId'] },
                    include: [
                        { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                        { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                        { model: User, as: 'postUserComment', through: { attributes: { exclude: ['postId', 'userId'] } }, attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } }
                    ]                          
                }
            })
        )
    );
    res.send(posts);
});

router.post('/getcategoryposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Category.findOne({
                where: {
                    id: req.body.categoryId 
                },
                include: { 
                    model: Post, 
                    as: 'categoryPost', 
                    order: [['createdAt', 'DESC']],
                    attributes: { exclude: ['userId'] },
                    include: [
                        { model: Category, as: 'postCategory', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                        { model: User, as: 'postUser', attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } },
                        { model: User, as: 'postUserComment', through: { attributes: { exclude: ['postId', 'userId'] } }, attributes: { exclude: ['password', 'token', 'createdAt', 'updatedAt'] } }
                    ] 
                }
            })
        )
    ); 
    res.send(posts);
})

module.exports = router;
