const {BaseUrl} = require('./constants');

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

export async function addProductToOrder(orderProducts, token, orderId)
{
  try{ // we need api request that sends request to post
    console.log(orderProducts);
    const response = await fetch(BaseUrl + 'api/orderproducts', {
      method: 'POST',
      headers: { // do we need headers? to add products?
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ // do these keys need to match db table?
        
        orderId,
        products: orderProducts
        
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

// MIGHT NOT NEED THIS FUNCTION
// CAN'T WORK PROPERLY ANYWAY DUE TO DB A MIDDLEWARE FUNCTION
export async function removeProductFromOrder(orderProductId) {

}