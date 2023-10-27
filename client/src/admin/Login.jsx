import React, { useState } from 'react'
import './login.scss'
import logo from '../images/netflix.png'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
      };

      const handlePassword =(event) => {
        const value = event.target.value;
        setPassword(value);
      };

      const handleLogin =  async (e) => { 
        e.preventDefault();   
        try {
           if(email == "" && password== "")
           { alert("Please enter your Email or Password"); }
            else{
            const response = await Axios.post('netflix-clone-alpha-pearl.vercel.app/login', {
              email: email,
              password: password
            });
    
            if (response.data.success) {
              if(response.data.isadmin == true)
              {
                alert('Login successful');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userid', response.data.userid);
                navigate('/admin');
              }else{
                alert('Login successful');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('myuserid', response.data.userid);
                navigate('/homepage');
              }
            } else {
              alert('Login failed: ' + response.data.message);
            }
          }
          
          } catch (error) {
            console.error('Login failed:', error);
          }
      }
      
    
    
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
                    <input type='email' id='email' value={email} onChange={handleEmail} placeholder='Email or phone number'/>
                    <input type='password' value={password} onChange={handlePassword} id='password' placeholder='Password'/>
                    <button className="loginButton" onClick={handleLogin}> Sign in </button>
                    <span> New to Netflix ? <NavLink to="/register" className="signup"> Sign up now </NavLink></span>
                    <span> This page is produced by Google reCAPTCHA to ensure you're not bot <b>Learn more </b></span>
                    </form>
            </div>
            </div>
        </div>
    )
}

export default Login
