// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const bcrypt = require('bcrypt'); // import bcrypt


//=================== USERS ============================
//====================== Create Users ==================
async function createUser({username, password, email, isAdmin}) {
  const SALT_COUNT = 10;   // salt makes encryption more complex
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  if(!isAdmin) isAdmin = false
  try {
      const {rows: [user]} = await client.query(`
          INSERT INTO users (username, password, email, "isAdmin")
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
      `, [username, hashedPassword, email, isAdmin]);
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

// returns the relevant information of a user after verifying username and password match
async function getUser({username, password}) {
  try {
    const user = await getUserByUsername(username);
    if (!user) throw Error('User could not be fetched!');

    // comparing the password sent in to the password of the matching username
    // we need bcrypt because the user tables passwords are encrypted
    
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (passwordIsMatch) {
      delete user.password;
      
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

// returns the user data of the specified username
async function getUserByUsername(username) {
  try {
    const {rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1`, [username]);

    return user;
  } catch (error) {
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

async function deleteUser(userId){
  try {
    await client.query(`
      DELETE FROM users
      WHERE id=$1;
    `, [userId]);

    await client.query(`
      DELETE FROM orders
      WHERE "userId"=$1;
    `, [userId])
  } catch (error) {
    throw error;
  }
}



async function getAllUsers(){
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}


// ======== PRODUCTS ===================

async function editProduct(productId, fields = {}) {
  const {categories} = fields;
  delete fields.categories;

  const setString = Object.keys(fields).map((key, idx) =>
    `"${key}"=$${idx + 1}`).join(', ');

    try {
      const {rows: [product] } = await client.query(`
      UPDATE products
      SET ${setString}
      WHERE id=${productId}
      RETURNING *;`, Object.values(fields));

      if(categories === undefined) return product;

      const categoryList = await createCategories(categories)
      const categoryListIdString = categoryList.map(category => `${category.id}`).join(', ')

      await client.query(`
        DELETE FROM product_categories
        WHERE "categoryId"
        NOT IN (${categoryListIdString})
        AND "productId"=$1;
      `, [productId]);

      await addCategoriesToProduct(productId, categoryList)

      return await getProductById(productId)
    } catch (error) {
      throw error
    }
}

// ===== get all products ================    

async function getAllProducts()
{
    try {

      const {rows: productIds} = await client.query(`
        SELECT id
        FROM products
        WHERE availability=true;
      `)
      
      const products = await Promise.all(productIds.map(product => getProductById(product.id)))
      return products;
    }

    catch(error){
      throw error;
    }
    
}

//=========== add product to order =======

async function addProductToOrder({orderId, productId, quantity = 1})
{
  try{ 
    const {rows: [orderProduct]} = await client.query(`
      INSERT INTO order_products("orderId", "productId", quantity)
      VALUES($1, $2, $3)
      ON CONFLICT ("orderId", "productId") DO NOTHING
      RETURNING *;
    `, [orderId, productId, quantity]);

    return orderProduct;
  } catch (error) {throw error;}
}


// ========== add a product in general ? =============

async function addProduct({ name, description, price, photo, availability, quantity, categories = [] }){
  try {
    const { rows: [product] } = await client.query(`
      INSERT INTO products(name, description, price, photo, availability, quantity)
      VALUES($1, $2, $3, $4, $5, $6)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [name, description, price, photo, availability, quantity])

    const categoryList = await createCategories(categories);

    return await addCategoriesToProduct(product.id, categoryList)
  } catch (error) {
    throw error;
  }
}

// ============== get product by category ==============
async function getProductsbyCategoryName(categoryName)
{
  try {

    const {rows: productIds} = await client.query(`
      SELECT products.id 
      FROM products
      JOIN product_categories ON products.id=product_categories."productId"
      JOIN categories ON categories.id=product_categories."categoryId"
      WHERE categories.name=$1;`, [categoryName]);
    
    return await Promise.all(productIds.map(product => getProductById(product.id)));

  } catch(error) {throw error;}
}


// ==========ORDER PRODUCTS =====================
async function removeProductById(id) {
  try {
    await client.query(`
    DELETE FROM product_categories
    WHERE "productId"=${id};`)

    await client.query(`
    DELETE FROM products
    WHERE id=${id};`);

    return `Successfully deleted the product with an id of ${id}`;
  } catch(error) {
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
    const createProductCategoryPromises = categoryList.map(async category => await createProductCategory(productId, category.id));

    await Promise.all(createProductCategoryPromises);

    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}
//---------------Single Product endpoints----------------

async function getProductById(id){
  try {
    const {rows: [product]} = await client.query(`
      SELECT * FROM products
      WHERE id=$1;
    `, [id]);

    const {rows: categories} = await client.query(`
      SELECT categories.*
      FROM categories
      JOIN product_categories ON categories.id = product_categories."categoryId"
      WHERE product_categories."productId" = $1;`
      , [id]);

      product.categories = categories.map(categoryObject => categoryObject.name);


    return product;
  } catch (error) {
    console.log(error);
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

async function createReview( {comments, productId, userId, wouldRecommend}){
  try {
    const {rows: [review] } = await client.query(`
      INSERT INTO reviews ("productId", "userId", "wouldRecommend", comments)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, userId, wouldRecommend, comments])
    return review
  } catch (error) {
    throw error;
  }
}

async function getOrderByOrderId(orderId){
  try{
    const {rows} = await client.query(`
    SELECT *
    FROM orders
    WHERE id = $1;`, [orderId]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllProductsByOrderId(orderId){
  try{
    const {rows} = await client.query(`
    SELECT "productId", order_products.quantity, name, description, price, photo, availability
    FROM order_products
    JOIN products ON products.id = order_products."productId"
    WHERE order_products."orderId" = $1
    ;`, [orderId]);
    return rows;

  } catch(error) {
    console.log(error);
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
    RETURNING *;`, [userId, status]);

    return order;
  } catch (error) {
    throw error;
  }
}



async function getAllOrdersByUser(id) {
  try {
    const {rows: userOrders} = await client.query(`
    SELECT *
    FROM orders
    WHERE "userId"=$1;`, [id]);

    return userOrders;

  } catch (error) {
    throw error;
  }
}

async function editOrderStatus(orderId, status) {
  try {
    const {rows: [order]} = await client.query(`
    SELECT *
    FROM orders
    WHERE id=$1;`, [orderId]);

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

async function getAllOrders() {
  try{
    const {rows} = await client.query(`
      SELECT *
      FROM orders;`);
      return rows
  }
  catch(error){
    throw error;
  }
}

async function getOrdersByUser(userId)
{
  try{
    const {rows: orders} = await client.query(`
      SELECT *
      FROM orders
      WHERE "userId" = $1
      ;`, [userId]);
      return orders;

  } catch(error) {
    console.log(error);
  }
}

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
  getAllOrdersByUser,
  createReview,
  getUser,
  getAllOrders,
  getOrdersByUser,
  getPhotoByProductId,
  getUserByUsername
}
