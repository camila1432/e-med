import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Pacientes';
import Auxiliaries from './pages/Agendamento';
import Auxiliaries from './pages/Relatorios';
import Surgeries from './pages/Cirurgia';
import Financial from './pages/Financeiro';
import Layout from './components/layout'; 

function App() {
  const devMode = true;
  const [token, setToken] = React.useState(
    devMode ? 'FAKE_TOKEN' : localStorage.getItem('token') || ''
  );

  if (!token && !devMode) {
    return (
      <Login
        onLogin={(t) => {
          setToken(t);
          localStorage.setItem('token', t);
        }}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          <Layout currentPageName="Dashboard">
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/patients"
        element={
          <Layout currentPageName="Pacientes">
            <Patients />
          </Layout>
        }
      />
      <Route
        path="/auxiliaries"
        element={
          <Layout currentPageName="Auxiliares">
            <Auxiliaries />
          </Layout>
        }
      />
      <Route
        path="/surgeries"
        element={
          <Layout currentPageName="Cirurgias">
            <Surgeries />
          </Layout>
        }
      />
      <Route
        path="/financial"
        element={
          <Layout currentPageName="Financeiro">
            <Financial />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
