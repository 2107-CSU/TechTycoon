import React, {useState, useEffect} from "react";
import { getOrdersByUser, getProductsByOrder } from "../api";
import { calculateOrderPrice, convertDate } from "./functions";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Profile = ({token}) => {

    const [orders, setOrders] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          if(token){
            const orders = await getOrdersByUser(token);
            console.log(orders);
            await setOrders(orders.reverse());
            const allOrderProducts = await Promise.all(orders.map(order => getProductsByOrder(token, order.id)));
            console.log(allOrderProducts);
            setOrderProducts(allOrderProducts);
          }
        }
        fetchData();
          
      }, []);
    
    return <div>
            <h1> Profile </h1>
            <Row xs={1} md={2} className="g-4">
            {token ? 
            <div>
                <h2>Order History: </h2>
                {orders.map((order, indx) => {
                    return<Col key = {indx}>
                        <Card className = "orderCard">
                        <Card.Title>Order {orders.length - indx}</Card.Title>
                        <Card.Subtitle>Created {convertDate(order.date)}</Card.Subtitle>
                        {orderProducts[indx] ? <Card.Text>Order Price: ${calculateOrderPrice(orderProducts[indx])}</Card.Text> : null}
                        <Card.Text>Products: </Card.Text>
                        <ListGroup className="list-group-flush">
                        {orderProducts.length === orders.length ? <div>
                        {orderProducts[indx].map((product, indx) => {
                            return<ListGroupItem key = {indx}>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Quantity: {product.quantity}</Card.Text>
                            </ListGroupItem>
                        })} </div> : null}
                        </ListGroup>
                        </Card>
                    </Col>
                })}
            </div>:null}
            </Row>
        </div>
}

export default Profile;