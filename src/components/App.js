import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Cart} from './'

const App = () => {
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({});

  useEffect(() => {
  }, []);

  return (
  <Router>
    <div>
      <Route path = '/cart' render = {(routeProps) => <Cart {...routeProps} />}></Route>
    </div>
  </Router>
  );
}

export default App;