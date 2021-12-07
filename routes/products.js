const express = require('express');
const productsRouter = express.Router();
const {getAllProducts, editProduct} = require('../db');

productsRouter.get('/',  async (req, res, next) => {
        try {const products = await getAllProducts();
        res.send(products);} catch(error){
            next(error);
        }
});
// needs to be updated when token is added
productsRouter.patch('/:productId/edit', async (req, res, next) => {
    
})
module.exports = productsRouter;