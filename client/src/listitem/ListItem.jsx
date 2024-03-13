import React, { useState } from 'react'
import './listitem.scss'
import asurcover from '../images/asurcover.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import asurtrailer from '../trailers/asurtrailer.mp4'

function ListItem({ index, data }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='listItem' style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={data.poster} alt='movie image' />
      {isHovered && (
        <>
          <video src={data.trailer} loop autoPlay={true}></video>
          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className='icon' />
              <AddIcon className='icon' />
              <ThumbUpAltOutlinedIcon className='icon' />
              <ThumbDownAltOutlinedIcon className='icon' />
            </div>
            <div className="itemInfoTop">
              <span> {(data.duration / 60).toFixed(0) + " hours"} </span>
              <span className='limits'> {data.limit + "+"} </span>
              <span> {data.year} </span>
            </div>
            <div className="desc">
              {data.description}
            </div>
            <div className="genre"> {data.genre} </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ListItem
