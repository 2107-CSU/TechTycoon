import React, { useState, useEffect } from 'react';
import { getProducts, getPhotos } from '../api/products';
import { addProductToCart } from './functions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/esm/Container';

const Search = () => {
   return <nav className ="navbar navbar-light bg-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
</nav>
}


const Products = ({products, setProducts, cart, setCart}) => {  
    
    useEffect(() => {
        async function result(){ 
            const response = await getProducts(); 
            setProducts(response)
        }
        result()
    }, [])

    return (
        <div>
            <Row xs={1} md={2} className="g-4">
                {products.map((product, indx )=> (
                    <Col key = {indx}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>{product.categories}</Card.Header>
                            <Card.Img src={`photos/${product.photo}.jpg`} variant='top'/>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>${product.price}</Card.Text>
                                <Container>
                                    <Row >
                                    <Col md="auto"><Button href={`/products/${product.id}`}>See Details</Button></Col>
                                    <Col xs={1}></Col>
                                    <Col xs lg="2"><button 
                                        onClick = {() => {
                                            const newCart = addProductToCart(cart, product, 1);
                                            console.log(newCart);
                                            setCart(newCart);
                                        }}
                                        type="button" class="btn btn-outline-primary btn-circle btn-md"
                                    >
                                        <i class="fas fa-cart-plus fa-lg"></i>
                                    </button></Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}    
            </Row>           
        </div>
    )
}

export default Products;