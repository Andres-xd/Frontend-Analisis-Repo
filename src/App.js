import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import Home from './pages/Home';
import User from './pages/User';
import Calendario from './pages/Calendario';
import Reporte from './pages/Reporte';
import Agendar from './pages/Agendar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/usuario" element={<User />} />
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/reporte" element={<Reporte />} />
      <Route path="/agendar" element={<Agendar />} />
    </Routes>
  );
}

export default App;
