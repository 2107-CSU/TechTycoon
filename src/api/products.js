import axios from 'axios';  // makes calls to the api, api reuqests

const BaseUrl = "http://localhost:5000/";


export async function getProducts()
{
  try{
    const response = await fetch(BaseUrl + 'api/products/', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const products = await response.json();
    console.log(products)
    return products;

  } catch(error)
  {
    console.log(error)
    throw error;
  }
}