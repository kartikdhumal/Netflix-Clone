import React, { useEffect, useState } from 'react'
import '../src/styles/navbar.scss';
import netflix from './images/netflix.png'
import MenuIcon from '@mui/icons-material/Menu';
import avatar from './images/avatar.png'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link , Route, Routes, useNavigate } from 'react-router-dom';
import UnauthorizeUser from './admin/UnauthorizeUser';

function Navbar() {
  const navigate = useNavigate()
   const id = localStorage.myuserid;
   const handleLogout = () => {
    localStorage.removeItem('myuserid');
    alert('Logged out');
    navigate('/login');
  };
  UnauthorizeUser()
  const [isScrolled, setIsScrolled] = useState(false);

  const openNavbar = () =>{
    const elementToToggle = document.getElementById('elementToToggle');
    const toggleButton = document.getElementById('toggleButton');
    const middlelogo = document.getElementById('middlelogo');
    if (elementToToggle.style.display === 'none' || elementToToggle.style.display === '') {
      elementToToggle.style.display = 'block';
      toggleButton.style.display = 'none';
      middlelogo.style.display = 'none';
    } else {
      elementToToggle.style.display = 'none';
    }
  }

  const closeNavbar = () => {
    const elementToToggle = document.getElementById('elementToToggle');
    const toggleButton = document.getElementById('toggleButton');
    const middlelogo = document.getElementById('middlelogo');
    if (elementToToggle.style.display === 'block' || elementToToggle.style.display === '') {
      elementToToggle.style.display = 'none'; 
      toggleButton.style.display = 'block';
      middlelogo.style.display = 'block';
// Show the element
    } else {
      elementToToggle.style.display = 'block'; 
    }
  }
 window.onmouseover = () => {  // change
   setIsScrolled(true);
 }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
       <div className='container'>  
        <div className='left' id="elementToToggle">
        <MenuIcon className='closeicon' onClick={closeNavbar}/>
          <img src={netflix} alt='logo'></img>
          <span> <Link className="link" to={`/homepage`}>  <span className="navbarmainLinks"> Home </span> </Link> </span>
          <span> <Link className="link" to={`/myshows`}>  <span className="navbarmainLinks"> Shows </span> </Link></span>
          <span> <Link className="link" to={`/mymovies`}>  <span className="navbarmainLinks"> Movies </span> </Link> </span>
          <span> <Link className="link" to={`/latest`}>  <span className="navbarmainLinks"> Latest </span>  </Link></span>
          <span> <Link className="link" to={`/mylist`}>  <span className="navbarmainLinks">  My List  </span></Link></span>
        </div>
        <MenuIcon className='menuicon' onClick={openNavbar} id="toggleButton"/>
        <img src={netflix} alt='logo' id='middlelogo' className='middlelogo'></img>
        <div className='right'>
            <SearchIcon className='icon'/>
             <span> KID </span>
             <NotificationsIcon className="icon" />
             <img src={avatar}></img>
             <div className='profile'>
                <ArrowDropDownIcon className="downicon"/>
                <div className='options'>
                <span> <Link to={`/editprofile/${id}`}> Profile </Link> </span>
                <span onClick={handleLogout}> logout </span>
                </div>
             </div>
        </div>
        </div> 
    </div>
  )
}

export default Navbar
