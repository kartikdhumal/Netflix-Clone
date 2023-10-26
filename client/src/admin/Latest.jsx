import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import List from '../list/List';
import Featured from '../featured/Featured';
import Navbar from '../Navbar';

function Latest() {
    const [moviedata, getShowData] = useState([])
  const navigate = useNavigate()
  const fetchData = () =>
  { fetch('http://localhost:8000/findshow')
    .then((response) => response.json())
    .then((data) => getShowData(data))
    .catch((error) => console.error(error));
  }
  // useEffect(()=>{
  //   if (!localStorage.myuserid) {
  //       navigate('/login');
  //     }
  //   fetchData();
  //   },[])
  return (
    <div className='home'>
       <Navbar/>
       <Featured type="movie" />
       <List title="Latest" type="bmovies" genre=""/>
    </div>
  )
}

export default Latest
