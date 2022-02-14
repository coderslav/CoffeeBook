require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
    // Authenticate user
    try {
        const { email, password } = req.body;
        //Find user by email only
        let user = await User.findOne({ where: { email }, raw: true });
        if (user) {
            // Check if user authenticated
            if (await bcrypt.compare(password, user.password)) {
                const accessToken = jwt.sign({ id: user.id, firstName: user.firstName, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ id: user.id, firstName: user.firstName, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET);
                res.status(200).send({ accessToken, refreshToken });
            } else {
                res.status(401).send('Not allowed');
            }
        } else {
            res.status(404).send('Cannot find user');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
