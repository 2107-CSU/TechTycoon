import React, { useState, useEffect } from 'react';
import { getProducts, getPhotos } from '../api/products';
import { addProductToCart } from './functions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getCategories, getProductsByCategory } from '../api';
import Container from 'react-bootstrap/esm/Container';
// import { Dropdown, InputGroup, FormControl, DropdownButton } from 'react-bootstrap';


const Search = ({setProducts, getProducts}) => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    useEffect(() => {
        async function result(){ 
            const response = await getCategories(); 
            setCategories(response);
            let response2;
            if(category === "all") response2 = await getProducts();
            else response2 = await getProductsByCategory(category);
            const newProducts = response2.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLocaleLowerCase().includes(searchTerm.toLowerCase()) );
            setProducts(newProducts);

        }
        result()
    }, [searchTerm, category])

   return <nav className ="navbar navbar-light bg-light full">
  <form  id = "searchForm">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange = { async (event) => {
        const value = event.target.value;
        setSearchTerm(value)
        }}/>
    <label htmlFor="categories">Category:</label>
    <select name="categories" onChange = { (event) => {
        const value = event.target.value;
        console.log(value);
        setCategory(value);  
    }

    }>
        <option value = "all">All</option>
        {categories.map((category) => {
           return <option key = {category.id} value = {category.name}>{category.name}</option>
        })}
    </select>
    <Button variant="outline-secondary" className = "long" onClick = {async () => {
       const newProducts = await getProducts();
       setProducts(newProducts);
       document.getElementById("searchForm").reset();
       
    }}> Remove Filters</Button>{' '}
    </form>
</nav>
}


const Products = ({products, setProducts, cart, setCart}) => {  
    
    useEffect(() => {
        async function result(){ 
          
        }
        result()
    }, [])

    return (
        <div>
            <h1 className = "title">Products</h1>
            <Search products = {products} setProducts = {setProducts} getProducts = {getProducts}/>
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
                                        type="button" className ="btn btn-outline-primary btn-circle btn-md"
                                    >
                                        <i className ="fas fa-cart-plus fa-lg"></i>
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