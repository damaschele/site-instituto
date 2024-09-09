// eslint-disable-next-line no-unused-vars
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa o CSS do calendário
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Dados fictícios para eventos, cursos e livros
const data = [
  { name: 'Jan', eventos: 4000, cursos: 2400, livros: 2400 },
  { name: 'Feb', eventos: 3000, cursos: 1398, livros: 2210 },
  { name: 'Mar', eventos: 2000, cursos: 9800, livros: 2290 },
  { name: 'Apr', eventos: 2780, cursos: 3908, livros: 2000 },
  { name: 'May', eventos: 1890, cursos: 4800, livros: 2181 },
  { name: 'Jun', eventos: 2390, cursos: 3800, livros: 2500 },
  { name: 'Jul', eventos: 3490, cursos: 4300, livros: 2100 },
  { name: 'Ags', eventos: 3490, cursos: 4300, livros: 2100 },
];

const GradientAreaChart = () => {
  return (
    <div className="flex space-x-8">
      <div className="w-full lg:w-2/3">
        <ResponsiveContainer width="100%" height={405}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEventos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCursos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLivros" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="eventos" stroke="#8884d8" fillOpacity={1} fill="url(#colorEventos)" />
            <Area type="monotone" dataKey="cursos" stroke="#82ca9d" fillOpacity={1} fill="url(#colorCursos)" />
            <Area type="monotone" dataKey="livros" stroke="#ffc658" fillOpacity={1} fill="url(#colorLivros)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-md shadow-lg p-4 border-none">
          <h3 className="text-xl font-semibold mb-4">Calendário</h3>
          <Calendar className="border-0 w-full bg-none"/>
        </div>
      </div>
    </div>
  );
};

export default GradientAreaChart;
