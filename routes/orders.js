const express = require('express');
const ordersRouter = express.Router();
const{getOrderByOrderId} = require('../db');

ordersRouter.get('/:orderId', async (req, res, next) => {
    const orderId = req.params.orderId;
    try{
        const order = await getOrderByOrderId(orderId);
        res.send(order);

    } catch(error){
        next(error);
    }
})

module.exports = ordersRouter;