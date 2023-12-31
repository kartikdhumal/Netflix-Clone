import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import Featured from '../featured/Featured'
import List from '../list/List'
import './home.scss'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()
// useEffect(() => {
//   if (!localStorage.myuserid) {
//       navigate('/login');
//   }
// }, [navigate]);
  return (
    <div className='home'>
       <Navbar />
       <Featured type=""/>
       <List title="Continue to Watch" index="a"/>
       <List title="Trending Now" index="b"/>
       <List title="Popular on Netflix" index="c"/>
       <List title="Most Rated" index="d" />
    </div>
  )
}

export default Home
