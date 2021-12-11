import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return <div>
        <Link to='/cart'>Cart</Link>
        <Link to='/products'>Products</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/login'>Login</Link>
    </div>
}

export default Navigation;