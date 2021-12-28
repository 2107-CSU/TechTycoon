const client = require('./client');


// ========= ORDERS ==========================

// ------------ get orders by user -------------
  async function getOrdersByUser(userId)
  {
    try{
      const {rows: orders} = await client.query(`
        SELECT *
        FROM orders
        WHERE "userId" = $1
        ;`, [userId]);
        return orders;
  
    } catch(error) {
      console.log(error);
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

// --------- get order by order id ----------

async function getOrderByOrderId(orderId){
  try{
    const {rows} = await client.query(`
    SELECT *
    FROM orders
    WHERE id = $1;`, [orderId]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getOrderTotal(orderId){
  try {
    const {rows} = await client.query(`
      SELECT "productId", order_products.quantity, price
      FROM order_products
      JOIN products ON products.id = order_products."productId"
      WHERE order_products."orderId" = $1;
    `, [orderId])

    console.log(rows)

    const orderTotal = rows.map((product) => {
      let runningTotal = (product.quantity * product.price)
      return runningTotal
    }).reduce((a, b) => a + b)

    return orderTotal;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


  module.exports = {
    
    createOrder,
    editOrderStatus,
    getOrdersByUser,
    getAllOrders,
    getOrderByOrderId,
    getOrderTotal
  }