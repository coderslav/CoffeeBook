const express = require('express');
const router = express.Router();
const { PostComment } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

// Set the comment to be created or updated
function setNewComment(req) {
    const { postId, userId, favorite, vote, hasAbuse, comment } = req.body;
    const newComment = {
        comment: null,
        postId,
        userId
    }
    if (favorite !== undefined) {
        newComment.favorite = favorite;
    }

    if (vote) {
        newComment.vote = vote;
    }

    if (comment) {
        newComment.comment = comment
    }

    if (hasAbuse !== undefined) {
        newComment.hasAbuse = hasAbuse;
    }

    return newComment;
}

// Create a favorite or a vote comment on a post
router.post("/create", requireAuthenticate, async (req, res) => {
    const newComment = setNewComment(req);

    const savedComment = await PostComment.create(newComment, { raw: true });
    console.log(`New comment for ${postId} by user ${userId}`, savedComment)

    res.send(savedComment);
});

// Update a comment
router.post("/update", requireAuthenticate, async (req, res) => {
    const { commentId } = req.body;
    const updatedComment = setNewComment(req);

    const currentComment = await PostComment.findOne({ where: { id: commentId }});
    console.log(`Comment before update : `, currentComment);
    await currentComment.update(updatedComment);
    await currentComment.save();
    console.log(`Updated comment for ${postId} by user ${userId}`, currentComment)
    res.send(currentComment);
})

module.exports = router;