// import { response } from "express";

// const BaseUrl = "http://localhost:5000/";

// export async function createCheckoutSession(items) {
//     try {
//         const response = await fetch('/create-checkout-session', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 items
//             })
//         })

//         const checkoutSession = response.json()
//         console.log(checkoutSession)
//         return checkoutSession
//     } catch (error) {
//         console.error(error)
//         throw error
//     }
// }