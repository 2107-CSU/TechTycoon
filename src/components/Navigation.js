import React, {useState, useEffect} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


const Navigation = ({token, setToken}) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand className="navbar-brand">Tech Tycoons</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href='/profile'>{localStorage.getItem("username")}</a>
                    </Navbar.Text>
                    <Nav className="me-auto">
                        <Nav.Link href='/cart' >Cart</Nav.Link>
                        <NavDropdown title="Store" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/products">All Products</NavDropdown.Item>
                        </NavDropdown>
                        {!!token ? 
                        <Nav.Link href='/profile' >Profile</Nav.Link> : 
                        <Nav.Link href='/login' >Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;