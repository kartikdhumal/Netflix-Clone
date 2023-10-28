import React, { useState , useRef, useEffect } from 'react'
import './users.scss'
import { NavLink, useNavigate  } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import AdminNavbar from './AdminNavbar'
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
const bcrypt = require("bcryptjs")

function Users() {
  const [userdata , getUserData ] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userdata.length) : 0;

  const [formData,setFormData] = useState({
       email : "",
       password:"",
       isAdmin : false
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = () =>
  { fetch('netflix-kartikdhumal.vercel.app/finduser')
    .then((response) => response.json())
    .then((data) => getUserData(data))
    .catch((error) => console.error(error));
  }
  useEffect(()=>{
  fetchData()
  },[])

  const handleDelete = (recordId) => {
    Axios.delete(`netflix-kartikdhumal.vercel.app/deleteuser/${recordId}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();
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

  useEffect(() => {
      if (!localStorage.userid) {
          navigate('/login');
      }
  }, [navigate]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelect = (e) => {
    const isadmin = e.target.value == "Admin" ? "1" : "0";
    formData.isAdmin = isadmin;
  }
  const form = useRef();
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try{
        const sendData = await Axios.post('http://localhost:8000/users', {
        username:formData.username,
        email:formData.email,
        password: bcrypt.hashSync(formData.password, 8),
        isAdmin :formData.isAdmin
    });
    if (sendData) {
      alert('User added');
      fetchData();
      document.getElementById('email').value="";
      document.getElementById('password').value="";
      document.getElementById('isadmin').value="";
      setFormData({
        email: "",
        password: "",
        isAdmin: false,
      })
    }
    else{
      alert("Something went wrong");
    }
    }catch(err){
      console.log(err);
    }  
  }
  const heads = ['ID' ,'Email' , 'Role' , 'Delete' ]
  return (
    <div className='users'>
      <AdminNavbar/>
      <div className="form">
      <h5> Add user  </h5>
      <form className='formmy' ref={form}>
          <input type='email' id='email' value={setFormData.email} name="email" onChange={handleChange} required placeholder='email'></input>
          <input type='password' id='password' value={setFormData.password} name='password' onChange={handleChange} required placeholder='password'></input>
          <select id='isadmin' value={setFormData.isAdmin} onChange={handleSelect}  required>
            <option disabled name='isadmin'> Select Role </option> 
            <option> Admin </option>
            <option> User </option>
            </select>
         <button onClick={handleUserSubmit}> Add user </button>
        </form>
      </div>
        <table aria-label="custom pagination table" id='userdatatable' cellPadding="10px" cellSpacing="10px">
        <h5> Users </h5>
          <tr>
          {
            heads.map((val)=>{
              return <th> {val} </th>
            })
          }
            </tr>
             <tbody>
             {(rowsPerPage > 0
            ? userdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : userdata
          ).map((row) => (
            <tr key={row.name}>
              <td>{row._id}</td>
              <td style={{ width: 160 }} align="right">
                {row.email}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.isAdmin == true ? "Admin" : "User"}
              </td>
              <td>
              <DeleteIcon onClick={() => handleDelete(`${row._id}`)} className='deleteicons' />
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
             </tbody>
        <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={userdata.length}
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
        </table>
        
    </div>
  )
}

export default Users
