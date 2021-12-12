import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart, Login, Profile, SingleProduct} from './'

const App = () => {
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
  }, []);

  return (
  <Router>
    <div>
      <Route path = '/cart' render = {(routeProps) => <Cart {...routeProps} token = {token}/>}></Route>
      <Route exact path = '/products' render = {(routeProps) => <Cart {...routeProps} />}></Route>
      <Route path = '/products/:productId' render = {(routeProps) => <SingleProduct {...routeProps} />}></Route>
      <Route path = '/profile' render = {(routeProps) => <Profile {...routeProps} />}></Route>
      <Route path = '/login' render = {(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
      <Route path = '/register' render = {(routeProps) => <Login {...routeProps} />}></Route>
      
    </div>
  </Router>
  );
}

export default App;