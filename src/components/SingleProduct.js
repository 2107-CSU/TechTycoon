import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../api';
import { addProductToCart } from './functions';

const SingleProduct = ({match, history, cart, setCart}) => {

    //which state?
    const [singleProd, setSingleProd]= useState({});
    
    
    useEffect(async () => {
        const result = await getSingleProduct(match.params.productId);
        setSingleProd(result);
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
                    onClick = {() => {
                        console.log(cart);
                        const newCart = addProductToCart(cart, singleProd, 1);
                        console.log(newCart);
                        setCart(newCart);
                    }}>Add product to Cart</button>

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
