const express = require('express');
const ordersRouter = express.Router();
const{getOrderByOrderId, createOrder, editOrderProductStatus} = require('../db');

ordersRouter.get('/:orderId', async (req, res, next) => {
    const orderId = req.params.orderId;
    try{
        const order = await getOrderByOrderId(orderId);
        res.send(order);

    } catch(error){
        next(error);
    }
})

ordersRouter.post('/', /*requireUser*/ async (req, res, next) => {
    try {
        const order = await createOrder(req.user.id);

        res.send({
            message: 'new order successfully created!',
            order});
    } catch (error) {
        next(error)
    }
})

ordersRouter.patch('/:orderId', /*requireUser*/ async (req, res, next) => {
    try {
        const editedOrder = await editOrderProductStatus(req.params.orderId, req.body.status);

        res.send({
            message: 'successfully updated the status of the order',
            order: editedOrder});
    } catch (error) {
        next(error)
    }
})
module.exports = ordersRouter;