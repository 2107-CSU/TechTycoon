import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createCheckoutSession, createPaymentIntent } from '../api/checkout';
import { getOrdersByUser } from '../api/orders'


const Checkout = ({cart, clientSecret, setClientSecret}) => {
    const [isPaymentLoading, setPaymentLoading] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        async function fetchPaymentIntent () {
          const token = localStorage.getItem('token')
          const userOrders = await getOrdersByUser(token)
          console.log(userOrders)
          //createPaymentIntent()
        }
        fetchPaymentIntent()
        
        // const query = new URLSearchParams(window.location.search)

        // if(query.get("success")) {
        //     setMessage("Order placed! You will receive an email confirmation.")
        // }

        // if(query.get("canceled")) {
        //     setMessage(
        //         "Order canceled -- continue to shop around and checkout when you're ready."
        //     )
        // }
    }, [])

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (!stripe || !elements) return;

    //     const result = await stripe.confirmPayment({
    //         elements,
    //         confirmParams: {
    //             return_url: 'https://localhost:300/cart/complete',
    //         },
    //     });

    //     if (result.error) {
    //         console.log(result.error.message);
    //     } 
    // }
    
    return (
      <div>
        <PaymentElement/>
      </div>
    )
}

export default Checkout;