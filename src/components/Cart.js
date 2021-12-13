import React, {useState, useEffect} from "react";
import { getCart, getProductsByOrder } from "../api";

const Cart = ({token}) => {
    const [cart, setCart] = useState({});
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        getCart(token)
        .then(response => {
          setCart(response);
          return getProductsByOrder(token, response.id);
        }).then(response2 => {
            setOrderProducts(response2);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
    return <div>
       <h1> Cart </h1> 
       {orderProducts.map((orderProduct, indx) => {
           return <div key = {indx}> 
                <h3>{orderProduct.name}</h3>
                <p>{orderProduct.description}</p>
                <p>price: {orderProduct.price}</p>
           </div>
       })}
    </div>
    
}

export default Cart;