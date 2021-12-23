import React, {useState, useEffect} from "react";
import {  removeProductFromCart, calculateCartPrice} from "./functions";
import { createOrder, addProductToOrder } from "../api";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Cart = ({token, cart, setCart}) => {

    useEffect(() => {
      
        
    }, []);
    return <div>
       <h1> Cart </h1> 
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
                  <Card.Text>price: {product.price}</Card.Text>
                  <Card.Text>quantity: {quantity}</Card.Text>
                </Card.Body>
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
           </Card>
           </Col>
       })}
       </Row>
       <p>Total Price: ${calculateCartPrice(cart)}</p>
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