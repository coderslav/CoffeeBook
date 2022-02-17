const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

router.post('/', requireAuthenticate, (req, res) => {
    res.send(`Welcome to CoffeeBook ! \n`);
    console.log(req.session.user);
});

// Get all posts by order of creation with offset=request and limit=10
router.post('/latestposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Post.findAll({
                order: [['createdAt', 'DESC']],
                include: ['postCategory', 'postUser'],
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
                include: ['postCategory', 'postUser'],
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
            await Post.findAll({
                where: { userId: req.body.userId },
                order: [['createdAt', 'DESC']],
                include: ['postCategory', 'postUser'],
            })
        )
    );
    res.send(posts);
});

module.exports = router;
