const express = require('express');
const productReviewsRouter = express.Router();
const{getReviewsByProductId} = require('../db');

productReviewsRouter.get('/:productId', async (req, res, next) => {
    const productId = req.params.productId;
    console.log("the product id is ", productId);
    try{
        const reviews = await getReviewsByProductId(productId);
        res.send(reviews);

    } catch(error) { 
        next(error);
    }
})

module.exports = productReviewsRouter;