import React, { useEffect, useRef, useState } from 'react'
import './editshow.scss'
import { NavLink } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AuthRedirect from './AuthRedirect'
import Axios from 'axios';
import AdminNavbar from './AdminNavbar'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import UnauthorizeAdmin from './UnauthorizeAdmin';

function Editshow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moviedata, getShowData] = useState([])
  const [trailer, setTrailer] = useState(null)
  const [poster, setPosterImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [years, setYears] = useState()
  const [genre, setGenre] = useState()
  const [duration, setDuration] = useState()
  const [isSeries, setSeries] = useState()
  const [uploadingTrailer, setUploadingTrailer] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [addingShow, setAddingShow] = useState(false);
  const [limit, setLimit] = useState()

  useEffect(()=>{
  fetchData();
  },[])

  const fetchData = async () => {
    await fetch(`https://netflix-clone-alpha-pearl.vercel.app/getShowUpdateData/${id}`)
      .then((response) => response.json())
      .then((data) => getShowData(data))
      .catch((error) => console.error(error));
  }
  UnauthorizeAdmin()

  const handleTrailer = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingTrailer(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/video/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const data = await response.json();
      if (data.secure_url) {
        console.log(data.secure_url);
        const updatedMoviedata = { ...moviedata, trailer: data.secure_url };
        getShowData(updatedMoviedata);
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
    finally {
      setUploadingTrailer(false);
    }
  };

  const handlePoster = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPoster(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (data.secure_url) {
        const updatedMoviedata = { ...moviedata, poster: data.secure_url };
        getShowData(updatedMoviedata);
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    finally {
      setUploadingPoster(false);
    }
  };

  const handleVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/ddhjzsml9/video/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const data = await response.json();
      if (data.secure_url) {
        const updatedMoviedata = { ...moviedata, video: data.secure_url };
        getShowData(updatedMoviedata);
        console.log(data.secure_url);
      } else {
        console.error('No secure URL found in the response:', data);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
    finally {
      setUploadingVideo(false);
    }
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, title: value };
    getShowData(updatedMoviedata);
  };
  const handleDesc = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, description: value };
    getShowData(updatedMoviedata);
  };
  const handleDuration = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, duration: value };
    getShowData(updatedMoviedata);
  };
  const handleGenre = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, genre: value };
    getShowData(updatedMoviedata);
  };
  const handleYears = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, year: value };
    getShowData(updatedMoviedata);
  };
  const handleLimit = (e) => {
    const value = e.target.value;
    const updatedMoviedata = { ...moviedata, limit: value };
    getShowData(updatedMoviedata);
  };

  const handleSelect = (e) => {
    const isSeriesValue = e.target.value === "true";
    const updatedMoviedata = { ...moviedata, isSeries: isSeriesValue };
    getShowData(updatedMoviedata);
  };
  

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddingShow(true);
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
    finally {
      setAddingShow(false);
    }
  }

  const form = useRef();
  const heads = ['ID', 'poster', 'name', 'Genre', 'year', 'limit', 'isSeries', 'Action']
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className='editshows'>
      <AdminNavbar/>
      <div className="updateform">
        <form className='formmy' ref={form}  onSubmit={handleUserSubmit}>
        <div style={{display:"flex" , width:"100%", justifyContent:"center" , alignItems:"center"}}>
          <label htmlFor="file-upload" className="filetext">
            Upload Poster
          </label>
          <div style={{display:"flex", flexDirection:"column" , justifyContent:"start",alignItems:"flex-start", width:"100%"}}>
          <input
            type="file"
            accept="image/*"
            name='poster'
            value={moviedata.poster ? '' : undefined}
            id='posters'
            onChange={handlePoster}
          />
          {moviedata.poster ? (
            <img
              src={moviedata.poster}
              alt="Uploaded Poster"
              className="uploadedimage"
            />
          ) : (
            uploadingPoster && <p>Uploading...</p>
          )}
          </div>
          </div>
          <div style={{display:"flex" , width:"100%", justifyContent:"center" , alignItems:"center"}}>
          <label htmlFor="file-upload" className="filetext">
            Upload Trailer
          </label>
          <div style={{display:"flex", flexDirection:"column" , width:"100%", justifyContent:"start" , alignItems:"self-start"}}>
          <input
            type="file"
            accept="video/*"
            id='trailers'
            value={moviedata.poster ? '' : undefined}
            className='trailers'
            onChange={handleTrailer}
          />
          {moviedata.trailer ? (
            <video src={moviedata.trailer} className='videoshow' controlsList="nodownload" controls></video>
          ) : (
            uploadingTrailer && <p>Uploading...</p>
          )}
          </div>
          </div>
          <div style={{display:"flex" , width:"100%", justifyContent:"center" , alignItems:"center"}}>
          <label htmlFor="file-upload" className="filetext">
            Upload Video
          </label>
          <div style={{display:"flex", flexDirection:"column" , width:"100%", justifyContent:"start" , alignItems:"self-start"}}>
          <input
            type="file"
            accept="video/*"
            id='fullvideos'
            className='fullvideos'
            name='poster'
            onChange={handleVideo}
          />
          {moviedata.video ? (
             <video src={moviedata.video} controls className='videoshow' controlsList="nodownload"></video>
          ) : (
            uploadingVideo && <p>Uploading...</p>
          )}
          </div>
          </div>
          <input name='trailer' value={moviedata.title} onChange={handleTitle} type='text' required placeholder='Name of movie/series'></input>
          <input name="description" value={moviedata.description} onChange={handleDesc} type='input' required placeholder='Description'></input>
          <input name='year' value={moviedata.year} onChange={handleYears} type='number' min="1999" max={year} required placeholder='Year'></input>
          <input name='genre' value={moviedata.genre} onChange={handleGenre} type='text' required placeholder='Genre'></input>
          <input name='duration' value={moviedata.duration} onChange={handleDuration} type='number' required step="3600" placeholder='Duration (In minutes)'></input>
          <input name='limit' value={moviedata.limit} onChange={handleLimit} type='number' min="1" required placeholder='Limit'></input>
          <select name='isSeries' onChange={handleSelect} >
            <option disabled selected>{moviedata.isSeries ? "Series" : "Movie"} </option>
            <option value="true">Series</option>
            <option value="false">Movie</option>
           
            
          </select>
          <button type='submit' className='submitbtn'> 
          {addingShow ? <CircularProgress size={24} /> : "Update show"}
           </button>
        </form>
      </div>
    </div>
  )
}

export default Editshow
