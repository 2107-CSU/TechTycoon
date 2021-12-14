import React, {useState, useEffect} from "react";
import { getOrdersByUser } from "../api";

const Profile = ({token}) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          if(token){
            const orders = await getOrdersByUser(token);
            setOrders(orders);
          }
        }
        fetchData();
          
      }, []);
    
    return <div>
            <h1> Profile </h1>
            {token ? 
            <div>
                {orders.map((order, indx) => {
                    return<div key = {indx}>
                        <h3>{order.id}</h3>
                    </div>
                })}
            </div>:null}
        </div>
}

export default Profile;