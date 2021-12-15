import axios from 'axios';  // makes calls to the api, api reuqests
import {register, login} from './users';
import { createOrder } from './orders';
const BaseUrl = "http://localhost:5000/";


export async function getSingleProduct(productId)
{
  try{
    const response = await fetch(BaseUrl + 'api/products/' + productId, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const product = await response.json();
    console.log(product)
    return product;

  } catch(error)
  {
    console.log(error)
    throw error;
  }
}

export async function getOrdersByUser(token)
{
  try{
    const response = await fetch(BaseUrl + 'api/orders/userOrders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    })
      const orders = await response.json();
      return orders;

  } catch(error)
  {
    console.log(error);
    throw error;
  }
}

export async function getProductsByOrder(token, orderId)
{
  try{
    const response = await fetch(BaseUrl + 'api/orderproducts/' + orderId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const orderProducts = await response.json();
    return orderProducts;

  } catch(error)
  {
    console.log(error);
    throw error;
  }
}


// -------------------- api function add to order -----------------------------
export async function addProductToOrder(orderProduct, token, orderId)
{
  try{ // we need api request that sends request to post
    const response = await fetch(BaseUrl + 'api/orderproducts/' + orderId, {
      method: 'POST',
      headers: { // do we need headers? to add products?
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ // do these keys need to match db table?
        post:{
        orderId: orderProduct.orderId,
        productId: orderProduct.productId,
        quantity:orderProduct.quantity,
        }
      }) // end of body

    }) // end of fetch
    
    const addedOrderProduct = await response.json();
    console.log("&&&&&&&&& TEST the added products are", addedOrderProduct);
    return addedOrderProduct;

  } catch(error)
  {
    console.log(error);
    throw error;
  }
}

// export async function 


export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}



export {
  login,
  register,
  createOrder
}
