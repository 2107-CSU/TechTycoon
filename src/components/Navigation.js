import React, {useState, useEffect} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const Navigation = ({token, setToken}) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand className="navbar-brand">Tech Tycoons</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/cart' >Cart</Nav.Link>
                        <Nav.Link href='/products' >Products</Nav.Link>
                        {!!token ? 
                        <>
                        <Nav.Link href='/profile' >Profile</Nav.Link>
                        <Nav.Link href='/login' 
                        onClick={() => {
                            setToken('');
                            localStorage.removeItem('token');
                        }}>Logout</Nav.Link> 
                        </>
                        : 
                        <Nav.Link href='/login' >Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;