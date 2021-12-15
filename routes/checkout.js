const express = require('express');
const checkoutRouter = express.Router();
const getAllProductsByOrderId = require('../db')

checkoutRouter.post('/:orderId/create-checkout-session', async (req, res, next) => {
    const orderId = req.params.orderId
    const products = getAllProductsByOrderId(orderId)

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
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
            success_url: `${PORT}/?success=true`,
            cancel_url: `${PORT}/?canceled=true`,
        });
    
        res.redirect(303, session.url);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = checkoutRouter;