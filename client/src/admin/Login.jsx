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
      if(response.data.usernot)
      {
        alert('User not exists ');
        setIsLoading(false);
        setEmail("");
        setPassword("");
      }
      else if (response.data.passwordnot)
      {
        alert('Incorrect Password');
        setIsLoading(false);
        setPassword("");
      }
      else if (response.data && response.data.success) {
        if (response.data.isadmin === true) {
          alert('Login successful');
          setIsLoading(false);
          localStorage.setItem('userid', response.data.userid);
          setEmail("");
          setPassword("");
          navigate('/admin');
        } else {
          alert('Login successful');
          setIsLoading(false);
          localStorage.setItem('myuserid', response.data.userid);
          setEmail("");
          setPassword("");
          navigate('/homepage');
        }
      } else {
        alert('Something went wrong');
        setEmail("");
        setPassword("");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Try Again!', error);
      setEmail("");
      setPassword("");
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
        {isLoading ? <CircularProgress /> : 
          <form>
            <h1> Sign in </h1>
            <input type='email' id='email' value={email} onChange={handleEmail} placeholder='Email or phone number' />
            <input type='password' value={password} onChange={handlePassword} id='password' placeholder='Password' />
            <button className="loginButton" onClick={handleLogin}> Sign in </button>
            <span> New to Netflix ? <NavLink to="/register" className="signup"> Sign up now </NavLink></span>
            <span> This page is produced by Google reCAPTCHA to ensure you're not bot <b>Learn more </b></span>
          </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Login