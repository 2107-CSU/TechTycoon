// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

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
}