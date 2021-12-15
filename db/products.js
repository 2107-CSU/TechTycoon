const client = require('./client');
const {createCategories, createProductCategory} = require('./categoriesAndReviews');


// ============ PRODUCTS ====================================
// ------------- get all products ---------------------------
async function getAllProducts()
{
    try {
      const {rows: productIds} = await client.query(`
        SELECT id
        FROM products
        WHERE availability=true;
      `)
      // get products with added on categories
      // map through productsIds array to get complete product
      const products = await Promise.all(productIds.map(product => getProductById(product.id)))
      return products;
    }
    catch(error){
      throw error;
    }
}

// ------------- get product by id --------------------------

async function getProductById(id){
  try {  // get product that matches given id
    const {rows: [product]} = await client.query(`
      SELECT * FROM products
      WHERE id=$1;
    `, [id]); // get category for that product id
    const {rows: categories} = await client.query(`
      SELECT categories.*
      FROM categories
      JOIN product_categories ON categories.id = product_categories."categoryId"
      WHERE product_categories."productId" = $1;
      `, [id]);
      // add categories name to product
      product.categories = categories.map(categoryObject => categoryObject.name);
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ------------- edit product --------------------------------

async function editProduct(productId, fields = {}) {
    const {categories} = fields;
    delete fields.categories;
    // make set string to edit product
    const setString = Object.keys(fields).map((key, idx) =>
      `"${key}"=$${idx + 1}`).join(', ');
      try {
        const {rows: [product] } = await client.query(`
        UPDATE products
        SET ${setString}
        WHERE id=${productId}
        RETURNING *;`, Object.values(fields));
        // if there are no categories stop here
        if(categories === undefined) return product;
        // array of categories
        const categoryList = await createCategories(categories)
        const categoryListIdString = categoryList.map(category => `${category.id}`).join(', ') // how can we write this in long hand?
        // ?
        await client.query(`
          DELETE FROM product_categories
          WHERE "categoryId"
          NOT IN (${categoryListIdString})
          AND "productId"=$1;
        `, [productId]);
        // product with categories
        await addCategoriesToProduct(productId, categoryList)
        // return the completed product
        return await getProductById(productId);
      } catch (error) {
        throw error
      }
  }

// ----------- add categories to product ---------------------

async function addCategoriesToProduct(productId, categoryList){
  try {
      const createProductCategoryPromises = categoryList.map(async category => await createProductCategory(productId, category.id));
      await Promise.all(createProductCategoryPromises);
    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

// ------------- add product ----------------------------------

async function addProduct({ name, description, price, photo, availability, quantity, categories = [] }){
  try { // add a product to database
    const { rows: [product] } = await client.query(`
      INSERT INTO products(name, description, price, photo, availability, quantity)
      VALUES($1, $2, $3, $4, $5, $6)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [name, description, price, photo, availability, quantity]);
    const categoryList = await createCategories(categories); // make categories
    return await addCategoriesToProduct(product.id, categoryList);  // add categories to products
  } catch (error) {
    throw error;
  }
}

// ------------ get products by category ------------------------

async function getProductsbyCategoryName(categoryName)
{
  try {
    const {rows: productIds} = await client.query(`
      SELECT products.id 
      FROM products
      JOIN product_categories ON products.id=product_categories."productId"
      JOIN categories ON categories.id=product_categories."categoryId"
      WHERE categories.name = $1;`, [categoryName]);
    return await Promise.all(productIds.map(product => getProductById(product.id))); // get the product with the category added on
  } catch(error) {
    throw error;
  }
}

// ------------- remove product by Id ------------------------

async function removeProductById(id) {
  try { // delete product categories and then delete product
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

//========== PRODUCTS IN ORDERS (CART) =========================

// -------------- add product to order ------------------------

async function addProductToOrder(orderId, productId, quantity = 1)
{ // add product to order one at a time
  try{ 
    const {rows} = await client.query(`
      INSERT INTO order_products("orderId", "productId", quantity)
      VALUES($1, $2, $3)
      ON CONFLICT ("orderId", "productId") DO NOTHING;
    `, [orderId, productId, quantity]);
    return rows;
  } catch (error) {throw error;}
}

// ---------- get all products by order id --------------------

async function getAllProductsByOrderId(orderId){
  try{ // get product and match order id
    const {rows} = await client.query(`
      SELECT *
      FROM order_products
      JOIN products ON order_products."productId" = product.id
      WHERE order_products."orderId" = $1;`, [orderId]);
    return rows;
  } catch(error) {
    console.log(error);
    throw error;
  }
}

// ------------ update order product quantity -------------------

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

// ------------- delete product from order ---------------------

async function destroyProductFromOrder(id){ // takes product id
  try{
      const {rows:[deletedResult]}= await client.query(`
        DELETE FROM order_products
        WHERE id = $1
        RETURNING *;`, [id]);
      return deletedResult;  // populate order_products that we deleted
  }
  catch(error) {
      throw error;
  }
}

module.exports = {
  
  getAllProducts,
  addProductToOrder,
  addProduct,
  destroyProductFromOrder,
  updateOrderProductQuantity,
  getProductsbyCategoryName,
  getProductById,
  getAllProductsByOrderId,
  editProduct,
  removeProductById,

}
