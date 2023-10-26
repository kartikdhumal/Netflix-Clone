import React, { useEffect, useRef, useState } from 'react'
import './list.scss'
import ListItem from '../listitem/ListItem'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

function List(props) {
    const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
   const [moviedata, getShowData] = useState([])
  const listRef = useRef();

  const fetchData = () =>
  { fetch('http://localhost:8000/findshow')
    .then((response) => response.json())
    .then((data) => getShowData(data))
    .catch((error) => console.error(error));
  }
  useEffect(()=>{
    fetchData();
    },[])

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
   <div className="list">
    {props.index === "a" ? (
      <div>
        <span className="listTitle">
        {props.title}
    </span>
    <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
        <div className="container" ref={listRef}>
        {moviedata.filter((show, index) => [2, Math.floor(moviedata.length / 2)].includes(index)).map((show, index) => (
          <NavLink to={`/watch/${show._id}`}><ListItem key={index} data={show}/> </NavLink>
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
    </div>
    </div>
) : props.index === "b" ? (
  <div>
        <span className="listTitle">
        {props.title}
    </span>
    <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
        <div className="container" ref={listRef}>
        {moviedata.filter((show, index) => [moviedata.length - (moviedata.length - 1),moviedata.length - (moviedata.length - 2),moviedata.length - (moviedata.length - 3),moviedata.length - (moviedata.length - 4),moviedata.length - (moviedata.length - 5),moviedata.length - (moviedata.length - 6) , moviedata.length - (moviedata.length - 7)].includes(index)).map((show, index) => (
            <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
    </div>
    </div>
) : props.index === "c" ? (
  <div>
        <span className="listTitle">
        {props.title}
    </span>
    <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
        <div className="container" ref={listRef}>
        {moviedata.filter((show,index) => index % 2 == 0).reverse().map((show, index) => (
            <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
    </div>
    </div>
) : props.index === "d" ? (
  <div className='listbox'>
        <span className="listTitle">
        {props.title}
    </span>
    <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
        <div className="container" ref={listRef}>
        {moviedata.filter((show) => show.genre === "crime" || show.genre === "thriller" || show.genre === "drama").map((show, index) => (
            <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
    </div>
    </div>
): props.type === "aseries"? (
     props.genre == "" ? (
       <>
         <div>
        <span className="listTitle">
        {props.title}
    </span>
    <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
        <div className="container" ref={listRef}>
        {moviedata
  .filter((show) => show.isSeries === true)
  .map((show, index) => {
    if (index % 6 == 0) {
      return (
        <NavLink to={`/watch/${show._id}`}>
          <ListItem key={index} data={show} />
        </NavLink>
      );
    } else {
      return null;
    }
  })
}
        </div>
        <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
    </div>
    </div>
      </>
     ) : (
      <>
        <div>
        <span className="listTitle">
        {props.title}
    </span>
    <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
        <div className="container" ref={listRef}>
        {moviedata.filter((show, index) => show.isSeries === true && show.genre === props.genre).map((show, index) => (
            <NavLink to={`/watch/${show._id}`}>  <ListItem key  ={index} data={show}/> </NavLink>
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
    </div>
    </div>
      </>
     )

): props.type === "bseries" ? (
  props.genre == "" ? (
    <>
      <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => [20,19,18,17,16,15,14,13,12,11].includes(index) && show.isSeries === true).map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  ) : (
   <>
     <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => show.isSeries === true && show.genre === props.genre).reverse().map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key  ={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  )
): props.type === "cseries" ? (
  props.genre == "" ? (
    <>
      <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => [30,27,24,21,18,15,12,0].includes(index) && show.isSeries === true).map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  ) : (
   <>
     <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => show.isSeries === true && show.genre === props.genre).map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key  ={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  )
) : props.type === "amovies" ? (
  props.genre == "" ? (
    <>
      <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata
  .filter((show) => show.isSeries === false)
  .map((show, index) => {
    if (index % 4 === 0) {
      return (
        <NavLink to={`/watch/${show._id}`}>
          <ListItem key={index} data={show} />
        </NavLink>
      );
    } else {
      return null;
    }
  })
}


     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  ) : (
   <>
     <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => show.isSeries === false && show.genre === props.genre).map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key  ={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  )
) : props.type === "bmovies" ? (
  props.genre == "" ? (
    <>
      <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show) =>  show.isSeries === false).reverse().map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  ) : (
   <>
     <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => show.isSeries === false && show.genre === props.genre).reverse().map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key  ={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  )
) : props.type === "cmovies" ? (
  props.genre == "" ? (
    <>
      <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show ) => show.isSeries === false).map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  ) : (
   <>
     <div>
     <span className="listTitle">
     {props.title}
 </span>
 <div className="wrapper">
     <ArrowBackIosNewOutlinedIcon onClick={()=> handleClick("left")} style={{display : !isMoved && "none" }} className='sliderArrow left' />
     <div className="container" ref={listRef}>
     {moviedata.filter((show, index) => show.isSeries === false && show.genre === props.genre).map((show, index) => (
         <NavLink to={`/watch/${show._id}`}>  <ListItem key  ={index} data={show}/> </NavLink>
       ))}
     </div>
     <ArrowForwardIosOutlinedIcon onClick={()=> handleClick("right")} className='sliderArrow right'/>
 </div>
 </div>
   </>
  )
): (
  <></>
)

}
   </div>
  )
}

export default List
