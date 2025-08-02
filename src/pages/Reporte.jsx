import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Reporte.css';
import fondoHome from '../assets/images/fondo_home.png';

const Reporte = () => {
  const { usuario } = useAuth();
  const rol = usuario?.rol;
  const navigate = useNavigate();

  if (rol === 'empleado') {
    return (
      <div
        className="reporte-page"
        style={{ backgroundImage: `url(${fondoHome})` }}
      >
        <div className="reporte-container">
          <h2 className="reporte-title">🚫 Acceso restringido</h2>
          <p>No tienes permiso para ver los reportes.</p>
          <button onClick={() => navigate('/inicio')}>← Volver al inicio</button>
        </div>
      </div>
    );
  }

  // Datos simulados
  const totalCitas = 8;
  const totalIngresos = 840;
  const serviciosPopulares = [
    'Corte de cabello',
    'Tinte',
    'Manicure'
  ];
  const empleadoTop = 'Empleado 1';

  return (
    <div
      className="reporte-page"
      style={{ backgroundImage: `url(${fondoHome})` }}
    >
      <div className="reporte-container">
        <button
          onClick={() => navigate('/inicio')}
          className="reporte-btn"
        >
          ← Volver al inicio
        </button>

        <h2 className="reporte-title">📊 Reporte de Actividad</h2>

        <div className="reporte-box">
          <h3>📋 Resumen</h3>
          <p><strong>Total de Citas Atendidas:</strong> {totalCitas}</p>
          <p><strong>Total de Ingresos:</strong> Q{totalIngresos}</p>
          <p><strong>Empleado más activo:</strong> {empleadoTop}</p>
        </div>

        <div className="reporte-box">
          <h3>🏆 Servicios Más Solicitados</h3>
          <ol>
            {serviciosPopulares.map((servicio, index) => (
              <li key={index}>{servicio}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Reporte;
