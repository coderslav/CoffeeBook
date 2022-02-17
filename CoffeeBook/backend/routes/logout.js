const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    res.clearCookie('access_token').status(200).send('You was successfully logout');
});

module.exports = router;
