import React, {useState, useEffect} from "react";
import {  removeProductFromCart, calculateCartPrice, isPosInt, allPosInts} from "./functions";
import { createOrder, addProductToOrder } from "../api";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// if(window.confirm("Order all objects in cart?"))
//           {
//             const {order} = await createOrder(token);
//             console.log(cart);
//             console.log(order);
//             addProductToOrder(cart, token, order.id);
//             setCart([]);
//             localStorage.setItem('cart', []);
//           }


const Cart = ({token, cart, setCart}) => {
    useEffect(() => {
      
        
    }, []);
    return <div>
       <h1 className = "title"> Cart </h1> 
       <Row xs={1} md={2} className="g-4">
       {cart.map((productObj, indx) => {
         const {product, quantity} = productObj;
         return <Col key = {indx} >
                <Card style={{ width: '18rem' }}>
                <Card.Header>{product.categories}</Card.Header>
                <Card.Img src={`photos/${product.photo}.jpg`} variant='top'/>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>price: ${product.price} x </Card.Text>
                  <div className = "flex">
                  <Card.Text>quantity:  </Card.Text>
           <form>
             <input type = "text"
             className = "focus"
             value = {quantity}
             size = {2}
             onChange = {(event) => {
              const cartCopy = [...cart];
              cartCopy[indx].quantity = event.target.value;
              setCart(cartCopy);
              localStorage.setItem('cart', JSON.stringify(cartCopy));
             }}/>
           </form>
           <Card.Text> = ${Math.round(product.price * quantity * 100) / 100}</Card.Text>
              </div>
          {isPosInt(quantity) ? null : <div className = "warning"> Quantity must be a positive integer to order!</div>}
           </Card.Body>
           <button
            onClick = {() => {
             const newCart = removeProductFromCart(cart, indx);
             console.log(newCart);
             setCart(newCart);

            }}
           >Remove product from Cart</button>
           </Card>
           </Col>
       })}
       </Row>
       {cart.length? <p><b>Total Price: </b>${calculateCartPrice(cart)}</p>: <h4 className = "flex margin">Your cart is Empty.</h4>}
       {token && cart.length && allPosInts(cart)?
       <a href={`/checkout`}><button>Checkout Cart</button></a> : null}
    </div>
    
}

export default Cart;