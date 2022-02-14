const express = require('express');
const router = express.Router();

const users = [{ test: 'lol' }];

router.get('/', async (req, res) => {
    res.send(users);
});

module.exports = router;
