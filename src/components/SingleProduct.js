import React, { useState, useEffect } from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { getSingleProduct, getReviews } from '../api';
import { addProductToCart, removeProductFromCart } from './functions';

const SingleProduct = ({match, history, cart, setCart}) => {

    const [singleProd, setSingleProd]= useState({});
    const [cartIndx, setCartIndx] = useState(-1);
    const [inCart, setInCart] = useState(false);
    const [reviews, setReviews] = useState([]);

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
                    <Accordion.Item>
                        <Accordion.Header>Reviews</Accordion.Header>
                        <Accordion.Body>{reviews.map((review) => (
                            <Card>
                                <Card.Title>{review.date}</Card.Title>
                                <Card.Text>{review.comments}</Card.Text>
                            </Card>
                        ))}</Accordion.Body>
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
