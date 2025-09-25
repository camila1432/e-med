import React, {useState} from 'react'
import axios from 'axios'
const API='http://localhost:8000'
export default function Login({onLogin}){
  const [email,setEmail]=useState('admin@hospital.local')
  const [pw,setPw]=useState('admin123')
  const [loading,setLoading]=useState(false)

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await axios.post(API+'/auth/login',{email,password:pw})
      if(res.data.access_token) onLogin(res.data.access_token)
      else alert('login failed')
    }catch(e){ alert('login failed') }
    setLoading(false)
  }

  return <div className="flex h-screen items-center justify-center bg-gray-100">
    <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-80">
      <h1 className="text-2xl mb-4 font-bold text-center">Paciente Cirúrgico</h1>
      <input className="border p-2 mb-3 w-full rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="border p-2 mb-3 w-full rounded" type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}/>
      <button disabled={loading} className="bg-blue-600 text-white w-full p-2 rounded">{loading?'Carregando...':'Login'}</button>
    </form>
  </div>
}
