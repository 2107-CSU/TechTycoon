import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
)

const Checkout = ({token, setToken}) => {
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        const query = new URLSearchParams(window.location.search)

        if(query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.")
        }

        if(query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            )
        }
    }, [])
    
    return message ? (
        <Message message={message} />
    ) : (
        <Products />
    )
}

export default Checkout;