import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Auxiliaries from './pages/Auxiliaries'
import Surgeries from './pages/Surgeries'
import Financial from './pages/Financial'

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token')||'')
  if(!token) return <Login onLogin={t=>{setToken(t); localStorage.setItem('token',t)}} />

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/auxiliaries" element={<Auxiliaries />} />
      <Route path="/surgeries" element={<Surgeries />} />
      <Route path="/financial" element={<Financial />} />
    </Routes>
  )
}

export default App
