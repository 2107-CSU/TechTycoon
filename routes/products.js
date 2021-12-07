const express = require('express');
const { send } = require('process');
const productsRouter = express.Router();
const {getAllProducts, addProduct, getProductById, editProduct} = require('../db');

productsRouter.get('/',  async (req, res, next) => {
        try {const products = await getAllProducts();
        res.send(products);} catch(error){
            next(error);
        }
});

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const singleProduct = await getProductById();
        res.send(singleProduct)
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/', async(req, res, next) => {
    const { name, description, price, photo, availability, quantity } = req.body;
    try {
        const newProduct = await addProduct(name, description, price, photo, availability, quantity)
        
        res.send(newProduct);
    } catch (error) {
        next(error)
    }
})

// needs to be updated when token is added
productsRouter.patch('/:productId/edit', async (req, res, next) => {
    const {productId} = req.params;
    req.body.id = productId;
    // check if admin. if true continue. false next(something)
    try {
        const editedProduct = editProduct(req.body);

        send(editedProduct);
    } catch (error) {
        next(error);
    }
})

module.exports = productsRouter;