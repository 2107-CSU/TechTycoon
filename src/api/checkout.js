const BaseUrl = "http://localhost:5000/";

export async function createCheckoutSession(items) {
    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}