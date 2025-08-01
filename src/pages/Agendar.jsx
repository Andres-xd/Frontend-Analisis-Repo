import React, { useState } from 'react';
import './Agendar.css';
import fondoLogin from '../assets/images/fondo_login.png';

const Agendar = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [empleado, setEmpleado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !telefono || !servicio || !fecha || !hora || !empleado) {
      alert('Por favor completa todos los campos');
      return;
    }
    alert('Cita agendada (simulado)');
    console.log({ nombre, apellido, telefono, servicio, fecha, hora, empleado });
  };

  return (
    <div
      className="agendar-page"
      style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div className="agendar-container">
        <h2 className="agendar-title">Agendar Nueva Cita</h2>
        <form onSubmit={handleSubmit} className="agendar-form">
          <div className="form-grid">
            <div>
              <label>Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
              <label>Apellido:</label>
              <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div>
              <label>Teléfono:</label>
              <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div>
              <label>Fecha (dd/mm/aaaa):</label>
              <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
              <label>Hora (12h - am/pm):</label>
              <input type="text" value={hora} onChange={(e) => setHora(e.target.value)} />
            </div>
            <div>
              <label>Empleado asignado:</label>
              <select value={empleado} onChange={(e) => setEmpleado(e.target.value)}>
                <option value="">-- Selecciona un empleado --</option>
                <option value="Empleado 1">Empleado 1</option>
                <option value="Empleado 2">Empleado 2</option>
              </select>
            </div>
          </div>
          <div>
            <label>Servicio (descripción libre):</label>
            <textarea
              rows="3"
              placeholder="Escribe el servicio que se realizará"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            />
          </div>
          <button type="submit" className="agendar-button">Agendar Cita</button>
        </form>
      </div>
    </div>
  );
};

export default Agendar;
