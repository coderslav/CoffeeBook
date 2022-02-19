const express = require('express');
const router = express.Router();
const { PostComment } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

// Get all comments on a post
router.post("/", requireAuthenticate, async (req, res) => {
    const { postId } = req.body;
    const comments = await PostComment.findAll({
        where : { 
           postId : postId
        },
        order: [
            ["createdAt", "DESC"]
        ]
    })
    // console.log("fetched comments : ", comments);
    res.send(comments);
});

module.exports = router;