import React, {useState, useEffect} from "react";
import {  removeProductFromCart} from "./functions";
import { createOrder } from "../api";


const Cart = ({token, cart, setCart}) => {

    useEffect(() => {
      const fetchData = async () => {
        const result = localStorage.getItem('cart');
        const cart = JSON.parse(result);
        await setCart(cart);
      }
      fetchData();
        
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
       <button
        onClick = {async () => {
          if(window.confirm("Order all objects in cart?"))
          {
            // make order
            const order = await createOrder(token);
            // add products to order
          setCart([]);
          localStorage.setItem('cart', []);
          }
        }}
       >Order Cart</button>
    </div>
    
}

export default Cart;