const express = require('express');
const router = express.Router();
const requireAuthenticate = require('../middlewares/requireAuthenticate');

router.post('/', requireAuthenticate, async (req, res) => {
    res.clearCookie('access_token').status(200).send('You was successfully logout');
});

module.exports = router;
