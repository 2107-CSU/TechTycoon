import React, { useState, useEffect } from 'react';
import { addProduct } from '../api';
const AddProductForm = ({token, userChange, setUserChange}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(undefined);
    const [photo, setPhoto] = useState('');
    const [availability, setAvailability] = useState(true);
    const [quantity, setQuantity] = useState(undefined);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    return (
        <div id='add-product'>
            <h3>Add New Product</h3>
            <form onSubmit={async (event) => {
                event.preventDefault();

                const result = await addProduct(token, name, description, price, photo, availability, quantity, categories);
                if (result.message === 'success') { 
                    alert('New product added successfully!');
                    setUserChange(!userChange);
                }
                else alert('Failed to add product, please try again!');
            }}>
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
                    <button type='button'
                    onClick={() => {
                        setCategories([]);
                    }} >Reset Categories</button>
                <input type='submit' />
            </form>
        </div>
    )
}

export default AddProductForm;