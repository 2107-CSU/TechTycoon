import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { getSingleProduct, getReviews } from '../api';
import { addProductToCart, removeProductFromCart } from './functions';

const SingleProduct = ({match, history, cart, setCart}) => {

    //which state?
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
            console.log("use effect reviews", result5);
            console.log("the match.params.product", match.params.productId);
            if (result5 ){
                setReviews(result5) };
        }
       fetchData();

    }, [])

    return (
        <div> {"the single product", console.log(singleProd)}
            <Card>
                <Card.Img variant="top" src={`/photos/${singleProd.photo}.jpg`}/>

                <Card.Body>
                    <Card.Title>Photo</Card.Title>

                    <Card.Text>Description
                    <p>{singleProd.description}</p></Card.Text>
                </Card.Body>
                
                <ListGroup className='list-group-flush'>
                    <h1>{singleProd.name}</h1>

                    <p>price</p>
                    <p>{singleProd.price}</p>
                
                    <p>availability</p>
                    <p>{singleProd.availability}</p>

                    <p>quantity</p>
                    <p>{singleProd.quantity}</p>
                </ListGroup>
                
                <Card.Body>
                    {console.log(reviews)}
                    <p>reviews</p>
                    <p>{reviews.map( (review) => <div><p>{review.comments}</p>
                                                            <p>{review.date}</p></div> )}</p>
                </Card.Body>
            </Card>


                <Button variant='success'
                    disabled = {inCart}
                    onClick = {() => {
                        const newCart = addProductToCart(cart, singleProd, 1);
                        setCart(newCart);
                        setCartIndx(newCart.length -1);
                        setInCart(true);
                    }}>Add product to Cart</Button>

                {inCart? <Button variant='danger'
                onClick = {() => {
                    const newCart = removeProductFromCart(cart, cartIndx);
                    setCart(newCart);
                    setInCart(false);
                }}>
                    Remove From Cart
                </Button>: null}

                <Button variant='primary'              // button to go back?
                    onClick={() => {
                        history.push('/products');  // not sure if this url works
                    }}>
                    Go Back To Products List
                </Button>

                
            
        </div>
    )
}

export default SingleProduct;
