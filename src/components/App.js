import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart, Login, Profile, SingleProduct, Products, Navigation} from './'

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
  }, []);

  return (
  <Router>
    <div>
      <Navigation />
      <Route path = '/cart' render = {(routeProps) => <Cart {...routeProps} />}></Route>
      <Route exact path = '/products' render = {(routeProps) => <Products {...routeProps} products={products} setProducts={setProducts} />}></Route>
      <Route path = '/products/:productId' render = {(routeProps) => <SingleProduct {...routeProps} />}></Route>
      <Route path = '/profile' render = {(routeProps) => <Profile {...routeProps} />}></Route>
      <Route path = '/login' render = {(routeProps) => <Login {...routeProps} />}></Route>
      <Route path = '/register' render = {(routeProps) => <Login {...routeProps} />}></Route>
      
    </div>
  </Router>
  );
}

export default App;