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

async function getAllProducts()
{
    try {const {rows} = await client.query(
      `SELECT *
      WHERE availabilty = $1
      FROM products;`, [true])
    } catch(error){throw error;}
    return rows;
}

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

// export
module.exports = {
  client,
  getAllProducts,
  addProduct
}