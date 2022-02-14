const express = require('express');
const router = express.Router();
const { Category } = require('../models/index');
const requireAuthenticate = require('../middlewares/requireAuthenticate');
const requireAdmin = require('../middlewares/requireAdmin');

// Get all categories ordered by ascending name order
router.post('/', requireAuthenticate, async (req, res) => {
    const categories = await Category.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
        raw: true,
    });
    res.status(200).send(categories);
});

// Create a new category by an Admin
router.post('/new', requireAdmin, async (req, res) => {
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
});

module.exports = router;
