import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { makeAdmin, deleteUser, getAllUsers, updateProductAmount, getProducts, deleteProduct } from '../api';
// Bootstrap react component imports
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const ChangeQuantityForm = ({token, products, userChange, setUserChange}) => {
    const [quantity, setQuantity] = useState(products[0].quantity);
    const [productId, setProductId] = useState(products[0].id);

    useEffect( () => {

    }, [])
    return (
        <form onSubmit={ async (event) => {
            event.preventDefault();

            const result = await updateProductAmount(token, productId, quantity);
            if (result.message === 'success') { 
                alert(`${result.product.name}'s quantity was successfully updated to ${result.product.quantity}`);
                setUserChange(!userChange);
            }
        }}>
            <h3>Change Quantity of Product</h3>
            <select onChange={(event) => {
                setProductId(products[event.target.value].id)
                setQuantity(products[event.target.value].quantity);
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
            type='number'
            placeholder='quantity'
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)} />
            <input type='submit' />
        </form>
    )
}



const DeleteProductForm = ({token, products, userChange, setUserChange}) => {
    const [productId, setProductId] = useState(products[0].id);

    useEffect( () => {

    }, [products])
    return (
        <form onSubmit={ async (event) => {
            event.preventDefault();

            const result = await deleteProduct(token, productId);
            if (!result.error) { 
                alert(result.message);
                setUserChange(!userChange);
            }

        }} >
            <h3>Delete a Product</h3>
            <select onChange={(event) => {
                setProductId(products[event.target.value].id);
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
            <input type='submit' />
        </form>
    )
}

const Admin = ({token}) => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [userChange, setUserChange] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            const allUsers = await getAllUsers(token);
            const products = await getProducts();

            setProducts(products);
            setUsers(allUsers);
            
            // setting initial id so it isn't null
            const nonAdminUsers = allUsers.filter((user) => !user.isAdmin);

            if (nonAdminUsers.length) setEditUserId(nonAdminUsers[0].id);
            if (allUsers.length) setDeleteUserId(allUsers[0].id);
          }
          fetchData();
    }, [userChange])

    return (
        <>
            <div>
                <h3>Make user admin</h3>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    
                    const result = await makeAdmin(token, editUserId);
                    if(result.isAdmin) {
                        setUserChange(!userChange);
                        alert(`user ${result.username} is now an admin.`);
                    }
                }}>
                    <label htmlFor='users'>Choose User:</label>
                    <select id='users' onChange={(event) => setEditUserId(event.target.value)}>
                        {users?
                            users.map((user, index) => {
                                return (
                                    !user.isAdmin?
                                    <option 
                                    key={index}
                                    value={user.id} >{user.username}</option>
                                    :
                                    null
                                )
                            })
                            :
                            null
                        }
                    </select>
                    <input type='submit'/>
                </form>
            </div>
            <div>
            <h3>Delete User</h3>
            <form onSubmit={async (event) => {
                event.preventDefault();
                
                const result = await deleteUser(token, deleteUserId);
                console.log(result);
                if (result.message === 'success') {
                    setUserChange(!userChange);
                    alert(`user ${result.user.username} was deleted successfully!`);
                }
            }}>
                <label htmlFor='users'>Choose User:</label>
                <select id='users' onChange={(event) => setDeleteUserId(event.target.value)}>
                    {users?
                        users.map((user, index) => {
                            return (
                                <option 
                                key={index}
                                value={user.id} >{user.username}</option>
                            )
                        })
                        :
                        null
                    }
                </select>
                <input type='submit'/>
            </form>
        </div>
        <AddProductForm token={token} setUserChange={setUserChange} userChange={userChange}/>
        {products.length?
            <>
            <ChangeQuantityForm token={token} products={products} setUserChange={setUserChange} userChange={userChange} />
            <EditProductForm token={token} products={products} setUserChange={setUserChange} userChange={userChange} />
            <DeleteProductForm token={token} products={products} setUserChange={setUserChange} userChange={userChange} />
            </>
            :
            null
        }
    </>
    )
}

export default Admin;