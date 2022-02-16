const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

router.post('/', requireAuthenticate, (req, res) => {
    res.send(`Welcome to CoffeeBook ! \n`);
    console.log(req.session.user);
});

router.post('/latestposts', requireAuthenticate, async (req, res) => {
    const posts = JSON.parse(
        JSON.stringify(
            await Post.findAll({
                order: [['createdAt', 'DESC']],
                include: 'postCategory',
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
                include: 'postCategory',
            })
        )
    );
    res.send(posts);
});

module.exports = router;
