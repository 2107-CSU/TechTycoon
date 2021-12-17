const express = require('express');
const orderProductsRouter = express.Router();
const{destroyProductFromOrder, addProductToOrder, updateOrderProductQuantity, getAllProductsByOrderId} = require('../db');
const {requireUser} = require('./utils');

orderProductsRouter.post('/', async (req, res, next) => {
    const {products, orderId} = req.body;
    console.log("products: ", products);
    try{
        const order_products = await Promise.all(products.map(product => {
            console.log(product);
            const { productId, quantity } = product;
            console.log(productId, quantity, orderId);
            return addProductToOrder({orderId, productId, quantity});
        }));
        //const order_product = await addProductToOrder(orderId, productId, quantity);
        res.send(order_products);


    } catch(error) {
        next(error);
    }
})


orderProductsRouter.delete('/:orderproductid', async (req, res, next) => {    // req.user just seees if you are logged in
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
orderProductsRouter.patch('/:orderproductid', requireUser, async (req, res, next) => { // url variable is inside of params in req
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


orderProductsRouter.get('/:orderId', requireUser, async (req, res, next) => {
    const orderId = req.params.orderId;
    try{
        const products = await getAllProductsByOrderId(orderId);
        res.send(products);


    } catch(error) {
        next(error);
    }
})




orderProductsRouter.patch('/:orderproductid', requireUser, async (req, res, next) => { // url variable is inside of params in req
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


module.exports = orderProductsRouter;