import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Auxiliaries from './pages/Auxiliaries'
import Surgeries from './pages/Surgeries'
import Financial from './pages/Financial'

function App() {
  // 🔧 Temporariamente simula um token para pular o login
  const devMode = true // coloque como false quando quiser voltar ao normal
  const [token, setToken] = React.useState(
    devMode ? 'FAKE_TOKEN' : localStorage.getItem('token') || ''
  )

  if (!token && !devMode) {
    return <Login onLogin={t => { setToken(t); localStorage.setItem('token', t) }} />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/auxiliaries" element={<Auxiliaries />} />
      <Route path="/surgeries" element={<Surgeries />} />
      <Route path="/financial" element={<Financial />} />
    </Routes>
  )
}

export default App
