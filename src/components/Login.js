import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {login, register, getUser, checkUser} from '../api/index';

const Login = ({match, history, setToken, setUserName}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [available, setAvailable] = useState('false');

    return (
        <>
            {match.url === '/login'?
                <h1 className = "title" >Login</h1>
                :
                <h1 className = "title">Register</h1>
            }
            <form 
            onSubmit={async (event) => {
                event.preventDefault();

                if (match.url === '/register') {
                    // check password and confirm password
                    if (password !== confirmPassword) {
                        alert('password and confirm password must match');
                        return;
                    }

                    // attempting to register the user
                    const result = await register(username, password, email);

                    // lets the user know if their password is too short
                    if (result.error) alert(result.message);
                    else {

                        // notify user of successful login and bring them to the login page
                        alert('registered successfully please login to continue');
                        history.push('/login');
                    }
                } else {
                    // attempting to log the user in
                    const result = await login(username, password);

                    if (result.error) alert(result.message); // error message(incorrect or missing info)
                    else {
                        // successful login
                        setToken(result.token);
                        console.log(result);
                        localStorage.setItem('token', result.token);
                        const {username} = await getUser(result.token);
                        await setUsername(username);
                        await localStorage.setItem('username', username)
                        alert(result.message);

                        history.push('/profile');
                    }
                }
            }} >
                <input 
                value={username}
                placeholder='username'
                onChange={async (event) => {
                    const value = event.target.value;
                    setUsername(value);
                    if(value !== "") setAvailable(!await checkUser(value));
                }} />
                <input 
                value={password}
                type = "password"
                placeholder='password'
                onChange={(event) => {
                    setPassword(event.target.value);
                }} />
                {match.url === '/register'?
                    <>
                        <input 
                        value={confirmPassword}
                        type = "password"
                        placeholder='confirm password'
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }} />

                        <input 
                        value={email}
                        placeholder='email'
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }} />

                    </>
                    :
                    null
                }
                <button type='submit'>Submit</button>
                { // Adjust the link displayed to the user depending on the page they are on
                    match.url === '/register'?
                        <Link to='/login'>Already have an account?</Link>
                        :
                        <Link to='/register'>Don't have an account?</Link>
                }
                { username.length && match.url === '/register'? <>{available? <p className = "green">This username is available</p>: <p className = "warning">This username is taken!</p>}</>:null}
            </form>
        </>
    )
}

export default Login;