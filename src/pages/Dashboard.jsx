import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [{name:'Jan',cirurgias:30,pagamentos:2000},{name:'Feb',cirurgias:25,pagamentos:1500},{name:'Mar',cirurgias:40,pagamentos:3000}]

export default function Dashboard(){
  return <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded shadow">Cirurgias solicitadas: <span className="font-bold">30</span></div>
      <div className="bg-white p-4 rounded shadow">Pagamentos pendentes: <span className="font-bold">5</span></div>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2">Cirurgias vs Pagamentos</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="cirurgias" stroke="#8884d8"/>
        <Line type="monotone" dataKey="pagamentos" stroke="#82ca9d"/>
      </LineChart>
    </div>
  </div>
}
