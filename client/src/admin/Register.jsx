import React, { useRef, useState } from 'react'
import './register.scss'
import logo from '../images/netflix.png'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
const bcrypt = require("bcryptjs")

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [clicked , isClicked ] = useState(false);
    const [isAdmin , setIsAdmin ] = useState(false)
    const [password, setPassword] = useState("");
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const openLogin = () => {
          navigate('/login')    
    }
    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
        console.log(event.target.name + " " + email);
    }
    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    }
    const handleStart = () => {
        isClicked(true);
    }
    const handleUserSubmit = async (e) => {
        e.preventDefault();
            if(email == "" && password == "")
            {
              alert('Please enter the field');
            }
            else{
                try{
                    const mydata = await Axios.post('netflix-clone-alpha-pearl.vercel.app/register', {
                        email: email,
                        password: bcrypt.hashSync(password, 8),
                        isAdmin : isAdmin
                    });
                    if(mydata.data.error)
                    {
                        alert('User already exists');
                    }
                    if (mydata.data.userid) {
                        localStorage.setItem('myuserid', mydata.data.userid);
                        alert('Registered Successfully');
                        setEmail("");
                        setPassword("");
                        navigate('/homepage');
                    }
                } catch (err) {
                    console.error("Error : "+err);
                    alert('User already exists');
                    setEmail("");
                    setPassword("");
                }
            }
    }
    return (
        <div>
            <div className="register">
                <div className="top">
                    <div className="wrapper">
                        <img className='logo' src={logo} alt='logo' />
                        <button className="loginButton" onClick={openLogin}> 
                        Sign in 
                        </button>
                    </div>
                </div>
                <div className="container">
                    <h1> Unimited movies , TV shows and more. </h1>
                    <h2> Watch anywhere. Cancel anytime </h2>
                    <p>
                        Ready to watch? Enter your email to create or restart your membership
                    </p><form method='post' className='form'>{
                        !clicked ? (
                            <div className='input'>
                                <input type='email' name='email' value={email}  id='email' onChange={handleEmail} placeholder='email address'></input>
                                <div onClick={handleStart} className="registerButton">Get Started </div>
                            </div>
                        ) : (
                            <div className='input'>
                            <input type='password' name='password' value={password} onChange={handlePassword} id='password' placeholder='password'></input>
                            <button type='submit' onClick={handleUserSubmit} className="registerButton"> Start </button>

                        </div>  
                        )
                    }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
