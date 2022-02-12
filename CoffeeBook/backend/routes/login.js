const express = require('express');
const router = express.Router();

const users = [{ test: 'lol' }];

router.post('/', async (req, res) => {
    res.send(users);
});

module.exports = router;
