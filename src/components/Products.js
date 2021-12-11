import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/products'

const Products = ({products, setProducts}) => {

    //const [products, setProducts]= useState([]);    
    
    useEffect(() => {
        async function result(){ 
            const response = await getProducts(); 
            setProducts(response)
        }
        result()
    }, [])

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map(product => (
                    <article key={product.id}>
                        <Link to={'/products/' + product.id}>{product.name}</Link>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </article>
                ))}    
            </div>           
        </div>
    )
}

export default Products;