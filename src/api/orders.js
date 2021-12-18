const BaseUrl = "http://localhost:5000/";

export async function createOrder(token) {
    try {
        const response = await fetch(`${BaseUrl}api/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getSingleOrder(orderId) {
    try {
        const response = await fetch(`${BaseUrl}api/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
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

export async function changeOrderStatus(token, orderId, status) {
    try {
        const response = await fetch(BaseUrl + 'api/orders/' + orderId, {
            method: "PATCH",  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                status
            })
        });
          const result = await response.json();
          return result;
    
      } catch(error){
        throw error;
      }
}