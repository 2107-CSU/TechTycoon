const express = require('express');
const { send } = require('process');
const productsRouter = express.Router();
const {getAllProducts, addProduct, getProductById, editProduct, removeProductById, getPhotoByProductId} = require('../db');

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

productsRouter.get('/photos/:productId', async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const photos = await getPhotoByProductId(productId)
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


// should require user when that is implemented
productsRouter.delete('/:productId/delete', async (req, res, next) => {
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