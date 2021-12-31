const {BaseUrl} = require('./constants');

export async function createCheckoutSession(items) {
    try {
        const response = await fetch(`${BaseUrl}api/checkout/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items
            })
        })

        const checkoutSession = await response.json()
        console.log(checkoutSession)
        return checkoutSession
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createPaymentIntent(cart) {
    try {
        const response = await fetch(`${BaseUrl}api/checkout/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart}),
            
        })

        const paymentIntent = await response.json();
        console.log(paymentIntent);
        return paymentIntent;
    } catch (error) {
        console.log(error);
        throw error;
    }
}