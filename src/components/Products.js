import React, { useState, useEffect } from 'react';
import { getProducts, getPhotos } from '../api/products';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Products = ({products, setProducts}) => {  
    
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
                {products.map(product => (
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>{product.categories}</Card.Header>
                            <Card.Img src={`photos/${product.photo}.jpg`} variant='top'/>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>${product.price}</Card.Text>
                                <Button href={`/products/${product.id}`}>See Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}    
            </Row>           
        </div>
    )
}

export default Products;