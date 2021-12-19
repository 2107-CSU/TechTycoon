const BaseUrl = "http://localhost:5000/";

export async function createCheckoutSession(items) {
    try {
        const response = await fetch(`${BaseUrl}create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items
            })
        })

        const checkoutSession = response.json()
        console.log(checkoutSession)
        return checkoutSession
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createPaymentIntent(orderId, items) {
    try {
        const response = await fetch(`${BaseUrl}/${orderId}create-payment-intent`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items
            })
        })

        const paymentIntent = response.json();
        console.log(paymentIntent);
        return paymentIntent;
    } catch (error) {
        console.log(error);
        throw error;
    }
}