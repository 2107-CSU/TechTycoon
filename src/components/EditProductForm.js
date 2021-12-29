import React, { useState, useEffect } from 'react';
import { editProduct } from '../api';

const EditProductForm = ({token, products, userChange, setUserChange}) => {
    const [productId, setProductId] = useState(products[0].id);
    const [name, setName] = useState(products[0].name);
    const [description, setDescription] = useState(products[0].description);
    const [price, setPrice] = useState(products[0].price);
    const [photo, setPhoto] = useState(products[0].photo);
    const [availability, setAvailability] = useState(true);
    const [quantity, setQuantity] = useState(products[0].quantity);
    const [categories, setCategories] = useState(products[0].categories);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [category, setCategory] = useState('');
    //const [productIndex, setProductIndex] = useState(0);
    return (
        <form onSubmit={ async (event) => {
            event.preventDefault();

            const result = await editProduct(token, productId, name, description, price, photo, availability, quantity, categories);
            if (result.message === "success") {
                alert(`successfully updated!`);
                setUserChange(!userChange);
            }
        }}>
            <h3>Edit Product</h3>
            <select onChange={(event) => {

                // This changes the values held most of the edit forms inputs
                setProductId(products[event.target.value].id)
                setName(products[event.target.value].name)
                setDescription(products[event.target.value].description)
                setPrice(products[event.target.value].price)
                setPhoto(products[event.target.value].photo)
                setQuantity(products[event.target.value].quantity)
                setCategories(products[event.target.value].categories);
                //setProductIndex(event.target.value);
                setSelectedCategoryIndex(0);
                }}>
                {products.length?
                    products.map((product, idx) => {
                        return (
                            <option 
                            key={idx}
                            value={idx} >
                                {product.name}
                            </option>
                        )
                    })
                    :
                    null
                }
            </select>
            <input
            value={name}
            placeholder='name*'
            onChange={(event) => setName(event.target.value)} />
            <input
            value={description}
            placeholder='description*'
            onChange={(event) => setDescription(event.target.value)} />
            <input
            type='number'
            value={price}
            placeholder='price*'
            onChange={(event) => setPrice(event.target.value)} />
            <input
            value={photo}
            placeholder='photo file name*'
            onChange={(event) => setPhoto(event.target.value)} />
            <input
            type='number'
            value={quantity}
            placeholder='quantity*'
            onChange={(event) => setQuantity(event.target.value)} />
            <label htmlFor='availability'>available: </label>
            <select id='availability' onChange={(event) => setAvailability(event.target.value)}>
                <option value={true}>yes</option>
                <option value={false}>no</option>
            </select>
            <div>
                <p className = "inline">Categories: </p>
                {categories.map((category, indx) => {
                    return<p className = "inline" key = {indx}> {category} </p>
                })}
            </div>
            <input 
            id='category'
            value={category}
            placeholder='category*'
            onChange={(event) => setCategory(event.target.value)}
            />
            <button type='button' 
            onClick={() => {
                categories.push(category);
                setCategory('');

            }} >Add Category</button>
            <select id='category-select' onChange={(event) => setSelectedCategoryIndex(event.target.value)}>
                {
                    categories.map((ctg, idx) => {
                        return (
                            <option key={idx} value={idx}>{ctg}</option>
                        )
                    })
                }
            </select>
            <button type='button'
            onClick={() => {
                categories.splice(selectedCategoryIndex, 1);
                if (selectedCategoryIndex === 0) setSelectedCategoryIndex(1);
                else setSelectedCategoryIndex(0);
            }} >Remove Category</button>
            <input type='submit'/>
        </form>
    )
}

export default EditProductForm;