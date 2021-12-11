import React, { useState, useEffect } from 'react';
import {getSingleProduct, getSomething} from '../api'

const App = () => {
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState({});

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });

      getSingleProduct(3).then(response => {
        setProduct(response)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
      <h2>{product.name}</h2>
    </div>
  );
}

export default App;