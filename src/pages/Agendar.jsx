import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Agendar.css';

/* ========= Simulaciones (reemplazar por datos reales después) ========= */
const SERVICIOS = [
  { id: 'corte', nombre: 'Corte de cabello' },
  { id: 'tinte', nombre: 'Tinte' },
  { id: 'peinado', nombre: 'Peinado' },
  { id: 'manicure', nombre: 'Manicure' },
];

const CLIENTES = [
  { id: 1, nombre: 'María López', telefono: '50212345678' },
  { id: 2, nombre: 'Marco Díaz', telefono: '50199887766' },
  { id: 3, nombre: 'Ana Pérez', telefono: '50255551234' },
  { id: 4, nombre: 'Andrés Flores', telefono: '50240000000' },
];

/* ========= Utilidades ========= */
const generarHoras = (inicio = 8, fin = 18, pasoMin = 30) => {
  const out = [];
  for (let h = inicio; h <= fin; h++) {
    for (let m = 0; m < 60; m += pasoMin) {
      if (h === fin && m > 0) break;
      const ampm = h < 12 ? 'am' : 'pm';
      const hr12 = h % 12 === 0 ? 12 : h % 12;
      const hh = String(hr12).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      out.push(`${hh}:${mm} ${ampm}`);
    }
  }
  return out;
};

const useDebouncedValue = (valor, delay = 300) => {
  const [debounced, setDebounced] = useState(valor);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(valor), delay);
    return () => clearTimeout(id);
  }, [valor, delay]);
  return debounced;
};

/* ========= Componente ========= */
const Agendar = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [fecha, setFecha] = useState('');             // YYYY-MM-DD
  const [hora, setHora] = useState('');               // "hh:mm am/pm"
  const [servicioId, setServicioId] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Cliente (autocompletado)
  const [textoCliente, setTextoCliente] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // {id, nombre, telefono}
  const [abiertoSugerencias, setAbiertoSugerencias] = useState(false);

  // Errores
  const [errores, setErrores] = useState({});

  // Opciones de hora
  const opcionesHora = useMemo(() => generarHoras(8, 18, 30), []);

  // Autocompletado clientes
  const textoClienteDebounced = useDebouncedValue(textoCliente, 300);
  const coincidencias = useMemo(() => {
    const q = textoClienteDebounced.trim().toLowerCase();
    if (!q) return [];
    return CLIENTES.filter(
      c =>
        c.nombre.toLowerCase().includes(q) ||
        c.telefono.includes(q)
    ).slice(0, 8);
  }, [textoClienteDebounced]);

  const onElegirCliente = (cli) => {
    setClienteSeleccionado(cli);
    setTextoCliente(`${cli.nombre} (${cli.telefono})`);
    setAbiertoSugerencias(false);
    setErrores(prev => ({ ...prev, cliente: undefined }));
  };

  useEffect(() => {
    if (!textoCliente) setClienteSeleccionado(null);
  }, [textoCliente]);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      const cont = document.querySelector('.cliente-autocomplete');
      if (cont && !cont.contains(e.target)) setAbiertoSugerencias(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Validación
  const validar = () => {
    const e = {};
    if (!fecha) e.fecha = 'Selecciona una fecha.';
    if (!hora) e.hora = 'Selecciona una hora.';
    if (!servicioId) e.servicioId = 'Selecciona un servicio.';
    if (!clienteSeleccionado) e.cliente = 'Debes elegir un cliente de la lista.';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validar()) return;

    // Simulación de registro
    console.log({
      fecha,
      hora,
      servicioId,
      clienteId: clienteSeleccionado.id,
      observaciones,
    });
    alert('Cita registrada (simulación).');

    // Reset
    setFecha('');
    setHora('');
    setServicioId('');
    setTextoCliente('');
    setClienteSeleccionado(null);
    setObservaciones('');
    setErrores({});
  };

  return (
    <div className="agendar-page">
      <div className="agendar-container">
        {/* Botones superiores */}
        <div className="agendar-botones-top">
          <button
            type="button"
            className="btn-inicio"
            onClick={() => navigate('/inicio')}
          >
            Inicio
          </button>

          <button
            type="button"
            className="btn-registrar-cliente"
            onClick={() => navigate('/registrar-cliente')} // ajusta la ruta real cuando la tengas
          >
            + Registrar Cliente
          </button>
        </div>

        <h2 className="agendar-title">Agendar Nueva Cita</h2>

        <form className="agendar-form" onSubmit={onSubmit} noValidate>
          {/* Fila 1: Fecha y Hora */}
          <div className="form-grid two-cols">
            <div className={`campo ${errores.fecha ? 'con-error' : ''}`}>
              <label htmlFor="fecha">Fecha de la Cita <span className="req">*</span></label>
              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => { setFecha(e.target.value); setErrores(s => ({ ...s, fecha: undefined })); }}
              />
              {errores.fecha && <small className="error-text">{errores.fecha}</small>}
            </div>

            <div className={`campo ${errores.hora ? 'con-error' : ''}`}>
              <label htmlFor="hora">Hora de la Cita <span className="req">*</span></label>
              <select
                id="hora"
                value={hora}
                onChange={(e) => { setHora(e.target.value); setErrores(s => ({ ...s, hora: undefined })); }}
                disabled={!fecha}
              >
                <option value="">{fecha ? 'Selecciona hora...' : 'Primero selecciona fecha'}</option>
                {opcionesHora.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              {errores.hora && <small className="error-text">{errores.hora}</small>}
            </div>
          </div>

          {/* Servicio */}
          <div className={`campo ${errores.servicioId ? 'con-error' : ''}`}>
            <label htmlFor="servicio">Servicio a Realizar <span className="req">*</span></label>
            <select
              id="servicio"
              value={servicioId}
              onChange={(e) => { setServicioId(e.target.value); setErrores(s => ({ ...s, servicioId: undefined })); }}
            >
              <option value="">Seleccionar servicio...</option>
              {SERVICIOS.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
            {errores.servicioId && <small className="error-text">{errores.servicioId}</small>}
          </div>

          {/* Cliente con autocompletado */}
          <div className={`campo cliente-autocomplete ${errores.cliente ? 'con-error' : ''}`}>
            <label htmlFor="cliente">Cliente <span className="req">*</span></label>
            <input
              id="cliente"
              type="text"
              placeholder="Busca por nombre o teléfono..."
              value={textoCliente}
              onChange={(e) => { setTextoCliente(e.target.value); setAbiertoSugerencias(true); }}
              onFocus={() => setAbiertoSugerencias(true)}
              autoComplete="off"
            />
            {abiertoSugerencias && !!textoCliente.trim() && (
              <div className="sugerencias" role="listbox" aria-label="Sugerencias de clientes">
                {coincidencias.length > 0 ? (
                  coincidencias.map(cli => (
                    <button
                      type="button"
                      key={cli.id}
                      className="sugerencia-item"
                      onClick={() => onElegirCliente(cli)}
                    >
                      <span className="nombre">{cli.nombre}</span>
                      <span className="tel">{cli.telefono}</span>
                    </button>
                  ))
                ) : (
                  <div className="sin-resultados">Sin resultados</div>
                )}
              </div>
            )}
            {errores.cliente && <small className="error-text">{errores.cliente}</small>}
          </div>

          {/* Observaciones */}
          <div className="campo">
            <label htmlFor="obs">Observaciones (Opcional)</label>
            <textarea
              id="obs"
              rows="3"
              placeholder="Comentarios adicionales sobre la cita..."
              maxLength={500}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>

          <button
            className="agendar-button"
            type="submit"
            disabled={!fecha || !hora || !servicioId || !clienteSeleccionado}
            title={!fecha || !hora || !servicioId || !clienteSeleccionado ? 'Completa los campos obligatorios' : 'Registrar cita'}
          >
            Registrar Cita
          </button>
        </form>
      </div>
    </div>
  );
};

export default Agendar;
