import React, { useEffect } from 'react'
import './home.scss'
import AdminResult from './AdminResult'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
  const navigate = useNavigate()
  return (
    <div style={{ backgroundColor:"#0b0b0b"}}>
         <AdminResult />
    </div>
  )
}

export default AdminHome
