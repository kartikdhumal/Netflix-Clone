import React, { useRef, useState } from 'react'
import './register.scss'
import logo from '../images/netflix.png'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
const bcrypt = require("bcryptjs")

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [clicked , isClicked ] = useState(false);
    const [isAdmin , setIsAdmin ] = useState(false)
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
      }

    const handleStart = () => {
        isClicked(true);
    }
    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
            if(email == "" && password == "")
            {
              alert('Please enter the field');
              setIsLoading(false);
            }
            else if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                setIsLoading(false);
                isClicked(false);
              } 
            else if (password.length < 2) {
                alert('Password must be at least 2 characters long.');
                setIsLoading(false);
                setPassword('');
              }
            else{
                try{
                    const mydata = await Axios.post('https://netflix-clone-alpha-pearl.vercel.app/register', {
                        email: email,
                        password: bcrypt.hashSync(password, 8),
                        isAdmin : isAdmin
                    }, {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      });
                    if(mydata.data.userexists)
                    {
                        alert('User already exists');
                        setEmail("");
                        setPassword("");
                        setIsLoading(false);
                    }
                    if (mydata.data.userid) {
                        sessionStorage.setItem('myuserid', mydata.data.userid);
                        alert('Registered Successfully');
                        setIsLoading(false);
                        setEmail("");
                        setPassword("");
                        navigate('/homepage');
                    }
                    setIsLoading(false);
                } catch (err) {
                    console.error("Error : "+err);
                    alert('User already exists');
                    setIsLoading(false);
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
                { isLoading ? <CircularProgress /> : 
                <>
                    <h1> Unimited movies , TV shows and more. </h1>
                    <h2> Watch anywhere. Cancel anytime </h2>
                    <p>
                        Ready to watch? Enter your email to create or restart your membership
                    </p>
                    <form method='post' className='form'>{
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
                        )}
                    </form>
                    </>
                }
                </div>
            </div>
        </div>
    )
}

export default Register