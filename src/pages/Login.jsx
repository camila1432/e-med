import React, { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:8000'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@hospital.local')
  const [pw, setPw] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(API + '/auth/login', { email, password: pw })
      if (res.data.access_token) {
        onLogin(res.data.access_token)
      } else {
        setError('Login falhou. Verifique seus dados.')
      }
    } catch (e) {
      setError('Login falhou. Verifique seus dados.')
    }
    setLoading(false)
  }

  // Simulação simples do login via Google (você deve integrar com OAuth real)
  function loginWithGoogle() {
    alert('Aqui você pode integrar o login via Google OAuth')
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl mb-4 font-bold text-center">Paciente Cirúrgico</h1>

        {error && <div className="mb-3 text-red-600 text-center">{error}</div>}

        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          type="password"
          placeholder="Senha"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded mb-3"
          type="submit"
        >
          {loading ? 'Carregando...' : 'Login'}
        </button>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="bg-red-600 text-white w-full p-2 rounded mb-3"
        >
          Entrar com Google
        </button>

        <div className="text-center text-sm text-gray-600">
          <a href="#" className="text-blue-600 hover:underline mr-2">Esqueci minha senha</a>
          |
          <a href="#" className="text-blue-600 hover:underline ml-2">Criar uma conta</a>
        </div>
      </form>
    </div>
  )
}
