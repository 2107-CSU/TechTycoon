import React, { useState, useEffect } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '../api/checkout';

const Checkout = () => {
    const cart = [
        {
          productId: 2,
          quantity: 5,
          name: 'Microsoft Office Suite 2021',
          description: 'All microsoft products',
          price: 249.99,
          photo: 'office-home-business-2021',
          availability: true
        },
        {
          productId: 6,
          quantity: 12,
          name: '4-Port Hub Belkin Super Speed 3.0',
          description: 'Belkin port with 4 USB slots',
          price: 49.99,
          photo: '4-port-hub-belkin-3.0',
          availability: true
        }
      ]
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("")
    
    // useEffect(() => {
    //     const query = new URLSearchParams(window.location.search)

    //     if(query.get("success")) {
    //         setMessage("Order placed! You will receive an email confirmation.")
    //     }

    //     if(query.get("canceled")) {
    //         setMessage(
    //             "Order canceled -- continue to shop around and checkout when you're ready."
    //         )
    //     }
    // }, [])

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
        <form action="/create-checkout-session" method="POST">
            {/* <PaymentElement /> */}
            <button type="submit">Submit</button>
        </form>
    )
}

export default Checkout;