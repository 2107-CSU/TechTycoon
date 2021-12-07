const express = require('express');
const { send } = require('process');
const ordersRouter = express.Router();
const{getOrderByOrderId, createOrder} = require('../db');

ordersRouter.get('/:orderId', async (req, res, next) => {
    const orderId = req.params.orderId;
    try{
        const order = await getOrderByOrderId(orderId);
        res.send(order);

    } catch(error){
        next(error);
    }
})

ordersRouter.post('/order', /*requireUser*/ async (req, res, next) => {
    try {
        const order = await createOrder(req.user.id);

        res.send({
            message: 'new order successfully created!',
            order});
    } catch (error) {
        send(error)
    }
})

module.exports = ordersRouter;