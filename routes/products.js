const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, addProduct, getProductById, editProduct, removeProductById, getPhotoByProductId} = require('../db');
const {requireAdmin} = require('./utils');

productsRouter.get('/',  async (req, res, next) => {
        try {const products = await getAllProducts();
        res.send(products);} catch(error){
            next(error);
        }
});

productsRouter.get('/:productId', async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const singleProduct = await getProductById(productId);
        res.send(singleProduct)
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/', requireAdmin, async(req, res, next) => {
    const { name, description, price, photo, availability, quantity, categories } = req.body;
    try {
        const newProduct = await addProduct({name, description, price, photo, availability, quantity, categories})
        
        res.send({
            "message": "success",
            "product": newProduct
        });
    } catch (error) {
        next(error)
    }
})

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => { // do we check that user is admin??
    const id = req.params.productId;    // grab the id
    const {quantity} = req.body;  // not sure where quantity comes from?
    try {
        const product = await editProduct(id, {quantity});
        res.send({
            "message": "success",
            product});   // not sure if this is what is sent?
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})
                     
productsRouter.patch('/:productId/edit', requireAdmin, async (req, res, next) => {
    const {productId} = req.params;

    try {
        const product = editProduct(productId, req.body);

        res.send({
            "message": "success",
            product});
    } catch (error) {
        next(error);
    }
})


// should require user when that is implemented
productsRouter.delete('/:productId/delete', requireAdmin, async (req, res, next) => {
    const {productId} = req.params;
    // make sure user is admin before continuing
    try {
        const deleteMessage = await removeProductById(productId);

        res.send({
            status: 'successful',
            message: deleteMessage}
        );
    } catch (error) {
        next(error)
    }
})

module.exports = productsRouter;