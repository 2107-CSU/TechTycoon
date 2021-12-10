// code to build and initialize DB goes here
const {
  client,
  addProduct,
  createUser,
  createCategories,
  getReviewsByProductId,
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
        quantity INTEGER,
	      UNIQUE("orderId", "productId")
      );
    `)
  } catch (error) {
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

async function createInitialCategories() {
  console.log("Starting to create categories...");
  try {
    const categoriesToCreate = [
      {name: 'software'},
      {name: 'computers'},
      {name: 'accessories'},
      {name: 'gaming'}  
    ]

    const categories = await Promise.all(categoriesToCreate.map(createCategories));

    console.log('Categories created: ', categories)
  } catch (error) {
    console.error("Error creating categories!");
    throw error
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...");
  try {
    const productsToCreate = [
      {name: 'Adobe Creative Cloud', description: 'Adobe software', price: 29.99, photo: 'adobe-creative-cloud', availability: true, quantity: 10000},
      {name: 'Microsoft Office Suite 2021', description: 'All microsoft products', price: 249.99, photo: 'office-home-business-2021', availability: true, quantity: 10000},
      {name: '10.2-inch iPad Wi-Fi + Cellular 256GB - Silver', description: 'Apple tablet', price: 579, photo: '10.2-ipad-256gb', availability: true, quantity: 10000},
      {name: 'Microsoft Surface Book 3 13.5" Platinum', description: 'Microsoft laptop', price: 1575, photo: 'microsoft-surface-book', availability: true, quantity: 10000},  
      {name: '140W USB-C Power Adapter', description: 'Power adapter', price: 99, photo: '140w-usb-c-power-adapter', availability: true, quantity: 10000},
      {name: '4-Port Hub Belkin Super Speed 3.0', description: 'Belkin port with 4 USB slots', price: 49.99, photo: '4-port-hub-belkin-3.0', availability: true, quantity: 10000},
      {name: 'Cooler Master Devastator 3 RGB Gaming Keyboard and Mouse Combo', description: 'Keyboard and mouse', price: 35.99, photo: 'cooler-master-devastator-keyboard-and-mouse', availability: true, quantity: 10000},
      {name: 'Microsoft Xbox Elite Wireless Controller - Series 2', description: 'Xbox controller', price: 152, photo: 'microsoft-xbox-elite-wireless-controller', availability: true, quantity: 10000}
    ]

    const products = await Promise.all(productsToCreate.map(product => addProduct(product)));

    console.log("Products created: ", products)
  } catch (error) {
    
  }
}


//============ create reviews================
async function createInitialReviews() {
  console.log('Starting to create reviews...');
  try {
    const reviewDataToCreate = [
      { wouldRecommend: 'true', comments: 'this item is cool', date:'12/1/21' }, // should would recommend be in quotes? should date be num or string?
      { wouldRecommend: 'false', comments: 'dont buy this', date:'12/2/21' },
      { wouldRecommend: 'true', comments: 'this is a great product', date:'12/3/21' },
    ]
    const reviews = await Promise.all(reviewDataToCreate.map(getReviewsByProductId));   // do we pass in id to getReviewByProductId function?
      console.log('Reviews created:');
      console.log(reviews);
      console.log('Finished creating reviews!');
  } catch (error) {
      console.error('Error creating reviews!');
    throw error;
  }
}



async function buildDB() {
  try {
    client.connect();
    await buildTables();
    await createInitialUsers();
    await createInitialCategories();
    await createInitialProducts();
    await createInitialReviews();
    
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

buildTables()
  .then(buildDB)
  .catch(console.error)
  .finally(() => client.end());
