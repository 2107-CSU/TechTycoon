import React, {useState, useEffect} from "react";
import {  removeProductFromCart} from "./functions";
import { createOrder, addProductToOrder } from "../api";


const Cart = ({token, cart, setCart}) => {
  console.log(cart)
    useEffect(() => {
        
    }, []);
    return <div>
       <h1> Cart </h1> 
       {cart.map((productObj, indx) => {
         const {product, quantity} = productObj;
         return <div key = {indx} >
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>price: {product.price}</p>
                <p>quantity: {quantity}</p>
           <form>
             <input type = "text" 
             placeholder= "New Quantity"
             onChange = {(event) => {
              const cartCopy = [...cart];
              cartCopy[indx].quantity = event.target.value;
              setCart(cartCopy);
              localStorage.setItem('cart', JSON.stringify(cartCopy));
             }}/>
           </form>
           <button
            onClick = {() => {
             const newCart = removeProductFromCart(cart, indx);
             console.log(newCart);
             setCart(newCart);

            }}
           >Remove product from Cart</button>
           </div>
       })}
       {token && cart.length? <button
        onClick = {async () => {
          if(window.confirm("Order all objects in cart?"))
          {
            const {order} = await createOrder(token);
            console.log(cart);
            console.log(order);
            addProductToOrder(cart, token, order.id);
            setCart([]);
            localStorage.setItem('cart', []);
          }
        }}
       >Order Cart</button>: null}
    </div>
    
}

export default Cart;