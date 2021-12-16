export function addProductToCart(cart, product, quantity)
{
  const cartCopy = [...cart];
  cartCopy.push({product, quantity, productId: product.id});
  localStorage.setItem('cart', JSON.stringify(cartCopy));
  return cartCopy;
}

export function removeProductFromCart(cart, indx)
{
    const cartCopy = [...cart];
    cartCopy.splice(indx, 1);
    localStorage.setItem('cart', JSON.stringify(cartCopy));
    return cartCopy;
}

export function handleCarouselSelect(){
  
}