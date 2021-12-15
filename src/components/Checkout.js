import React, { useState, useEffect } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '../api/checkout';

const Checkout = ({cart}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        const query = new URLSearchParams(window.location.search)

        if(query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.")
        }

        if(query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            )
        }
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
        <form onSubmit={async (e) => {
            e.preventDefault()
            await createCheckoutSession(cart)
        }}>
            {/* <PaymentElement /> */}
            <button>Submit</button>
        </form>
    )
}

export default Checkout;