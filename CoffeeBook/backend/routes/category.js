const express = require('express');
const router = express.Router();
const { Category, User } = require("../models/index");

// Get all categories orderded by ascending name order
router.get("/", async (req, res) => {
    const categories = await Category.findAll({
        attributes: ["id", "name"],
        order: [
            ["name", "ASC"]
        ],
        raw: true
    });
    res.status(200).send(categories);
});

// Create a new category by an Admin
// TODO : add middleware to check that user is an Admin
router.post("/new", async (req, res) => {
    const { categoryName } = req.body;
    const formatted =   categoryName.toLowerCase()[0].toUpperCase()
                      + categoryName.toLowerCase().slice(1);
    const checkNew = await Category.findOne({ 
        where: {
            name: formatted
        }, 
        raw: true
    });

    if (checkNew) {
        res.status(200).send("Not Created. The category already exists.")
    } else {
        Category.create({
            name: formatted
        })
        .then(cat => {
           return Category.findAll({ 
                attributes: ["id", "name"],
                order: [
                    ["name", "ASC"]
                ],
                raw: true 
        }); 
        })
        .then(cats => {
           res.status(200).send(cats); 
        })
        .catch(err => 
            console.log(`Error while creating the category ${formatted}:`, err)
        );
    }
})

module.exports = router;