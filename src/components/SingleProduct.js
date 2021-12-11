import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../api';

const SingleProduct = ({match, history}) => {

    //which state?
    const [singleProd, setSingleProd]= useState({});
    
    
    useEffect(async () => {
        const result = await getSingleProduct(match.params.productId);
        setSingleProd(result);
    }, [])

    return (
        <div>
            
                <p>More Information for this Product</p>
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
