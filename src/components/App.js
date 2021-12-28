import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart, Login, Profile, SingleProduct, Products, Navigation, Category} from './'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = localStorage.getItem('cart');
      if(result){
        const cart = await JSON.parse(result);
        await setCart(cart);
      }

      const result2 = localStorage.getItem('username')
      if(result2) setUserName(result2);
    }
    fetchData();
  }, []);

  return (
  <Router>
    <div>
      <Navigation token = {token} setToken={setToken} username = {username}/>
      <Route path = '/cart' render = {(routeProps) => <Cart {...routeProps} token = {token} cart = {cart} setCart = {setCart}/>}></Route>
      <Route exact path = '/products' render = {(routeProps) => <Products {...routeProps} products={products} setProducts={setProducts} cart={cart} setCart={setCart} />}></Route>
      <Route path = '/products/:productId' render = {(routeProps) => <SingleProduct {...routeProps} cart = {cart} setCart = {setCart}/>}></Route>
      <Route exact path = '/products/:category' render = {(routeProps) => <Category {...routeProps}/>}></Route>
      <Route path = '/profile' render = {(routeProps) => <Profile {...routeProps} token = {token} username = {username} setUserName = {setUserName}/>}></Route>
      <Route path = '/login' render = {(routeProps) => <Login {...routeProps} setToken={setToken} setUsername = {setUserName}/>}></Route>
      <Route path = '/register' render = {(routeProps) => <Login {...routeProps} />}></Route>
      
    </div>
  </Router>
  );
}

export default App;