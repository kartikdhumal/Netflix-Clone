import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UnauthorizeAdmin() {
    const navigate = useNavigate()
    useEffect(() => {
        const userId = localStorage.userid;
        if (!userId) {
          navigate('/login');
        }
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default UnauthorizeAdmin
