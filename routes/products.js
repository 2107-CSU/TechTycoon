const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, addProduct, getProductById} = require('../db');

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

module.exports = productsRouter;