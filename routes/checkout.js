const express = require('express');
const checkoutRouter = express.Router();
const getAllProductsByOrderId = require('../db')
const stripe = require('stripe')('sk_test_51K6JdyKsoRJpj5Ly0qKVmvtqcoYuX2UikVo2H5GuX72P04ATDEl6aPf1c50gQwcT5roqqY8oGCuGIPkVuosUXI0c00VkqpNK9P')

checkoutRouter.post('/create-checkout-session', async (req, res, next) => {
    const orderId = 4
    const products = getAllProductsByOrderId(orderId)

    try {
        const session = await stripe.checkout.sessions.create({
           // payment_method_types: ['card'],
            line_items: products.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price,
                    },
                    quantity: item.quantity
                }
            }),
            mode: 'payment',
            success_url: `http://localhost:5000/cart`,
            cancel_url: `http://localhost:5000/products`,
        });
    
        res.redirect(303, session.url);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

checkoutRouter.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

module.exports = checkoutRouter;