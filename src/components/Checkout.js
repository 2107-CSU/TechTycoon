import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { createCheckoutSession, createPaymentIntent } from '../api/checkout';
import { createOrder, addProductToOrder } from "../api";

const Checkout = ({ token, history}) => {
    const [isPaymentLoading, setPaymentLoading] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe])

    useEffect(() => {
      async function setVars(){
        const result = localStorage.getItem('cart');
        if(result){
          const cart = await JSON.parse(result);
          await setCart(cart);
        }
      }
      setVars();
    }, [cart])

    const handleSubmit = async (e) => {
  
      // if (!stripe || !elements) {
      //   return;
      // }
  
      // setIsLoading(true);
  
      // const { error } = await stripe.confirmPayment({
      //   elements,
      //   confirmParams: {
      //     return_url: '/cart',
      //   },
      // });
  
      // if (error.type === "card_error" || error.type === "validation_error") {
      //   setMessage(error.message);
      // } else {
      //   setMessage("An unexpected error occured.");
      // }
  
      // setIsLoading(false);
          
    };

    
    return (
      <form id="payment-form" onSubmit={(e) => {
        e.preventDefault()
       handleSubmit()
      }}>
        
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit" onClick = {async () => {
          /* Payment function here */

          if(window.confirm("Order all objects in cart?"))
          {
            const {order} = await createOrder(token);
            console.log(cart);
            console.log(order);
            addProductToOrder(cart, token, order.id);
            setCart([]);
            localStorage.setItem('cart', []);
            history.push('/profile')
          }
          
        }}>
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    )
}

export default Checkout;