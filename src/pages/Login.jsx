import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import fondoLogin from '../assets/images/fondo_login.png';

const Login = () => {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(usuario, contrasena);
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="login-container">
        <h1 className="login-title">Inicio de Sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className="login-button" type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
