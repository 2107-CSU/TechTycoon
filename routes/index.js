const apiRouter = require('express').Router();



apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});


const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const order_productsRouter = require('./order_products');
apiRouter.use('/orderproducts', order_productsRouter);

module.exports = apiRouter;
