import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './User.css';
import fondoHome from '../assets/images/fondo_home.png';

const User = () => {
  const { usuario } = useAuth();
  const rol = usuario?.rol;

  const [empleados, setEmpleados] = useState([
    { nombre: 'Carlos', rol: 'empleado' },
    { nombre: 'Marta', rol: 'empleado' },
  ]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState('empleado');

  const agregarEmpleado = (e) => {
    e.preventDefault();
    if (!nuevoNombre) {
      alert('Por favor ingresa un nombre');
      return;
    }

    setEmpleados([...empleados, { nombre: nuevoNombre, rol: nuevoRol }]);
    setNuevoNombre('');
    setNuevoRol('empleado');
  };

  if (rol === 'empleado') {
    return (
      <div className="user-page" style={{ backgroundImage: `url(${fondoHome})` }}>
        <div className="user-container">
          <h2 className="user-title">👤 Mi Perfil</h2>
          <p><strong>Usuario:</strong> {usuario.usuario}</p>
          <p><strong>Rol:</strong> {usuario.rol}</p>
          <p className="user-warning">⚠️ No tienes permisos para gestionar usuarios.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page" style={{ backgroundImage: `url(${fondoHome})` }}>
      <div className="user-container">
        <h2 className="user-title">👥 Gestión de Usuarios</h2>

        <h3>📋 Empleados Registrados:</h3>
        <ul className="user-list">
          {empleados.map((emp, index) => (
            <li key={index}>👤 {emp.nombre} — Rol: {emp.rol}</li>
          ))}
        </ul>

        <h3>➕ Agregar Nuevo Empleado</h3>
        <form onSubmit={agregarEmpleado} className="user-form">
          <input
            type="text"
            placeholder="Nombre del empleado"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <select
            value={nuevoRol}
            onChange={(e) => setNuevoRol(e.target.value)}
          >
            <option value="empleado">empleado</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default User;
