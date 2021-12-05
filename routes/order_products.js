const express = require('express');
const order_productsRouter = express.Router();
const{destroyProductFromOrder} = require('../db');

order_productsRouter.delete('/:orderproductId', async (req, res, next) => {    // req.user just seees if you are logged in
    const orderProductId = req.params.orderProductId; // get the order product id
    try {
        //verify the logged in user is the owner of the routine
        const orderProductToDelete = await destroyProductFromOrder(orderProductId);   // grab the routine thaat we will delete
        res.send(orderProductToDelete);
    }
    catch (error) {
        next(error);
    }
})

module.exports = order_productsRouter;