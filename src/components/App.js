import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart, Login, Profile, SingleProduct, Products, Navigation, Checkout} from './'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51K6JdyKsoRJpj5LyBuDfgXdryocGnfkLuxrRm12ZQhsPuWAjlcnpGJPPimIgVfwDeZ0Nl4WfX5970NH6dgI4whq600h4VIo3dH');

const App = () => {
  const options = {
    clientSecret: 'sk_test_51K6JdyKsoRJpj5Ly0qKVmvtqcoYuX2UikVo2H5GuX72P04ATDEl6aPf1c50gQwcT5roqqY8oGCuGIPkVuosUXI0c00VkqpNK9P'
  }
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
      
      <Elements stripe={stripePromise} options={options}>
        <Route path = '/checkout' render = {(routeProps) => <Checkout {...routeProps} cart={cart} />}></Route>
      </Elements>
    </div>
  </Router>
  );
}

export default App;