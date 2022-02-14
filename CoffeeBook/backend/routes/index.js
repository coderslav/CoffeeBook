const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const JWTtokenCheck = require('./middlewares/JWTtokenCheck');

router.get('/', JWTtokenCheck, (req, res) => {
    req.user ? res.send(`Welcome to CoffeeBook ! \n`) : res.send('Login please before enter');
    console.log(req.user);
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
