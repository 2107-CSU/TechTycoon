import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Navigation = ({token, setToken}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h1 className="navbar-brand">Tech Tycoons</h1>
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to='/cart' className="nav-link">Cart</Link></li>
                    <li className="active" className="nav-item active"><Link to='/products' className="nav-link">Products</Link></li>
                    {!!token ? 
                    <>
                    <li className="nav-item"><Link to='/profile' className="nav-link">Profile</Link></li> 
                    <li className="nav-item">
                        <Link 
                            to='/login' 
                            className="nav-link"
                            onClick={() => {
                                setToken('');
                                localStorage.removeItem('token');
                            }}
                        >Logout</Link> 
                    </li>
                    </>
                    : 
                    <li className="nav-item"><Link to='/login' className="nav-link">Login</Link></li>}
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;