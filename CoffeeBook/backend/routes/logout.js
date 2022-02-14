const express = require('express');
const router = express.Router();
// test

const users = [{ test: 'lol' }];

router.get('/', async (req, res) => {
    res.send(users);
});

module.exports = router;
