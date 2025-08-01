import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import fondoHome from '../assets/images/fondo_home.png'; 

const Home = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const rol = usuario?.rol;

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${fondoHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="home-container">
        <h2 className="home-title">Bienvenido, {usuario?.usuario}</h2>
        <p className="home-role">Rol: {rol}</p>

        <div className="button-group">
          <button onClick={() => navigate('/calendario')}>📅 Calendario</button>

          {(rol === 'admin' || rol === 'superadmin') && (
            <button onClick={() => navigate('/reporte')}>📊 Reporte</button>
          )}

          {(rol === 'admin' || rol === 'superadmin') && (
            <button onClick={() => navigate('/usuario')}>👤 Usuario</button>
          )}

          <button onClick={() => navigate('/agendar')}>➕ Agendar Cita</button>
        </div>

        <button className="logout-button" onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Home;
