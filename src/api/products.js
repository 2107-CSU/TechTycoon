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

export async function getSingleProduct(productId) {
  try{
    const response = await fetch(`${BaseUrl}api/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await response.json();
    console.log(result)
    return result;

  } catch(error)
  {
    console.log(error)
    throw error;
  }
}

// ADMIN FUNCTIONS ----------------------------------------------
export async function addProduct(token, name, description, price, photoName, availability, quantity) {
  try {
    const response = await fetch(`${BaseUrl}api/products`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
        price,
        photo: photoName,
        availability,
        quantity
      })
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProductAmount(token, productId, quantity) {
  try {
    const response = await fetch(`${BaseUrl}api/products/${productId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity
      })
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function editProduct(token, productId, name, description, price, photoName, availability, quantity) {
  try {
    const response = await fetch(`${BaseUrl}api/products/${productId}/edit`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
        price,
        photo: photoName,
        availability,
        quantity
      })
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(token, productId) {
  try {
    const response = await fetch(`${BaseUrl}api/products/${productId}/delete`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}