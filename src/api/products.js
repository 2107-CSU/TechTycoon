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

export async function getPhotos(productId){
  try {
    const response = await fetch(BaseUrl + `api/photos/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const photo = await response.json();
    console.log('PHOTO IS', photo)
    return photo;
  } catch (error) {
    throw error
  }
}