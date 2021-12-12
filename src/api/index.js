import axios from 'axios';  // makes calls to the api, api reuqests
import {register, login} from './users';
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
  register
}