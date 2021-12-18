// Connect to DB


const client = require('./client');

const {
  createUser,
  getAllUsers,
  makeUserAdmin,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUser,
} = require('./users');

const {
  createCategories,
  getReviewsByProductId,
  createReview,

} = require('./categoriesAndReviews');

const {
  createOrder,
  editOrderStatus,
  getAllOrders,
  getOrdersByUser,
  getOrderByOrderId,
} = require('./orders');

const {
  addProduct,
  editProduct,
  getProductById,
  getAllProducts,
  addProductToOrder,
  getProductsbyCategoryName,
  removeProductById,
  destroyProductFromOrder,
  updateOrderProductQuantity,
  getAllProductsByOrderId,
} = require('./products');

async function getPhotoByProductId(productId){
  try {
    const {rows: [photo]} = await client.query(`
      SELECT photo
      FROM products
      WHERE id=$1;
    `, [productId])

    return photo;
  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
  client,
  createUser,
  makeUserAdmin,
  deleteUser,
  getAllUsers,
  getAllProducts,
  addProductToOrder,
  addProduct,
  destroyProductFromOrder,
  updateOrderProductQuantity,
  getProductsbyCategoryName,
  getUserById,
  createCategories,
  getProductById,
  getReviewsByProductId,
  getOrderByOrderId,
  getAllProductsByOrderId,
  createOrder,
  editOrderStatus,
  editProduct,
  removeProductById,
  getOrdersByUser,
  createReview,
  getUser,
  getAllOrders,
  getPhotoByProductId,
  getOrdersByUser,
  getPhotoByProductId,
  getUserByUsername
}
