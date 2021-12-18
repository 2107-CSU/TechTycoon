import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart, Login, Profile, SingleProduct, Products, Navigation, Admin} from './'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);

  useEffect(() => {
  }, []);

  return (
  <Router>
    <div>
      <Navigation token = {token} setToken={setToken}/>
      <Route path = '/cart' render = {(routeProps) => <Cart {...routeProps} token = {token} cart = {cart} setCart = {setCart}/>}></Route>
      <Route exact path = '/products' render = {(routeProps) => <Products {...routeProps} products={products} setProducts={setProducts} />}></Route>
      <Route path = '/products/:productId' render = {(routeProps) => <SingleProduct {...routeProps} cart = {cart} setCart = {setCart}/>}></Route>
      <Route path = '/profile' render = {(routeProps) => <Profile {...routeProps} token = {token} />}></Route>
      <Route path = '/login' render = {(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
      <Route path = '/register' render = {(routeProps) => <Login {...routeProps} />}></Route>
      
    </div>
  </Router>
  );
}

export default App;