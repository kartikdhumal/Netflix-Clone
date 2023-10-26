import React, { useRef, useState } from 'react'
import './login.scss'
import logo from '../images/netflix.png'
import { NavLink } from 'react-router-dom'

function Login() {
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
                    <input type='email' id='email' placeholder='Email or phone number'/>
                    <input type='password' id='password' placeholder='Password'/>
                    <button className="loginButton"> Sign in </button>
                    <span> New to Netflix ? <b> Sign up now </b></span>
                    <span> This page is produced by Google reCAPTCHA to ensure you're not bot <b>Learn more </b></span>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Login
