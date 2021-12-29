const express = require('express');
const productReviewsRouter = express.Router();
const{getReviewsByProductId, createReview} = require('../db');

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

productReviewsRouter.post('/:productId', async(req, res, next) => {
    const productId = req.params.productId;
    const {comments, userId, wouldRecommend} = req.body;

    try {
        const newReview = await addProduct({comments, productId, userId, wouldRecommend})
        
        res.send({
            "message": "success",
            "product": newReview
        });
    } catch (error) {
        next(error)
    }
})

module.exports = productReviewsRouter;