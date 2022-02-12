const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const { User } = require('../models');

function getHashedPassword(password) {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.post('/', async (req, res) => {
    let userData = {
        email: 'somemail@mail.com',
        password: getHashedPassword('somePass'),
        firstName: 'Tester',
        lastName: 'Testerov',
    };

    let [user, created] = await User.findOrCreate({ where: { ...userData }, raw: true });
    console.log(user);
    created ? res.send('Ok') : res.send('User is already exist');
});

module.exports = router;
