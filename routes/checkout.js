const stripe = require('stripe')('sk_test_51K6JdyKsoRJpj5Ly0qKVmvtqcoYuX2UikVo2H5GuX72P04ATDEl6aPf1c50gQwcT5roqqY8oGCuGIPkVuosUXI0c00VkqpNK9P')
const express = require('express');
const checkoutRouter = express.Router();
const getAllProductsByOrderId = require('../db')

const BaseUrl = "http://localhost:5000"

checkoutRouter.post('/create-checkout-session', async (req, res, next) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.items.map(item => {
            const storeItem = getAllProductsByOrderId(item)
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: storeItem.name,
                    },
                    unit_amount: storeItem.priceInCents,
                },
                quantity: item.quantity
            }
        }),
        mode: 'payment',
        success_url: `${BaseUrl}/?success=true`,
        cancel_url: `${BaseUrl}?canceled=true`,
    });

    res.redirect(303, session.url);
})

module.exports = checkoutRouter;