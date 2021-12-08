const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, addProduct} = require('../db');

productsRouter.get('/',  async (req, res, next) => {
        try {const products = await getAllProducts();
        res.send(products);} catch(error){
            next(error);
        }
});

productsRouter.post('/', async(req, res, next) => {
    const { name, description, price, photo, availability, quantity } = req.body;
    try {
        const newProduct = await addProduct(name, description, price, photo, availability, quantity)
        
        res.send(newProduct);
    } catch (error) {
        next(error)
    }
})

productsRouter.patch('/:productId', async (req, res, next) => { // do we check that user is admin??
    const id = req.params.productId;    // grab the id
    const {quantity} = req.body;  // not sure where quantity comes from?
    try {
        const product = await updateProductQuantity(id, quantity);
        res.send(product);   // not sure if this is what is sent?
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})


module.exports = productsRouter;