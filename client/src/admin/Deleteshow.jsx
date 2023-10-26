import React, { useEffect } from 'react'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthRedirect from './AuthRedirect'
import UnauthorizeAdmin from './UnauthorizeAdmin';

function Deleteshow() {
  const navigate = useNavigate()
//   useEffect(() => {
//     const b = localStorage.userid;
//     if(!b){
//       navigate('/login');
//     }
// })
UnauthorizeAdmin()
    const {id}= useParams();
    useEffect(()=>{
        handleDelete();
        },[])
  
        const handleDelete = () => {
          Axios.delete(`http://localhost:8000/deleteshow/${id}`)
            .then((response) => {
              navigate('/shows');
            })
            .catch((error) => {
              console.error('Error deleting record:', error);
              navigate('/shows');
            });
        };
  return (
    <div>
      
    </div>
  )
}

export default Deleteshow
