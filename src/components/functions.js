export function addProductToCart(cart, product, quantity)
{

  if(!cart.find(cartItem => cartItem.productId === product.id)){
    const cartCopy = [...cart];
    cartCopy.push({product, quantity, productId: product.id});
    localStorage.setItem('cart', JSON.stringify(cartCopy));
    return cartCopy;
  } else{
    alert("This product is already in your cart!");
    return cart;
  }
 
}

export function removeProductFromCart(cart, indx)
{
    const cartCopy = [...cart];
    cartCopy.splice(indx, 1);
    localStorage.setItem('cart', JSON.stringify(cartCopy));
    return cartCopy;
}

export function calculateCartPrice(cart)
{
  let total = 0;
  cart.forEach(cartItem => total += (cartItem.product.price * cartItem.quantity));
  return Math.round(total * 100) /100;
}

export function calculateOrderPrice(order)
{
  let total = 0;
  order.forEach(orderProduct => total += (orderProduct.price * orderProduct.quantity));
  return Math.round(total * 100) / 100;
}

export function convertDate(date)
{
  const year = date.slice(0, 4);
  const month = date.slice(5,7);
  const day = date.slice(8, 10);
  const newDate = month + ' / ' + day + ' / ' + year;
  return newDate;
}

export function isPosInt(string)
{
  const num = Number(string);
  if(!Number.isInteger(num) || num <= 0) return false;
  return true;
}

export function allPosInts(cart)
{
  const notNum = cart.find(cartItem => !isPosInt(cartItem.quantity));
  if(notNum) return false;
  return true;
}