import React, { useEffect, useRef, useState } from 'react'
import './editshow.scss'
import { NavLink } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AuthRedirect from './AuthRedirect'
import Axios from 'axios';
import AdminNavbar from './AdminNavbar'
import { useNavigate, useParams } from 'react-router-dom';
import UnauthorizeAdmin from './UnauthorizeAdmin';

function Editshow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moviedata, getShowData] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [poster, setPoster] = useState(null)
  const [video, setVideo] = useState(null)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [years, setYears] = useState()
  const [genre, setGenre] = useState()
  const [duration, setDuration] = useState()
  const [isSeries, setSeries] = useState()
  const [limit, setLimit] = useState()
  const fetchData = async () => {
    await fetch(`https://netflix-clone-alpha-pearl.vercel.app/getShowUpdateData/${id}`)
      .then((response) => response.json())
      .then((data) => getShowData(data))
      .catch((error) => console.error(error));
  }
  // useEffect(() => {
  //   if (!sessionStorage.userid) {
  //     navigate('/login');
  //   }
  //   fetchData();
  // }, [])
  UnauthorizeAdmin()
  const handleTrailer = (event) => {
    const value = event.target.value;
    const updatedMoviedata = { ...moviedata, trailer: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.trailer);
  };

  const handlePoster = (event) => {
    const value = event.target.value;
    const updatedMoviedata = { ...moviedata, poster: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.poster);
  };

  const handleVideo = (event) => {
    const value = event.target.value;
    const updatedMoviedata = { ...moviedata, video: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.video);
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, title: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.title);
  };
  const handleDesc = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, description: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.description);
  };
  const handleDuration = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, duration: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.duration);
  };
  const handleGenre = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, genre: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.genre);
  };
  const handleYears = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, year: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.year);
  };
  const handleLimit = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, limit: value };
    getShowData(updatedMoviedata);
    console.log(moviedata.limit);
  };

  const handleSelect = (e) => {
    const isseries = e.target.value == "Yes" ? true : false;
    const updatedMoviedata = { ...moviedata, isSeries: isseries };
    getShowData(updatedMoviedata);
    console.log(moviedata.isSeries);
  }
  const dataToUpdate = {
    poster: moviedata.poster,
    trailer: moviedata.trailer,
    video: moviedata.video,
    title: moviedata.title,
    description: moviedata.description,
    year: moviedata.year,
    genre: moviedata.genre,
    duration: moviedata.duration,
    limit: moviedata.limit,
    isSeries: moviedata.isSeries,
  };
  console.log(dataToUpdate);
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const MyData = await Axios.put(`http://localhost:8000/editshow/${id}`, dataToUpdate);
      if (MyData) {
        alert('Show updated');
        fetchData();
        navigate('/shows');
      }
    } catch (err) {
      console.error(err);
      console.log(err);
      alert("Something went wrong. Please try again later.");
      navigate('/shows');
    }
  }

  const form = useRef();
  const heads = ['ID', 'poster', 'name', 'Genre', 'year', 'limit', 'isSeries', 'Action']
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className='shows'>
      <div className="form">
        <h5> Update show </h5>
        <form className='formmy' ref={form}>
          <input type='text' value={moviedata.poster} onChange={handlePoster} className='poster' name='poster' id='poster' required placeholder='Poster image URL'></input>
          <input type='text' value={moviedata.trailer} onChange={handleTrailer} id='trailer' name='trailer' className='trailer' required placeholder='Trailer video URL'></input>
          <input type='text' value={moviedata.video} onChange={handleVideo} id='fullvideo' name='video' className='fullvideo' required placeholder='full video URL'></input>
          <input name='trailer' value={moviedata.title} onChange={handleTitle} type='text' required placeholder='Name of movie/series'></input>
          <input name="description" value={moviedata.description} onChange={handleDesc} type='input' required placeholder='Description'></input>
          <input name='year' value={moviedata.year} onChange={handleYears} type='number' min="1999" max={year} required placeholder='Year'></input>
          <input name='genre' value={moviedata.genre} onChange={handleGenre} type='text' required placeholder='Genre'></input>
          <input name='duration' value={moviedata.duration} onChange={handleDuration} type='number' required step="3600" placeholder='Duration (In minutes)'></input>
          <input name='limit' value={moviedata.limit} onChange={handleLimit} type='number' min="1" required placeholder='Limit'></input>
          <select name='isSeries' onChange={handleSelect} required>
            <option disabled>Show type </option>
            {moviedata.isSeries ? (
              <>
                <option value="true" selected>Yes</option>
                <option value="false">No</option>
              </>
            ) : (
              <>
                <option value="true">Yes</option>
                <option value="false" selected>No</option>
              </>
            )}
          </select>
          <button type='submit' onClick={handleUserSubmit}> Update show </button>
        </form>
      </div>
    </div>
  )
}

export default Editshow
