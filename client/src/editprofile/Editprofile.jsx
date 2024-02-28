import React, { useEffect, useState } from 'react'
import './editprofile.scss'
import { useNavigate, useParams } from 'react-router-dom';
import avatar from '../images/avatar.png'
import Cookies from 'js-cookie';
const bcrypt = require("bcryptjs");

function Editprofile() {
  const navigate = useNavigate();
  let id;
    if(localStorage.userid){
      id = localStorage.getItem('userid');
    }else{
      id = localStorage.getItem('myuserid');
    }
    const [userdata, getUserData] = useState([])

      const fetchData = async () =>
      { await fetch(`https://netflix-clone-alpha-pearl.vercel.app/fetcheditprofile/${id}`)
        .then((response) => response.json())
        .then((data) => getUserData(data))
        .catch((error) => console.error(error));
      }
      useEffect(()=>{
        if(!id) {
          navigate('/login');
      }
        fetchData();
        },[])

         const handleEmail = (e) => {
          getUserData({ ...userdata, email: e.target.value });
         }
         const handlePassword = (e) => {
          getUserData({ ...userdata, password: e.target.value });
         }

      const onHandleSubmit = async (e) => {
        e.preventDefault();
        if( userdata.email == "" && userdata.password == ""){
           alert("Please enter data");
        }
        else{
        try {
            const response = await fetch(`https://localhost:8000/editprofile/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email:userdata.email,
                password:bcrypt.hashSync(userdata.password, 8)
              }),

            });
      
            if (response.ok) {
              if(localStorage.userid)
              {
                alert('Profile updated successfully!');
                navigate('/admin');
              }
              if(localStorage.myuserid)
              {
                alert('Profile updated successfully!');
                navigate('/homepage');  
              }
            } 
            else {
              alert('Profile update failed');
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
  return (
    <div className='editprofile'>
      <div className="image">
        <img src={avatar}></img>
      </div>
             <h5> Edit profile </h5>
       <div className="formbox">
        <form className='myform' method='post'>
          <input type='email' id='email' value={userdata.email} onChange={handleEmail}  name="email" required placeholder='email'></input>
          <input type='password' id='password' onChange={handlePassword}  name='password' required placeholder='password'></input>
         <button type='submit' onClick={onHandleSubmit}> Update profile </button>
        </form>
       </div>
    </div>
  )
}

export default Editprofile
