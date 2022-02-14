const express = require('express');
const router = express.Router();
const { User, UserCategory } = require('../models/index');

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
    if (req.user) {
        getFavoriteCategoriesOfUser(req, res);
    } else {
        res.status(401).send('Please login first');
    }
});

// Add a favorite category to a user
router.post('/:userId/category', async (req, res) => {
    if (req.user) {
        console.log(req.body);
        const { categoryId } = req.body;
        try {
            const [newFavoriteCat, created] = await UserCategory.findOrCreate({
                where: {
                    userId: req.params.userId,
                    categoryId: categoryId,
                },
            });
            console.log(newFavoriteCat);
            getFavoriteCategoriesOfUser(req, res);
        } catch (err) {
            console.log(`Error while saving favorite category ${categoryId} to user ${req.params.userId}`);
            res.status(200).send('Error while saving favorite category for user');
        }
    } else {
        res.status(401).send('Please login first');
    }
});

// Remove a favorite category from a user
router.delete('/:userId/category/:categoryId', async (req, res) => {
    if (req.user) {
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
    } else {
        res.status(401).send('Please login first');
    }
});

module.exports = router;
