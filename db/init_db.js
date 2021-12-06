// code to build and initialize DB goes here
const {
  client,
  addProduct,
   createUser,
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping tables...")
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS products;

    `)
    // build tables in correct order
    console.log("Building tables...")
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        photo VARCHAR(255) UNIQUE NOT NULL,
        availability BOOLEAN NOT NULL DEFAULT true,
        quantity INTEGER 
      );
      CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE product_categories(
        "productId" INTEGER UNIQUE REFERENCES products(id),
	      "catgeoryId" INTEGER UNIQUE REFERENCES categories(id)
      );

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        "wouldRecommend" BOOLEAN NOT NULL DEFAULT true,
        comments VARCHAR(255),
        date DATE NOT NULL DEFAULT CURRENT_DATE
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        status VARCHAR(255) NOT NULL
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER
      );
    `)
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data

  } catch (error) {
    console.error("Error initializing tables!")
    throw error;
  }
}


async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));   // promise.all waits for everything in the array to reurn
      console.log('Users created:');
      console.log(users);
      console.log('Finished creating users!');
  } catch (error) {
      console.error('Error creating users!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

buildTables()
  //.then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());