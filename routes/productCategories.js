const express = require('express');
const productCategoriesRouter = express.Router();
const{getProductsbyCategoryId} = require('../db');

productCategoriesRouter.get('/:categoryId', async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try{
        const productsByCategory = await getProductsbyCategoryId(categoryId);
        res.send(productsByCategory);

    } catch(error) { 
        next(error);
    }
})

module.exports = productCategoriesRouter;