import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const User = () => {
  const { usuario } = useAuth();
  const rol = usuario?.rol;

  // Solo para admin/superadmin
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
      <div style={{ padding: '40px' }}>
        <h2>Mi perfil</h2>
        <p><strong>Usuario:</strong> {usuario.usuario}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <p>⚠️ No tienes permisos para gestionar usuarios.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Gestión de Usuarios</h2>

      {/* Lista de empleados */}
      <h3>Empleados Registrados:</h3>
      <ul>
        {empleados.map((emp, index) => (
          <li key={index}>
            👤 {emp.nombre} - Rol: {emp.rol}
          </li>
        ))}
      </ul>

      {/* Formulario para agregar nuevos empleados */}
      <h3>Agregar Nuevo Empleado</h3>
      <form onSubmit={agregarEmpleado}>
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
          <option value="admin">admin</option> {/* opcional */}
        </select>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default User;
