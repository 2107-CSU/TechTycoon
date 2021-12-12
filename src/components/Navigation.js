import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Navigation = ({token}) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <h1 class="navbar-brand">Tech Tycoons</h1>
            <div>
                <ul class="navbar-nav">
                    <li class="nav-item"><Link to='/cart' class="nav-link">Cart</Link></li>
                    <li class="active" class="nav-item active"><Link to='/products' class="nav-link">Products</Link></li>
                    {!!token ? 
                    <li class="nav-item"><Link to='/profile' class="nav-link">Profile</Link></li> : 
                    <li class="nav-item"><Link to='/login' class="nav-link">Login</Link></li>}
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;