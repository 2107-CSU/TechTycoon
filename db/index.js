// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const bcrypt = require('bcrypt'); // import bcrypt

//====================== Create Users ==================
async function createUser({username, password}) {
  const SALT_COUNT = 10;   // salt makes encryption more complex
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
      const {rows: [user]} = await client.query(`
          INSERT INTO users (username, password)
          VALUES ($1, $2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
      `, [username, hashedPassword]);
      delete user.password;
      return user;
  }
  catch (error) {
      throw error;
  }
}

async function makeUserAdmin({id}){
  try {
    const {rows} = await client.query(`
      UPDATE users
      SET isAdmin=true
      WHERE id=$1;
    `, [id])

    return rows
  } catch (error) {
    throw error;
  }
}

// ===== get all products ================


async function getAllProducts()
{
    try {const {rows} = await client.query(
      `SELECT *
      WHERE availabilty = $1
      FROM products;`, [true])
    } catch(error){throw error;}
    return rows;
}

async function addProductToOrder(orderId, productId, quantity = 1)
{
  try{ const {rows} = await client.query(
    `INSERT INTO order_products("orderId", "productId", quantity)
    VALUES($1, $2, $3)
    ON CONFLICT ("orderId", "productId") DO NOTHING;`, [orderId, productId, quantity]
  );} catch (error) {throw error;}
}


async function addProduct({ name, description, price, photo, availability, quantity, categories = [] }){
  try {
    const { rows: [product] } = await client.query(`
      INSERT INTO products(name, description, price, photo, availability, quantity)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;,
    `, [name, description, price, photo, availability, quantity])
  
    const categoryList = await createCategories(categories);

    return await addCategoriesToProduct(product.id, categoryList)
  } catch (error) {
    throw error;
  }
}

// =========== destroy product from order =========

// check with matt, rebecca, amadeo? which id, po id or p id
async function destroyProductFromOrder(id){ // takes product id?
  try{
      const {rows:[deletedResult]}= await client.query(`
      DELETE FROM order_products
      WHERE id = $1
      RETURNING *;`, [id]);

      return deletedResult;   // populate the order_products that we deleted
  }
  catch(error) {
      throw error;
  }
}


// =============== edit order product quantity ================

async function updateOrderProductQuantity({ id, quantity }){
  try{
      const {rows: [orderProductQuantity] } = await client.query(`
      UPDATE order_products
      SET quantity = $1
      WHERE id= ${id}
      RETURNING *;
      `, [quantity])
      return orderProductQuantity;
  }
  catch(error){
      throw error;
  }
}

async function getProductsbyCategoryId(id)
{
  try{
    const {rows} = await client.query(`
    SELECT * 
    FROM product_categories
    JOIN products ON product_categories."productId" = product.id
    WHERE product_categories."categoryId" = $1;`, [id]);

    return rows;

  } catch(error) {throw error;}
}

async function createCategories(categoryList){
  if (categoryList.length === 0) return;

  const valuesStringInsert = categoryList.map(
    (_, index) => `$${index + 1}`
  ).join('), (');

  const valuesStringSelect = categoryList.map(
    (_, index) => `$${index + 1}`
  ).join(', ');

  try {
    await client.query(`
      INSERT INTO categories (name)
      VALUES (${valuesStringInsert})
      ON CONFLICT (name) DO NOTHING;
    `, categoryList)

    const {rows} = await client.query(`
      SELECT * FROM categories
      WHERE name
      IN (${valuesStringSelect});
    `, categoryList)

    return rows
  } catch (error) {
    throw error;
  }
}

async function createProductCategory(productId, categoryId){
  try {
    await client.query(`
      INSERT INTO product_categories("productId", "categoryId")
      VALUES ($1, $2)
      ON CONFLICT ("productId", "categoryId") DO NOTHING;
    `, [productId, categoryId]);
  } catch (error) {
    throw error;
  }
}

async function addCategoriesToProduct(productId, categoryList){
  try {
    const createProductCategoryPromises = categoryList.map(category => createProductCategory(productId, category.id));

    await Promise.all(createProductCategoryPromises);

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}
//---------------Single Product endpoints----------------

async function getProductById(id){
  try {
    const {rows} = await client.query(`
      SELECT * FROM products
      WHERE id=$1;
    `, [id]);

    return rows;
  } catch (error) {
    throw error;
  }
}


async function getReviewsByProductId(productId){
  try {
    const {rows} = await client.query(`
      SELECT * FROM reviews
      WHERE "productId"=$1;
    `, [productId])

    return rows
  } catch (error) {
    throw error;
  }
}

async function getOrderByOrderId(orderId){
  try{
    const {rows} = await client.query(`
    SELECT *
    FROM orders
    WHERE id = $1;`, [orderId])
  } catch (error) {
    throw error;
  }
}

async function getAllProductsByOrderId(orderId){
  try{
    const {rows} = await client.query(`
    SELECT *
    FROM order_products
    JOIN products ON order_products."productId" = product.id
    WHERE order_products."orderId" = $1;`, [orderId]);
    return rows;

  } catch(error) {
    throw error;
  }
}

// adds a new order to the orders table
async function createOrder(userId) {

  // initial state for status when creating an order
  const status = 'created';
  try {
    const {rows: [order]} = await client.query(`
    INSERT INTO orders("userId", status)
    VALUES ($1, $2)
    RETURNING *;`);

    return order;
  } catch (error) {
    throw error;
  }
}

async function editOrderProductStatus(orderId, status) {
  try {
    const {rows: [order]} = await client.query(`
    SELECT *
    FROM orders
    WHERE id=$1`, [orderId]);

    if (order) {
      const {rows: [editedOrder]} = await client.query(`
      UPDATE orders
      SET "status"=$1
      WHERE id=${orderId}
      RETURNING *;`, [status]);

      return editedOrder;
    } else return 'no order found under that id';
  } catch (error) {
    throw error;
  }
}
// export
module.exports = {
  client,
  createUser,
  makeUserAdmin,
  getAllProducts,
  addProductToOrder,
  addProduct,
  destroyProductFromOrder,
  updateOrderProductQuantity,
  getProductsbyCategoryId,
  createCategories,
  getProductById,
  getReviewsByProductId,
  getOrderByOrderId,
  getAllProductsByOrderId,
  createOrder,
  editOrderProductStatus
}
