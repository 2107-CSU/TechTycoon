import axios from 'axios';  // makes calls to the api, api reuqests
import {register, login, getUser, makeAdmin, deleteUser} from './users';
import { createOrder, getSingleOrder, getOrdersByUser, changeOrderStatus } from './orders';
import { getProductsByCategory } from './product_categories';
import { getProductsByOrder, addProductToOrder } from './order_products';
import { getProducts, getSingleProduct, addProduct, updateProductAmount, editProduct, deleteProduct } from './products';
import { createPaymentIntent } from './checkout'


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
  getUser, 
  makeAdmin, 
  deleteUser,
  getProductsByCategory,
  createOrder,
  getSingleOrder,
  getOrdersByUser,
  changeOrderStatus,
  getProductsByOrder,
  addProductToOrder,
  getProducts,
  getSingleProduct, 
  addProduct, 
  updateProductAmount, 
  editProduct, 
  deleteProduct,
  createPaymentIntent
}
