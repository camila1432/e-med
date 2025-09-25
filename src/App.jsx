import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Cirurgia from './pages/Cirurgia';
import Financeiro from './pages/Financeiro';
import Agendamento from './pages/Agendamento';
import Relatorios from './pages/Relatorios';
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
        path="/pacientes"
        element={
          <Layout currentPageName="Pacientes">
            <Pacientes />
          </Layout>
        }
      />
      <Route
        path="/cirurgias"
        element={
          <Layout currentPageName="Cirurgias">
            <Cirurgia />
          </Layout>
        }
      />
      <Route
        path="/financeiro"
        element={
          <Layout currentPageName="Financeiro">
            <Financeiro />
          </Layout>
        }
      />
      <Route
        path="/agendamento"
        element={
          <Layout currentPageName="Agendamento">
            <Agendamento />
          </Layout>
        }
      />
      <Route
        path="/relatorios"
        element={
          <Layout currentPageName="Relatórios">
            <Relatorios />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
