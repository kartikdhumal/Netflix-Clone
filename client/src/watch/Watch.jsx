import React, { useEffect, useState } from 'react'
import './watch.scss'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import asurscene1 from '../fullvideos/asurscene1.mp4'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import netflix from '../fullvideos/netflix.mp4'
import UnauthorizeUser from '../admin/UnauthorizeUser';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

function Watch() {
  const [showData ,setShowData ] = useState("")
  const [fetch , isFetched ] = useState(false)
   const { id } = useParams()
   const navigate = useNavigate()

   const handleArrow = () => {
    navigate('/homepage');
  }
  UnauthorizeUser()
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await Axios.get(`https://netflix-clone-alpha-pearl.vercel.app/watch/${id}`);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data; // Access data with response.data
          setShowData(data[0].video);
          isFetched(true);

        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowData();
      }
    };
    console.log(showData);
    fetchData();
    },[id])


  return (
    <div className="main">
    <div className='watch'>
      <div className="back">
       <ArrowBackOutlinedIcon onClick={handleArrow} />
      </div>
      { isFetched ? ( // change !isFetched to isFetched
        <ShakaPlayer autoPlay src={showData} className="video"/>
      ) : (
        <video src={netflix} className="video" autoPlay controls ></video>
      )} 
    </div>
    </div>
  )
}

export default Watch
