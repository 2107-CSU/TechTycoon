import axios from 'axios';  // makes calls to the api, api reuqests
import {register, login} from './users';
import { createOrder } from './orders';

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
