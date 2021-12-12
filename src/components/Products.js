import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getPhotos } from '../api/products'


const Products = ({products, setProducts}) => {

    const [photos, setPhotos]= useState([]);    
    
    useEffect(() => {
        async function result(){ 
            const response = await getProducts(); 
            setProducts(response)

            const photo = await getPhotos(1)
            setPhotos(photo)
        }
        result()
    }, [])

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map(product => (
                    <article key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img src={`../../public/photos/${product.photo}.jpg`} />
                        <button>Add to Cart</button>
                    </article>
                ))}    
            </div>           
        </div>
    )
}

export default Products;