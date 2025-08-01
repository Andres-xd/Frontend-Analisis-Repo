import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';
import fondoLogin from '../assets/images/fondo_login.png';

// Requerido por react-modal
Modal.setAppElement('#root');

const citasSimuladas = [
  {
    fecha: '2025-07-30',
    nombre: 'Ana',
    apellido: 'López',
    telefono: '5555-1234',
    servicio: 'Tinte con reflejos',
    hora: '10:30 am',
    empleado: 'Empleado 1'
  },
  {
    fecha: '2025-07-31',
    nombre: 'Luis',
    apellido: 'Ramírez',
    telefono: '5555-5678',
    servicio: 'Corte y depilación',
    hora: '2:00 pm',
    empleado: 'Empleado 2'
  }
];

const Calendario = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [datosCita, setDatosCita] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const navigate = useNavigate();

  const abrirModal = (fecha) => {
    const formateada = fecha.toISOString().split('T')[0];
    const cita = citasSimuladas.find((c) => c.fecha === formateada);

    if (cita) {
      setDatosCita({ ...cita });
      setFechaSeleccionada(formateada);
      setModalAbierto(true);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setModoEdicion(false);
    setDatosCita(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosCita((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    alert('Cambios guardados (simulado)');
    setModoEdicion(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const fecha = date.toISOString().split('T')[0];
      const hayCita = citasSimuladas.some((c) => c.fecha === fecha);
      return hayCita ? <div className="punto-cita">●</div> : null;
    }
  };

  return (
    <div
      className="calendario-page"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="calendario-container">
        <button
          onClick={() => navigate('/inicio')}
          style={{
            marginBottom: '20px',
            backgroundColor: '#d4af37',
            color: 'black',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ← Volver al Inicio
        </button>

        <h2 style={{ fontFamily: 'Playfair Display', color: '#d4af37', textAlign: 'center' }}>
          Calendario de Citas
        </h2>

        <Calendar
          onClickDay={abrirModal}
          tileContent={tileContent}
        />

        <Modal
          isOpen={modalAbierto}
          onRequestClose={cerrarModal}
          contentLabel="Detalles de la Cita"
          className="modal-premium"
          overlayClassName="overlay-premium"
        >
          {datosCita ? (
            <>
              <h3>Cita para el {fechaSeleccionada}</h3>
              <form>
                <label>Nombre:</label>
                <input
                  name="nombre"
                  value={datosCita.nombre}
                  onChange={manejarCambio}
                  disabled={!modoEdicion}
                />

                <label>Apellido:</label>
                <input
                  name="apellido"
                  value={datosCita.apellido}
                  onChange={manejarCambio}
                  disabled={!modoEdicion}
                />

                <label>Teléfono:</label>
                <input
                  name="telefono"
                  value={datosCita.telefono}
                  onChange={manejarCambio}
                  disabled={!modoEdicion}
                />

                <label>Servicio:</label>
                <textarea
                  name="servicio"
                  rows="3"
                  value={datosCita.servicio}
                  onChange={manejarCambio}
                  disabled={!modoEdicion}
                />

                <label>Hora:</label>
                <input
                  name="hora"
                  value={datosCita.hora}
                  onChange={manejarCambio}
                  disabled={!modoEdicion}
                />

                <label>Empleado:</label>
                <input
                  name="empleado"
                  value={datosCita.empleado}
                  onChange={manejarCambio}
                  disabled={!modoEdicion}
                />
              </form>

              {!modoEdicion && (
                <button onClick={() => setModoEdicion(true)}>✏️ Hacer cambios</button>
              )}

              {modoEdicion && (
                <button onClick={guardarCambios}>💾 Guardar cambios</button>
              )}

              <br /><br />
              <button onClick={cerrarModal}>Cerrar</button>
            </>
          ) : (
            <>
              <h3>No hay cita registrada para este día.</h3>
              <button onClick={cerrarModal}>Cerrar</button>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Calendario;
