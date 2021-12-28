const express = require('express');
const productCategoriesRouter = express.Router();
const{getProductsbyCategoryName} = require('../db');

productCategoriesRouter.get('/:categoryId', async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try{
        const productsByCategory = await getProductsbyCategoryName(categoryId);
        res.send(productsByCategory);

    } catch(error) { 
        next(error);
    }
})

module.exports = productCategoriesRouter;