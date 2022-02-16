const express = require('express');
const router = express.Router();
const { User, UserCategory } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');

async function getFavoriteCategoriesOfUser(req, res) {
    try {
        const userCats = JSON.parse(
            JSON.stringify(
                await User.findOne({
                    where: {
                        id: req.params.userId,
                    },
                    order: [['createdAt', 'DESC']],
                    include: 'userCategory',
                })
            )
        );
        let cats = userCats.userCategory.map((cat) => {
            return { id: cat.id, name: cat.name };
        });
        res.status(200).send(cats);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get all favorite categories of a user by descending addition date
router.post('/:userId/categories', async (req, res) => {
    if (req.session.user) {
        getFavoriteCategoriesOfUser(req, res);
    } else {
        res.status(401).send('Please login first');
    }
});

// Add a favorite category to a user
router.post('/:userId/category', requireAuthenticate, async (req, res) => {
    const { categoryId } = req.body;
    try {
        await UserCategory.findOrCreate({
            where: {
                userId: req.params.userId,
                categoryId: categoryId,
            },
        });
        getFavoriteCategoriesOfUser(req, res);
    } catch (err) {
        console.log(`Error while saving favorite category ${categoryId} to user ${req.params.userId}`);
        res.status(200).send('Error while saving favorite category for user');
    }
});

// Remove a favorite category from a user
router.delete('/:userId/category/:categoryId', requireAuthenticate, async (req, res) => {
    try {
        const deleted = await UserCategory.destroy({
            where: {
                userId: req.params.userId,
                categoryId: req.params.categoryId,
            },
        });
        if (deleted) {
            getFavoriteCategoriesOfUser(req, res);
        }
    } catch (err) {
        console.log(`Error while removing favorite category ${req.params.categoryId} from user ${req.params.userId}`);
        res.status(200).send('Error while removing favorite category from user');
    }
});

// Get users by filter
// router.post('/filter', requireAuthenticate, async (req, res)=>{
//     try {
//         let allUsers = await User.findAll()

//     } catch (error) {
        
//     }
// })

module.exports = router;
