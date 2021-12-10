import React, { useState, useEffect } from 'react';
import {getSingleProduct} from '../api'

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSingleProduct()
      .then(response => {
        setMessage(response);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
  );
}

export default App;