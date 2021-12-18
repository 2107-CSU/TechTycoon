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
