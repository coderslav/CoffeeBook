const express = require('express');
const router = express.Router();
const { PostComment } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

// Set the comment to be created or updated
function setNewComment(req) {
    const { postId, userId, favorited, vote, hasAbuse, comment } = req.body;
    const newComment = {
        postId,
        userId
    }

    if (favorited !== undefined) {
        newComment.favorited = favorited;
    }

    if (vote) {
        newComment.vote = vote;
    }

    if (hasAbuse !== undefined) {
        newComment.hasAbuse = hasAbuse;
    }

    if (comment) {
        newComment.comment = comment
    }

    return newComment;
}

// Create a favorite or a vote comment on a post
router.post("/create", requireAuthenticate, async (req, res) => {
    const newComment = setNewComment(req);
    console.log("newComment data : ", newComment);

    const savedComment = await PostComment.create(newComment);
    console.log(`New comment for ${req.body.postId} by user ${req.body.userId}`, savedComment)
    await savedComment.save();

    res.send(savedComment);
});

// Update a comment
router.post("/update", requireAuthenticate, async (req, res) => {
    const { commentId } = req.body;
    console.log("comment id : ", commentId);
    const updatedComment = setNewComment(req);
    console.log("updatedComment data : ", updatedComment);

    const currentComment = await PostComment.findOne({ where: { id: commentId }});
    console.log(`Comment before update : `, currentComment);
    // await currentComment.update(updatedComment);
    // await currentComment.save();
    // console.log(`Comment after update for ${postId} by user ${userId}`, currentComment)
    // res.send(currentComment.dataValues);

    // res.send("checking update");
})

module.exports = router;