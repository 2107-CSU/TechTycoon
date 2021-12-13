const stripe = require('stripe')('sk_test_51K6JdyKsoRJpj5Ly0qKVmvtqcoYuX2UikVo2H5GuX72P04ATDEl6aPf1c50gQwcT5roqqY8oGCuGIPkVuosUXI0c00VkqpNK9P')
const express = require('express');
const checkoutRouter = express.Router();

const BaseUrl = "http://localhost:5000"

checkoutRouter.post('/create-checkout-session', async (req, res, next) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: '{{PRICE_ID}}',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${BaseUrl}/?success=true`,
        cancel_url: `${BaseUrl}?canceled=true`,
    });

    res.redirect(303, session.url);
})

module.exports = checkoutRouter;