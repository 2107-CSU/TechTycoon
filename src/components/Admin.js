import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { makeAdmin, deleteUser, getAllUsers, updateProductAmount, getProducts, deleteProduct } from '../api';
// Bootstrap react component imports
//import DropdownButton from 'react-bootstrap/DropdownButton'
//import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const ChangeQuantityForm = ({token, products, userChange, setUserChange}) => {
    const [quantity, setQuantity] = useState(products[0].quantity);
    const [productId, setProductId] = useState(products[0].id);

    useEffect( () => {

    }, [])
    return (
        <Form onSubmit={ async (event) => {
            event.preventDefault();

            const result = await updateProductAmount(token, productId, quantity);
            if (result.message === 'success') { 
                alert(`${result.product.name}'s quantity was successfully updated to ${result.product.quantity}`);
                setUserChange(!userChange);
            }
        }}>
            <Row>
                <Form.Group as={Col} controlId="fromGridSelectQuantityProduct">
                    <Form.Select onChange={(event) => {
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
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="fromGridInputQuantityProduct">
                    <Form.Control 
                    type='number'
                    placeholder='quantity'
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="fromGridSubmitQuantityProduct">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Row>   
        </Form>
    )
}



const DeleteProductForm = ({token, products, userChange, setUserChange}) => {
    const [productId, setProductId] = useState(products[0].id);

    useEffect( () => {

    }, [products])
    return (
        <Form onSubmit={ async (event) => {
            event.preventDefault();

            const result = await deleteProduct(token, productId);
            if (!result.error) { 
                alert(result.message);
                setUserChange(!userChange);
            }

        }} >
            <Row>
                <Form.Group as={Col} controlId="fromGridSelectProductDelete">
                    <Form.Select onChange={(event) => {
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
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="fromGridSubmitProductDelete">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    )
}

const Admin = ({token}) => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [userChange, setUserChange] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [products, setProducts] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

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
        <div className='center'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Make A User an Admin</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={async (event) => {
                        event.preventDefault();
                        
                        const result = await makeAdmin(token, editUserId);
                        if(result.isAdmin) {
                            setUserChange(!userChange);
                            alert(`user ${result.username} is now an admin.`);
                        }
                        }}>
                            <Row>
                                <Form.Group as={Col} controlId='formGridSelectUserAdmin' >
                                    <Form.Select id='users' onChange={(event) => setEditUserId(event.target.value)}>
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
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId='formGridSubmitUserAdmin' >
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Delete A User</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={async (event) => {
                        event.preventDefault();
                        
                        const result = await deleteUser(token, deleteUserId);
                        console.log(result);
                        if (result.message === 'success') {
                            setUserChange(!userChange);
                            alert(`user ${result.user.username} was deleted successfully!`);
                        }
                        }}>
                            <Row>
                                <Form.Group as={Col} controlId='formGridSelectUserDelete'>
                                    <Form.Select id='users' onChange={(event) => setDeleteUserId(event.target.value)}>
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
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId='formGridSubmitUserDelete'>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Row>  
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                {products.length?
                    <>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Change A Products Quantitiy</Accordion.Header>
                            <Accordion.Body>
                                <ChangeQuantityForm token={token} products={products} setUserChange={setUserChange} userChange={userChange} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Delete A Product</Accordion.Header>
                            <Accordion.Body>
                                <DeleteProductForm token={token} products={products} setUserChange={setUserChange} userChange={userChange} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </>
                    :
                    null
                }
            </Accordion>           
        {products.length?
            <>
            <div className='center'>
                <Button className='admin-buttons' size="lg" variant="primary" onClick={() => setShowAddForm(true)}>
                Add a Product
                </Button>
                <Button className='admin-buttons' size="lg" variant="primary" onClick={() => setShowEditForm(true)}>
                Edit a Product
                </Button>
            </div>                       
            <AddProductForm token={token} setUserChange={setUserChange} userChange={userChange} showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
            <EditProductForm token={token} products={products} setUserChange={setUserChange} userChange={userChange} showEditForm={showEditForm} setShowEditForm={setShowEditForm} />
            
            </>
            :
            null
        }
    </div>
    )
}

export default Admin;