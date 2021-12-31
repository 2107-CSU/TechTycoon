import React, { useState, useEffect } from 'react';
import { Card, Accordion, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { getSingleProduct, getReviews, createReview, getAllUsers } from '../api';
import { addProductToCart, removeProductFromCart } from './functions';

const SingleProduct = ({match, history, cart, setCart, token, username}) => {

    const [singleProd, setSingleProd]= useState({});
    const [cartIndx, setCartIndx] = useState(-1);
    const [inCart, setInCart] = useState(false);
    const [reviews, setReviews] = useState([]);
        const [comment, setComment] = useState("")
        const [recommendation, setRecommendation] = useState(false)

    useEffect(() => {
        async function fetchData()
        {
            const result = await getSingleProduct(match.params.productId);
            setSingleProd(result);

            const result2 = localStorage.getItem('cart');
            let cart = [];
            if(result2) {
                cart = JSON.parse(result2);
            }

            let result3 = await cart.findIndex(cartItem => cartItem.productId === parseInt(match.params.productId));
            setCartIndx(result3);

            let result4 = await result3 !== -1;
            setInCart(result4);

            const result5 = await getReviews(match.params.productId);
            if (result5) setReviews(result5);
        }
       fetchData();

    }, [])

    return (
        <div>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>{singleProd.name}</Card.Title>
                    <Card.Text>${singleProd.price}</Card.Text>
                </Card.Body>
                <Card.Img src={`/photos/${singleProd.photo}.jpg`}/>
                <Card.Text>{singleProd.description}</Card.Text>

                <Accordion>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Reviews</Accordion.Header>
                        <Accordion.Body>{reviews.map((review) => (
                            <Card>
                                {review.wouldRecommend ?
                                    <Card.Title>Would Recommend</Card.Title>
                                    :
                                    <Card.Title>Would Not Recommend</Card.Title>
                                }
                                <Card.Text>{review.date}</Card.Text>
                                <Card.Text>{review.comments}</Card.Text>
                            </Card>
                        ))}</Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey='1'>
                        <Accordion.Header>Write a Review</Accordion.Header>
                        <Accordion.Body>
                            <Form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    createReview(comment, singleProd.id, recommendation, token);
                                    const result = await getReviews(match.params.productId);
                                    if (result) setReviews(result);
                                }}
                            >
                                {['checkbox'].map((type) => (
                                    <div key={`default-${type}`} className='mb-3'>
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label='Would Recommend'
                                            value={recommendation}
                                            onChange={(e) => {setRecommendation(e.target.value)}}
                                        />
                                    </div>
                                ))}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        value={comment}
                                        onChange={(e) => {setComment(e.target.value)}} 
                                    />
                                </Form.Group>
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                
                <div className="d-grid gap-2">
                    {inCart ? 
                        <Button
                            onClick = {() => {
                                const newCart = removeProductFromCart(cart, cartIndx);
                                setCart(newCart);
                                setInCart(false);
                            }}>
                                Remove From Cart
                        </Button>
                    : 
                        <Button 
                            variant="primary"
                            onClick = {() => {
                                const newCart = addProductToCart(cart, singleProd, 1);
                                setCart(newCart);
                                setCartIndx(newCart.length -1);
                                setInCart(true);
                            }}
                        >
                                Add to cart
                        </Button>
                    }

                    <Button
                        variant="secondary"
                        onClick={() => {
                            history.push('/products'); 
                        }}
                    >
                        Back to Products
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default SingleProduct;
