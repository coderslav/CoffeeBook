const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.post('/', (req, res) => {
    req.user ? res.send(`Welcome to CoffeeBook ! \n`) : res.send('Login please before enter');
    console.log(req.user);
});

router.post('/latestposts', async (req, res) => {
    if (req.user) {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        });
        res.send(posts);
    } else {
        res.status(401).send('Please login first');
    }
});

router.post('/getuserposts', async (req, res) => {
    console.log(req.cookies);
    if (req.user) {
        const posts = await Post.findAll({
            where: { userId: req.body.userId },
            order: [['createdAt', 'DESC']],
            raw: true,
        });
        res.send(posts);
    } else {
        res.status(401).send('Please login first');
    }
});

module.exports = router;
