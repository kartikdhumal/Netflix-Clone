import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './shows.scss'
import AdminNavbar from './AdminNavbar'
import axios from 'axios';

function Users() {
  const [moviedata, getShowData] = useState([])
  const [trailer, setTrailer] = useState('')
  const [poster, setPoster] = useState('')
  const [video, setVideo] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [years, setYears] = useState('')
  const [genre, setGenre] = useState('')
  const [duration, setDuration] = useState('')
  const [isSeries, setSeries] = useState(false)
  const [limit, setLimit] = useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - moviedata.length) : 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterData();
  }, [searchQuery, moviedata]);


  
  const fetchData = () => {
    fetch('https://netflix-clone-alpha-pearl.vercel.app/findshow')
      .then((response) => response.json())
      .then((data) => {
        getShowData(data)
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = (recordId) => {
    axios.delete(`https://netflix-clone-alpha-pearl.vercel.app/deleteshow/${recordId}`)
      .then((response) => {
        alert('Show Deleted');
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  const handleTrailer = (event) => {
    const value = event.target.value;
    setTrailer(value);
    console.log(trailer);
  };

  const filterData = () => {
    if (!searchQuery) {
      setFilteredData(moviedata);
    } else {
      const filtered = moviedata.filter((movie) => {
        const isSeriesValue = movie.isSeries ? 'Series' : 'Movie';
        return (
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.year.toString().includes(searchQuery) ||
          movie.limit.toString().includes(searchQuery) ||
          movie.duration.toString().includes(searchQuery) ||
          isSeriesValue.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };
  

  const handlePoster = (event) => {
    const value = event.target.value;
    setPoster(value);
    console.log(poster);
  };

  const handleVideo = (event) => {
    const value = event.target.value;
    setVideo(value);
    console.log(video);
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
    console.log(title);
  };
  const handleDesc = (e) => {
    const value = e.target.value;
    setDescription(value);
    console.log(description);
  };
  const handleDuration = (e) => {
    const value = e.target.value;
    setDuration(value);
    console.log(duration);
  };
  const handleGenre = (e) => {
    const value = e.target.value;
    setGenre(value);
    console.log(genre);
  };
  const handleYears = (e) => {
    const value = e.target.value;
    setYears(value);
    console.log(years);
  };
  const handleLimit = (e) => {
    const value = e.target.value;
    setLimit(value);
    console.log(limit);
  };

  const handleSelect = (e) => {
    const isseries = e.target.value == "Yes" ? true : false;
    setSeries(isseries);
    console.log(isSeries);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(parseInt(duration)) || isNaN(parseInt(limit)) || isNaN(parseInt(years))) {
      alert('Duration, limit, and year must be numeric.');
      return;
    }
    if (years.length !== 4) {
      alert('Year must have 4 digits.');
      return;
    }
    try {
      const dataToUpdate = {
        poster: poster,
        trailer: trailer,
        video: video,
        title: title,
        description: description,
        year: years,
        genre: genre,
        duration: duration,
        limit: limit,
        isSeries: false,
      };
      const MyData = await axios.post('https://netflix-clone-alpha-pearl.vercel.app/shows', dataToUpdate, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (MyData) {
        alert('Show added');
        setPoster('');
        setTrailer('');
        setVideo('');
        setTitle('');
        setDescription('');
        setYears('');
        setGenre('');
        setDuration('');
        setLimit('');
        setSeries(false);
        fetchData();
        fetchData();
      }
    } catch (err) {
      console.error(err);
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  }


  const heads = ['ID', 'poster', 'name', 'Genre', 'year', 'limit', 'Movie/Series', 'Action']
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className='shows'>
      <AdminNavbar />
      <div className="form">
        <form className='formmy' onSubmit={handleUserSubmit}>
          <input type='text' onChange={handlePoster} className='posters' name='poster' id='posters' required placeholder='Poster image URL'></input>
          <input type='text' onChange={handleTrailer} id='trailers' name='trailer' className='trailers' required placeholder='Trailer video URL'></input>
          <input type='text' onChange={handleVideo} id='fullvideos' name='video' className='fullvideos' required placeholder='full video URL'></input>
          <input name='trailer' onChange={handleTitle} value={title} type='text' required placeholder='Name of movie/series'></input>
          <input name="description" onChange={handleDesc} value={description} type='input' required placeholder='Description'></input>
          <input name='year' onChange={handleYears} value={years} type='number' min="1999" max={year} required placeholder='Year'></input>
          <input name='genre' onChange={handleGenre} value={genre} type='text' required placeholder='Genre'></input>
          <input name='duration' onChange={handleDuration} value={duration} type='number' required step="3600" placeholder='Duration (In minutes)'></input>
          <input name='limit' onChange={handleLimit} value={limit} type='number' min="1" required placeholder='Limit'></input>
          <select name='isSeries' value={isSeries} onChange={handleSelect} required>
            <option disabled>Is series ?</option>
            <option selected> {isSeries == true ? "Yes" : "No"}</option>
            <option> {isSeries == true ? "No" : "Yes"}</option>
          </select>
          <button type='submit'> Add show </button>
        </form>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search show info..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='searchbox'
        />
      </div>
      <table aria-label="custom pagination table" cellPadding="10px" cellSpacing="10px">
        <tr>
          {
            heads.map((val) => {
              return <th> {val} </th>
            })
          }
        </tr>
        <tbody>
          {(rowsPerPage > 0
            ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredData
          ).map((row, index) => (
            <tr key={row.name}>
              <td>{index + page * rowsPerPage + 1}</td>
              <td style={{ width: 160 }} align="right">
                <img src={row.poster} style={{ width: "50%" }}></img>
              </td>
              <td> {row.title}</td>
              <td> {row.genre}</td>
              <td> {row.year}</td>
              <td> {row.limit}</td>
              <td style={{ width: 160 }} align="right">
                {row.isSeries == true ? "Series" : "Movie"}
              </td>
              <td>
                <NavLink to={`/editshow/${row._id}`}><EditNoteIcon className='editicon' /></NavLink>   <DeleteIcon onClick={(event) => handleDelete(`${row._id}`, event)} className='deleteicons' />
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={moviedata.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users
