const BaseUrl = "http://localhost:5000/";

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

// MIGHT NOT NEED THIS FUNCTION
// CAN'T WORK PROPERLY ANYWAY DUE TO DB A MIDDLEWARE FUNCTION
export async function removeProductFromOrder(orderProductId) {

}