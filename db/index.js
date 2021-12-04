// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function addProduct({ name, description, price, photo, availability, quantity }){
  try {
    const {rows} = await client.query(`
      INSERT INTO products(name, description, price, photo, availability, quantity)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *,
    `, [name, description, price, photo, availability, quantity])
  
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts()
{
  const {rows} = await client.query(
    `SELECT *
    FROM products;`)

    return rows;
}

// export
module.exports = {
  client,
  getAllProducts,
  addProduct
  // db methods
}