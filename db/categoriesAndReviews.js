const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);


// ============ CATEGORIES ================================
// ------------- create categories -------------------------

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

  // ------- create product category --------------------

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

// ============== REVIEWS =====================================

// -------------- get reviews by product Id -----------------

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

// -------------- create a review -----------------------------
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

module.exports = {
  client,
  createCategories,
  createProductCategory,
  getReviewsByProductId,
  createReview,
  
}

