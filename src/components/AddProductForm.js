import React, { useState, useEffect } from 'react';
import { addProduct } from '../api';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const AddProductForm = ({token, userChange, setUserChange, setShowAddForm, showAddForm}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(undefined);
    const [photo, setPhoto] = useState('');
    const [availability, setAvailability] = useState(true);
    const [quantity, setQuantity] = useState(undefined);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

    return (
        <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={async (event) => {
                    event.preventDefault();

                    const result = await addProduct(token, name, description, price, photo, availability, quantity, categories);
                    if (result.message === 'success') { 
                        alert('New product added successfully!');
                        setUserChange(!userChange);
                    }
                    else alert('Failed to add product, please try again!');
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        value={name}
                        placeholder='name*'
                        onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        value={description}
                        placeholder='description*'
                        onChange={(event) => setDescription(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Photo Name</Form.Label>
                        <Form.Control
                        value={photo}
                        placeholder='photo file name*'
                        onChange={(event) => setPhoto(event.target.value)} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                            type='number'
                            value={price}
                            placeholder='price*'
                            onChange={(event) => setPrice(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                            type='number'
                            value={quantity}
                            placeholder='quantity*'
                            onChange={(event) => setQuantity(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAvailability">
                            <Form.Label>Available </Form.Label>
                            <Form.Select onChange={(event) => setAvailability(event.target.value)}>
                                <option value={true}>yes</option>
                                <option value={false}>no</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Control 
                            value={category}
                            placeholder='category*'
                            onChange={(event) => setCategory(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCategoryAdd">
                            <Button variant='outline-success' 
                            onClick={() => {
                                categories.push(category);
                                setCategory('');

                            }} >Add Category</Button>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCategorySelect">
                            <Form.Select onChange={(event) => setSelectedCategoryIndex(event.target.value)}>
                            {
                                categories.map((ctg, idx) => {
                                    return (
                                        <option key={idx} value={idx}>{ctg}</option>
                                    )
                                })
                            }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCategoryDelete">
                            <Button variant='outline-danger'
                            onClick={() => {
                            categories.splice(selectedCategoryIndex, 1);
                            //console.log(categories.length); running into an issue when removing all the categories starting from the first category
                            if (selectedCategoryIndex === 0) setSelectedCategoryIndex(1);
                            else setSelectedCategoryIndex(0);
                            }} >Remove Category</Button>
                        </Form.Group>
                    </Row>
                    
                    
                    
                    
                    
                    <ListGroup>
                                <p className = "inline">Categories: </p>
                                {categories.map((category, indx) => {
                                    return<ListGroup.Item className = "inline" key = {indx}> {category} </ListGroup.Item>
                                })}
                            </ListGroup>
                        <Modal.Footer><Button variant="primary" type='submit'>Submit</Button></Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddProductForm;