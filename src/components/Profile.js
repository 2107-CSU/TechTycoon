import React, {useState, useEffect} from "react";
import { getOrdersByUser, getProductsByOrder } from "../api";

const Profile = ({token}) => {
    const [orders, setOrders] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          if(token){
            const orders = await getOrdersByUser(token);
            console.log(orders);
            await setOrders(orders);
            const allOrderProducts = await Promise.all(orders.map(order => getProductsByOrder(token, order.id)));
            console.log(allOrderProducts);
            setOrderProducts(allOrderProducts);
          }
        }
        fetchData();
          
      }, []);
    
    return <div>
            <h1> Profile </h1>
            {token ? 
            <div>
                <h2>Orders: </h2>
                {orders.map((order, indx) => {
                    return<div key = {indx}>
                        <h3>Order {indx} created {order.date}</h3>
                        <h4>Products: </h4>
                        {orderProducts.length === orders.length ? <div>
                        {orderProducts[indx].map((product, indx) => {
                            return<div key = {indx}>
                                <h5>{product.name}</h5>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        })} </div> : null}
                    </div>
                })}
            </div>:null}
        </div>
}

export default Profile;