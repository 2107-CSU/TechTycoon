import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething, getUser, createPaymentIntent} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart, Login, Profile, SingleProduct, Products, Navigation, Admin, Category, Checkout} from './'
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);
  const [username, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
   const [clientSecret, setClientSecret] = useState("")

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = localStorage.getItem('cart');
      if(result){
        const cart = await JSON.parse(result);
        await setCart(cart);
      }
      const result2 = localStorage.getItem('username')
      if(result2) setUserName(result2);
      const {clientSecret} = await createPaymentIntent();
      setClientSecret(clientSecret);
      
      if (token) {
        const user = await getUser(token);
        setIsAdmin(user.isAdmin);
      }
    }
    fetchData();

    
  }, [token]);

  return (
  <Router>
    <div>
      <Navigation token = {token} setToken={setToken} isAdmin={isAdmin} username = {username} />
      <Route path = '/cart' render = {(routeProps) => <Cart {...routeProps} token = {token} cart = {cart} setCart = {setCart}/>}></Route>
      <Route exact path = '/products' render = {(routeProps) => <Products {...routeProps} products={products} setProducts={setProducts} cart={cart} setCart={setCart} />}></Route>
      <Route path = '/products/:productId' render = {(routeProps) => <SingleProduct {...routeProps} cart = {cart} setCart = {setCart}/>}></Route>
      <Route exact path = '/products/:category' render = {(routeProps) => <Category {...routeProps}/>}></Route>
      <Route path = '/profile' render = {(routeProps) => <Profile {...routeProps} token = {token} username = {username} setUserName = {setUserName}/>}></Route>
      <Route path = '/login' render = {(routeProps) => <Login {...routeProps} setToken={setToken} setUsername = {setUserName}/>}></Route>
      <Route path = '/register' render = {(routeProps) => <Login {...routeProps} />}></Route>
      <Route path = '/admin' render = {(routeProps) => <Admin {...routeProps} token={token}/>}></Route>
      <Route path = '/checkout' render = {() => (
      <div className="App">
        {console.log(clientSecret)}
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <Checkout />
            </Elements>
          )}
        </div> )}></Route>
    </div>
  </Router>
  );
}

export default App;