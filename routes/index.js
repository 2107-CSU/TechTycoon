const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { getUserById } = require('../db/index');
// Logs the user in if they have the relevant header information with their token
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header('Authorization');

  // goes onto the next function if auth is falsey
  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)) { // verifies the token if "auth" starts with "Bearer"
      const token = auth.slice(prefix.length);

      try {
          const { id } = await jwt.verify(token, JWT_SECRET);

          if (id) {
              req.user = await getUserById(id);
              next();
          }
      } catch (error) {
          next(error)
      }
  } else {
      next(`Authorization token must start with ${ prefix }`)
  }
})

apiRouter.get("/", (req, res, next) => { // root url test
  res.send({
    message: "API is under construction!"
  });
});

// establishing the various urls
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const orderProductsRouter = require('./orderProducts');
apiRouter.use('/orderproducts', orderProductsRouter);

const productCategoriesRouter = require('./productCategories');
apiRouter.use('/productcategories', productCategoriesRouter);

const productReviewsRouter = require('./productReviews');
apiRouter.use('/productreviews', productReviewsRouter)

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const checkoutRouter = require('./checkout');
apiRouter.use('/checkout', checkoutRouter)

const categoriesRouter = require('./categories');
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
