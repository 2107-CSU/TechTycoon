require('dotenv').config();

// This is the Web Server
const express = require('express');
const server = express();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// adding cors
const cors = require('cors');
server.use(cors());

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./routes'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// bring in the DB connection
const { client } = require('./db');

// 404 error route
server.use('*', (req, res) => {
  res.status(404);
  res.send("404 error");
})

// 500 error route with error message
server.use((error, req, res, next) => {
  res.status(500);
  console.log(error.message);
  res.send({
    error: 500,
    message: error.message
    });
})

// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});