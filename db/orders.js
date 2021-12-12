const { Client } = require('pg');
const DB_NAME = 'tech-tycoons-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);


// ========= ORDERS ==========================

// ------------ get orders by user -------------
async function getAllOrdersByUser(id) {
    try {
      const {rows: userOrders} = await client.query(`
        SELECT *
        FROM orders
        WHERE "userId"=$1;`, [id]);
      return userOrders;
    } catch (error) {
      throw error;
    }
  }

  // ---------------- create order -----------------

  // adds a new order to the orders table
async function createOrder(userId) {

    // initial state for status when creating an order
    const status = 'created';
    try {
      const {rows: [order]} = await client.query(`
        INSERT INTO orders("userId", status)
        VALUES ($1, $2)
        RETURNING *;`, [userId, status]);
      return order;
    } catch (error) {
      throw error;
    }
  }


  // -------------- edit order status -----------------

  async function editOrderStatus(orderId, status) {
    try {
      const {rows: [order]} = await client.query(`
        SELECT *
        FROM orders
        WHERE id=$1;`, [orderId]);
      if (order) {
        const {rows: [editedOrder]} = await client.query(`
            UPDATE orders
            SET "status"=$1
            WHERE id=${orderId}
            RETURNING *;`, [status]);
        return editedOrder;
      } else return 'no order found under that id';
    } catch (error) {
      throw error;
    }
  }

  // ------------ get all orders ------------------------

  async function getAllOrders() {
    try{
      const {rows} = await client.query(`
        SELECT *
        FROM orders;`);
        return rows
    }
    catch(error){
      throw error;
    }
  }

  module.exports = {
    client,
    createOrder,
    editOrderStatus,
    getAllOrdersByUser,
    getAllOrders,
  
  }