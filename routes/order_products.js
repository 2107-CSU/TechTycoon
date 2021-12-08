const express = require('express');
const order_productsRouter = express.Router();
const{destroyProductFromOrder, addProductToOrder, updateOrderProductQuantity, getAllProductsByOrderId} = require('../db');
const {requireUser} = require('./utils');

order_productsRouter.delete('/:orderproductid', async (req, res, next) => {    // req.user just seees if you are logged in
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

//this following function might need a logged in user?
order_productsRouter.patch('/:orderproductid', requireUser, async (req, res, next) => { // url variable is inside of params in req
    const id = req.params.orderProductId;    // this will be a value (not an object)
    try {
        const orderProductQuantity = await updateOrderProductQuantity({id, quantity});
        res.send(orderProductQuantity);   // create or update a existing activity in db and populate
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

order_productsRouter.get('/:orderId', requireUser, async (req, res, next) => {
    const orderId = req.params.orderId;
    try{
        const products = await getAllProductsByOrderId(orderId);
        res.send(products);


    } catch(error) {
        next(error);
    }
})


order_productsRouter.post('/', async (req, res, next) => {
    const {orderId, productId, quantity = 1} = req.body;
    try{
        const order_product = await addProductToOrder(orderId, productId, quantity);
        res.send(order_product);


    } catch(error) {
        next(error);
    }
})

order_productsRouter.patch('/:orderproductid', requireUser, async (req, res, next) => { // url variable is inside of params in req
    const id = req.params.orderProductId; 
    const status = req.body;       // is this where status comes from?   
    try {
        const orderStatus = await updateOrderStatus({id, status});
        res.send(orderStatus);   
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})


module.exports = order_productsRouter;