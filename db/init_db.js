// code to build and initialize DB goes here
const {
  client,
  addProduct,
  createUser,
  createCategories,
  getAllUsers,
  editProduct,
  getProductById,
  getAllProducts,
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
        price FLOAT NOT NULL,
        photo VARCHAR(255) NOT NULL,
        availability BOOLEAN NOT NULL DEFAULT true,
        quantity INTEGER 
      );
      CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE product_categories(
        "productId" INTEGER REFERENCES products(id),
	      "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE("productId", "categoryId")

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
      { username: 'albert', password: 'bertie99', email: 'albert@gmail.com' },
      { username: 'sandra', password: 'sandra123', email: 'sandra@gmail.com' },
      { username: 'glamgal', password: 'glamgal123', email: 'glamgal@gmail.com' },
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

async function createInitialProducts() {
  console.log("Starting to create products...");

  try {
    const productsToCreate = [
      {name: 'Adobe Creative Cloud', description: 'Adobe software', price: 29.99, photo: 'adobe-creative-cloud', availability: true, quantity: 10000, categories: ['software']},
      {name: 'Microsoft Office Suite 2021', description: 'All microsoft products', price: 249.99, photo: 'office-home-business-2021', availability: true, quantity: 10000, categories: ['software']},
      {name: '10.2-inch iPad Wi-Fi + Cellular 256GB - Silver', description: 'Apple tablet', price: 579, photo: '10.2-ipad-256gb', availability: true, quantity: 10000, categories: ['computers']},
      {name: 'Microsoft Surface Book 3 13.5" Platinum', description: 'Microsoft laptop', price: 1575, photo: 'microsoft-surface-book', availability: true, quantity: 10000, categories: ['computers']},  
      {name: '140W USB-C Power Adapter', description: 'Power adapter', price: 99, photo: '140w-usb-c-power-adapter', availability: true, quantity: 10000, categories: ['accessories']},
      {name: '4-Port Hub Belkin Super Speed 3.0', description: 'Belkin port with 4 USB slots', price: 49.99, photo: '4-port-hub-belkin-3.0', availability: true, quantity: 10000, categories: ['accessories']},
      {name: 'Cooler Master Devastator 3 RGB Gaming Keyboard and Mouse Combo', description: 'Keyboard and mouse', price: 35.99, photo: 'cooler-master-devastator-keyboard-and-mouse', availability: true, quantity: 10000, categories: ['gaming']},
      {name: 'Microsoft Xbox Elite Wireless Controller - Series 2', description: 'Xbox controller', price: 152, photo: 'microsoft-xbox-elite-wireless-controller', availability: true, quantity: 10000, categories: ['gaming']}
    ]

    const products = await Promise.all(productsToCreate.map(async product => await addProduct(product)));
    console.log("Products created: ", products)

    const editedProduct = await editProduct(1, {name: 'New name', description: 'New description', price: 30, photo: 'new photo', categories: ['new category', 'second new category']});
    console.log("Product edited: ", editedProduct)

    const allProducts = await getAllProducts()
    console.log('all products are ', allProducts)

    const updatedQuantity
  } catch (error) {
    
  }
}



async function buildDB() {
  try {
    await createInitialUsers();
    await createInitialProducts();
    
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

buildTables()
  .then(buildDB)
  .catch(console.error)
  .finally(() => client.end());
