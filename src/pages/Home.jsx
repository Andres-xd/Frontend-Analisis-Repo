import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// FONDOS Y IMAGENES
import fondoHome from '../assets/images/fondo_home.png';
import imagen1 from '../assets/images/imagen_1.jpeg';
import imagen2 from '../assets/images/imagen_2.jpeg';
import imagen3 from '../assets/images/imagen_3.jpeg';
import imagen4 from '../assets/images/imagen_4.jpeg';

const Home = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const rol = usuario?.rol;
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${fondoHome})`,
      }}
    >
      <div className="home-container">

        {/* PARTE AZUL */}
        <div className="top-buttons">
          <button onClick={() => navigate('/calendario')}>📅 Calendario</button>
          {(rol === 'admin' || rol === 'superadmin') && (
            <button onClick={() => navigate('/reporte')}>📊 Reporte</button>
          )}
        </div>

        {/* PARTE VERDE*/}
        <div className="user-menu">
          <button className="user-button" onClick={() => setMenuAbierto(!menuAbierto)}>👤 Usuario</button>
          {menuAbierto && (
            <div className="user-dropdown">
              <button onClick={() => navigate('/usuario')}>Mi perfil</button>
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          )}
        </div>

        {/* AREA GRIS*/}
        <div className="welcome-message">
          <h2 className="home-title">Bienvenido, <span>{usuario?.usuario}</span></h2>
          <p className="home-role">Tu rol actual es: <strong>{rol}</strong></p>
        </div>

        {/* AREA AMARILLA */}
        <div className="gallery">
          {[imagen1, imagen2, imagen3, imagen4].map((img, index) => (
            <img key={index} src={img} alt={`imagen_${index + 1}`} />
          ))}
        </div>

        {/* AREA ROJO */}
        <div className="agendar-cita">
          <button onClick={() => navigate('/agendar')}>➕ Agendar Cita</button>
        </div>

      </div>
    </div>
  );
};

export default Home;
