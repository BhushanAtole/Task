import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './Pages/AdminDashboard'
import SuperUserDashboard from './Pages/SuperUserDashboard'
import Payroll from './Pages/Payroll'
import UserDashboard from './Pages/UserDashboard'
import PrivateRoute from './privateroutes/PrivateRoute'
import Login from './Pages/Login'
import './main.scss';
import NotFoundPage from './Pages/NotFoundPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['superuser']}/>}>
          <Route path="/superuser" element={<SuperUserDashboard />} />
        </Route>
        
        <Route element={<PrivateRoute allowedRoles={['user']}/>}>
        <Route path="/user" element={<UserDashboard />} />  
        </Route>      

        <Route element={<PrivateRoute allowedRoles={['admin','superuser','user']}/>}>
          <Route path="/payroll" element={<Payroll />} />
        </Route>

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>

    </>
  )
}

export default App
