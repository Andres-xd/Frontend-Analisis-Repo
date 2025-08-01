// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null al inicio
  const navigate = useNavigate();

  const login = (usuarioInput, contrasenaInput) => {
    // Simulación de usuarios
    const usuariosSimulados = [
      { usuario: 'admin', contrasena: '1234', rol: 'admin' },
      { usuario: 'super', contrasena: '1234', rol: 'superadmin' },
      { usuario: 'empleado1', contrasena: '1234', rol: 'empleado' },
    ];

    const encontrado = usuariosSimulados.find(
      (u) => u.usuario === usuarioInput && u.contrasena === contrasenaInput
    );

    if (encontrado) {
      setUsuario(encontrado);
      navigate('/inicio');
    } else {
      alert('Credenciales inválidas');
    }
  };

  const logout = () => {
    setUsuario(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
