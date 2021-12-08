// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const bcrypt = require('bcrypt'); // import bcrypt


//=================== USERS ============================
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

// ==================== get user =========================

async function getUserById(id){
  try{
      const {rows: [user]} = await client.query(`
      SELECT * FROM users
      WHERE id= $1;
      `, [id]);
      return user;
  }
  catch(error){
      throw error;
  }
}

// ======== PRODUCTS ===================
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

// ====== edit product quantity ===========


async function updateProductQuantity(quantity, id){ // no object destructuring for quantity?
  try{
      const {rows: [quantity] } = await client.query(`
      UPDATE products
      SET quantity = $1
      WHERE id= ${id}
      RETURNING *;
      `, [quantity]);
      return quantity;       // is this what we return?
  }
  catch(error){
      throw error;
  }
}

//=========== add product to order =======

async function addProductToOrder(orderId, productId, quantity = 1)
{
  try{ const {rows} = await client.query(
    `INSERT INTO order_products("orderId", "productId", quantity)
    VALUES($1, $2, $3)
    ON CONFLICT ("orderId", "productId") DO NOTHING`, [orderId, productId, quantity]
  );} catch (error) {throw error;}
}

// ========== add a product in general ? =============
async function addProduct({ name, description, price, photo, availability, quantity }){
  try {
    const {rows} = await client.query(`
      INSERT INTO products(name, description, price, photo, availability, quantity)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;,
    `, [name, description, price, photo, availability, quantity])
  
    return rows;
  } catch (error) {
    throw error;
  }
}

// ============== get product by category ==============
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


// ==========ORDER PRODUCTS =====================
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

// ========== edit order status ====================================

async function updateOrderStatus({ id, status }){      // do we need a set string here?
  try{
      const {rows: [orderStatus] } = await client.query(`
      UPDATE order_products
      SET status = $1
      WHERE id= ${id}
      RETURNING *;
      `, [status]);
      return orderStatus;
  }
  catch(error){
      throw error;
  }

// export
module.exports = {
  client,
  createUser,
  getAllProducts,
  addProductToOrder,
  addProduct,
  destroyProductFromOrder,
  updateOrderProductQuantity,
  getProductsbyCategoryId,
  getUserById,
  updateProductQuantity,
  updateOrderStatus
}