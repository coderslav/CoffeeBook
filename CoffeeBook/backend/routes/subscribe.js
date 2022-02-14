const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const { email, password, firstName, lastName } = req.body;
        let [user, created] = await User.findOrCreate({ where: { email }, defaults: { password, firstName, lastName }, raw: true });
        created ? res.status(201).send('User was successfully created') : res.status(409).send('User is already exist');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
