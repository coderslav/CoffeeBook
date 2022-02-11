const express = require('express');
const router = express.Router();
const { User, UserCategory } = require("../models/index");

// Get all favorite categories of a user by descending addition date
router.get("/:userId/categories", async (req, res) => {
    const user = await User.findAll({ 
        where: {
            id : req.params.userId
        },
        order: [
            ["createdAt", "DESC"]
        ], 
        include: "userCategory", 
        raw: true, 
        nest: true 
    });
    const userCategories = user.map(u => { 
        return { id: u.userCategory.id, categoryName: u.userCategory.name }
    } );
    res.status(200).send(userCategories);
});


// Add a favorite category to a user
router.post("/:userId/category", async (req, res) => {
    const { categoryId } = req.body;
    try {
        const favorite = await UserCategory.create({
            userId: req.params.userId,
            categoryId: categoryId
        })
        if (favorite) {
            res.status(307).redirect(`/user/${req.params.userId}/categories`);
        }
    } catch (err) {
        console.log(`Error while saving favorite category ${categoryId} to user ${req.params.userId}`)
        res.status(200).send("Error while saving favorite category for user")
    }
});


// Remove a favorite category from a user
router.delete("/:userId/category/:categoryId", async (req, res) => {
    try {
        const deleted = await UserCategory.destroy({
            where : {
                userId: req.params.userId,
                categoryId: req.params.categoryId
            }
        })
        if (deleted) {
            const user = await User.findAll({ 
                where: {
                    id : req.params.userId
                },
                order: [
                    ["createdAt", "DESC"]
                ], 
                include: "userCategory", 
                raw: true, 
                nest: true 
            });
            const userCategories = user.map(u => { 
                return { id: u.userCategory.id, categoryName: u.userCategory.name }
            } );
            res.status(200).send(userCategories);
        }
    } catch (err) {
        console.log(`Error while removing favorite category ${req.params.categoryId} from user ${req.params.userId}`)
        res.status(200).send("Error while removing favorite category from user");
    }
});



module.exports = router;