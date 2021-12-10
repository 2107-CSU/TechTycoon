import axios from 'axios';  // makes calls to the api, api reuqests

const BaseUrl = "http://localhost:5000/";


export async function getSingleProduct(productId)
{
  try{
    const product = await fetch(BaseUrl + 'api/' + productId, {
      headers: {
        'Content-Type': 'application/json',
      }
    }); 
    return product;

  } catch(error)
  {
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