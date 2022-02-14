const express = require('express');
const router = express.Router();
const { Category, User } = require('../models/index');

// Get all categories ordered by ascending name order
router.post('/', async (req, res) => {
    if (req.user) {
        const categories = await Category.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
            raw: true,
        });
        res.status(200).send(categories);
    } else {
        res.status(401).send('Please login first');
    }
});

// Create a new category by an Admin
router.post('/new', async (req, res) => {
    if (req.user.isAdmin) {
        const { categoryName } = req.body;

        const [newCategory, created] = await Category.findOrCreate({ where: { name: categoryName }, raw: true });

        if (!created) {
            console.log(`Not Created. The category "${newCategory.name}" is already exists.`);
        }
        res.send(
            await Category.findAll({
                attributes: ['id', 'name'],
                order: [['name', 'ASC']],
                raw: true,
            })
        );
    } else {
        res.status(401).send('Not allowed users. Login like Admin, please');
    }
});

module.exports = router;
