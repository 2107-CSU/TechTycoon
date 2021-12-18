import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../api';
import { addProductToCart, removeProductFromCart } from './functions';

const SingleProduct = ({match, history, cart, setCart}) => {

    //which state?
    const [singleProd, setSingleProd]= useState({});
    const [cartIndx, setCartIndx] = useState(-1);
    const [inCart, setInCart] = useState(false);
    
    useEffect(() => {
        async function fetchData()
        {
            const result = await getSingleProduct(match.params.productId);
            setSingleProd(result);

            const result2 = localStorage.getItem('cart');
            const cart = JSON.parse(result2);
            if(cart === null) cart = [];

            let result3 = await cart.findIndex(cartItem => cartItem.productId === parseInt(match.params.productId));
            setCartIndx(result3);

            let result4 = await result3 !== -1;
            setInCart(result4);
        }
       fetchData();

    }, [])

    return (
        <div>
            
                <p>name</p>
                <h1>{singleProd.name}</h1>

                <p>description</p>
                <p>{singleProd.description}</p>

                <p>price</p>
                <p>{singleProd.price}</p>

                <p>photo</p>
                <p>{singleProd.price}</p>

                <p>availability</p>
                <p>{singleProd.availability}</p>

                <p>quantity</p>
                <p>{singleProd.quantity}</p>

                <button
                    disabled = {inCart}
                    onClick = {() => {
                        const newCart = addProductToCart(cart, singleProd, 1);
                        setCart(newCart);
                        setCartIndx(newCart.length -1);
                        setInCart(true);
                    }}>Add product to Cart</button>

                {inCart? <button
                onClick = {() => {
                    const newCart = removeProductFromCart(cart, cartIndx);
                    setCart(newCart);
                    setInCart(false);
                }}>
                    Remove From Cart
                </button>: null}
                <button               // button to go back?
                    onClick={() => {
                        history.push('/products');  // not sure what url is?
                    }}>
                    Go Back To Products
                </button>

                
            
        </div>
    )
}

export default SingleProduct;
