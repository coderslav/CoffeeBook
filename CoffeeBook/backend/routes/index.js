const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', (req, res) => {
    res.send(`Welcome to CoffeeBook ! \n`);
});

router.get('/latestposts', async (req, res) => {
    const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        raw: true,
    });
    res.send(posts);
});

router.post('/getuserposts', async (req, res) => {
    const posts = await Post.findAll({
        where: { userId: req.body.userId },
        order: [['createdAt', 'DESC']],
        raw: true,
    });
    res.send(posts);
});

module.exports = router;
