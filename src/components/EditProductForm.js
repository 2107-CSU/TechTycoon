import React, { useState, useEffect } from 'react';
import { editProduct } from '../api';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const EditProductForm = ({token, products, userChange, setUserChange, showEditForm, setShowEditForm}) => {
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
        <>
        <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
            <Modal.Dialog centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <Form onSubmit={ async (event) => {
            event.preventDefault();

            const result = await editProduct(token, productId, name, description, price, photo, availability, quantity, categories);
            if (result.message === "success") {
                alert(`successfully updated!`);
                setUserChange(!userChange);
            }
        }}>
            <Form.Group className="mb-3">
                <Form.Select onChange={(event) => {

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
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control
                value={name}
                placeholder='name*'
                onChange={(event) => setName(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control
                value={description}
                placeholder='description*'
                onChange={(event) => setDescription(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
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
                <Form.Group as={Col} controlId="formGridQuantity">
                    <Form.Label>Available</Form.Label>
                        <Form.Select id='availability' onChange={(event) => setAvailability(event.target.value)}>
                            <option value={true}>yes</option>
                            <option value={false}>no</option>
                        </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Control 
                    id='category'
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
                    <Form.Select id='category-select' onChange={(event) => setSelectedCategoryIndex(event.target.value)}>
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
        </Modal.Dialog>
        </Modal>
        
        </>
    )
}

export default EditProductForm;