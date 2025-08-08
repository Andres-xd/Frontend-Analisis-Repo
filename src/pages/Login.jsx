// Importación de React y hooks
import React, { useState } from 'react';

// Importa el contexto de autenticación para usar la función login
import { useAuth } from '../context/AuthContext';

// Importa los estilos específicos de esta vista
import './Login.css';

// Importa la imagen de fondo para aplicar como background
import fondoLogin from '../assets/images/fondo_login.png';

// Componente funcional Login
const Login = () => {
  // Obtiene la función de login desde el contexto
  const { login } = useAuth();

  // Estados locales para capturar lo que el usuario escribe
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    login(usuario, contrasena); // Ejecuta la función login con los datos ingresados
  };

  return (
    // Contenedor general con imagen de fondo y centrado
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${fondoLogin})`, // Aplica la imagen de fondo desde import
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Caja del formulario con fondo translúcido */}
      <div className="login-container">
        {/* Título del formulario */}
        <h1 className="login-title">Inicio de Sesión</h1>

        {/* Formulario controlado */}
        <form onSubmit={handleSubmit}>
          {/* Campo de usuario */}
          <input
            className="login-input"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          {/* Campo de contraseña */}
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          {/* Botón para iniciar sesión */}
          <button className="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

// Exportación del componente para ser usado en App.js u otras rutas
export default Login;
