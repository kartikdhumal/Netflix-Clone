import React, { useState } from 'react'
import './login.scss'
import logo from '../images/netflix.png'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Axios from 'axios';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (email === "" || password === "") {
        alert("Please enter your Email and Password");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        setIsLoading(false);
        return;
      }
  
      if (password.length < 2) {
        alert("Password must be at least 2 characters long");
        setIsLoading(false);
        return;
      }
  
      const response = await Axios.post(
        'https://netflix-clone-alpha-pearl.vercel.app/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.usernot) {
        alert('User not exists');
        setEmail("");
        setPassword("");
      } else if (response.data.passwordnot) {
        alert('Incorrect Password');
        setPassword("");
      } else if (response.data && response.data.success) {
        if (response.data.isadmin === true) {
          alert('Login successful');
          sessionStorage.setItem('userid', response.data.userid);
          setEmail("");
          setPassword("");
          navigate('/admin');
        } else {
          alert('Login successful');
          sessionStorage.setItem('myuserid', response.data.userid);
          setEmail("");
          setPassword("");
          navigate('/homepage');
        }
      } else {
        alert('Something went wrong');
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error('Try Again!', error);
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };
  
  



  return (
    <div>
      <div className="login">
        <div className="top">
          <div className="wrapper">
            <img className='logo' src={logo} alt='logo' />
          </div>
        </div>
        <div className="container">
          <form>
            <h1> Sign in </h1>
            <input type='email' id='email' value={email} onChange={handleEmail} placeholder='Email or phone number' />
            <input type='password' value={password} onChange={handlePassword} id='password' placeholder='Password' />

            <button className="loginButton" onClick={handleLogin}> 
            {isLoading ? <CircularProgress size={24} /> : "Sign in" } </button>
            <span> New to Netflix ? <NavLink to="/register" className="signup"> Sign up now </NavLink></span>
            <span> This page is produced by Google reCAPTCHA to ensure you're not bot <b>Learn more </b></span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login