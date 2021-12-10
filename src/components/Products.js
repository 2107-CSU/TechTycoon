import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../db/index'; // is this the route?

const Products = () => {

    const [products, setProducts]= useState([]);    
    
    useEffect(async () => {
        const result = await getAllProducts(id);
        setProducts(result);
    }, [])

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map(product => (
                    <article key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </article>
                ))}    
            </div>           
        </div>
    )
}

export default Products;