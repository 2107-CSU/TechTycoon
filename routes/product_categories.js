const express = require('express');
const product_categoriesRouter = express.Router();
const{getProductsbyCategoryId} = require('../db');

product_categoriesRouter.get('/:categoryId', async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try{
        const productsByCategory = await getProductsbyCategoryId(categoryId);
        res.send(productsByCategory);

    } catch(error) { 
        next(error);
    }
})

module.exports = product_categoriesRouter;