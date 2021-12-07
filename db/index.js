// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

async function editProduct(forms = {}) {
  const { id } = fields;
  delete fields.id;

  const setString = Object.keys(fields).map((key, idx)
    `"${key}"=$${index + 1}`).join(', ');

    try {
      const {rows: [product] } = await client.query(`
      UPDATE products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;`, [Object.values(fields)]);

      return product;
    } catch (error) {
      throw error
    }
}
async function getAllProducts()
{
    try {const {rows} = await client.query(
      `SELECT *
      WHERE availabilty = $1
      FROM products;`, [true])
    } catch(error){throw error;}
    return rows;
}

// export
module.exports = {
  client,
  
  // db methods
  getAllProducts,
  editProduct
}