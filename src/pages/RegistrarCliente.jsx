import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarCliente.css';

const RegistrarCliente = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
  });

  const [errores, setErrores] = useState({});

  // Handlers
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // borrar error del campo editado
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  // Reglas simples
  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio.';
    if (!form.apellido.trim()) e.apellido = 'El apellido es obligatorio.';
    if (!/^\d{7,15}$/.test(form.telefono)) e.telefono = 'Ingresa solo dígitos (7 a 15).';
    if (form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      e.correo = 'Correo no válido.';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validar()) return;

    // Simulación de registro
    const nuevoCliente = {
      id: Date.now(),
      ...form,
    };
    console.log('Cliente registrado:', nuevoCliente);
    alert('Cliente registrado (simulación).');

    // Reset
    setForm({ nombre: '', apellido: '', telefono: '', correo: '' });
    setErrores({});
  };

  const esValido =
    form.nombre.trim() &&
    form.apellido.trim() &&
    /^\d{7,15}$/.test(form.telefono) &&
    (!form.correo || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo));

  return (
    <div className="regcli-page">
      <div className="regcli-container">
        {/* Botones superiores (sin cerrar sesión) */}
        <div className="regcli-top-buttons">
          <button
            type="button"
            className="btn-inicio"
            onClick={() => navigate('/inicio')}
          >
            Inicio
          </button>

          <button
            type="button"
            className="btn-cita"
            onClick={() => navigate('/agendar')}
          >
            Registrar Cita
          </button>
        </div>

        <h2 className="regcli-title">Registrar Cliente</h2>

        <form className="regcli-form" onSubmit={onSubmit} noValidate>
          {/* Nombre */}
          <div className={`campo ${errores.nombre ? 'con-error' : ''}`}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ingresa el nombre"
              value={form.nombre}
              onChange={onChange}
            />
            {errores.nombre && <small className="error-text">{errores.nombre}</small>}
          </div>

          {/* Apellido */}
          <div className={`campo ${errores.apellido ? 'con-error' : ''}`}>
            <label htmlFor="apellido">Apellido</label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              placeholder="Ingresa el apellido"
              value={form.apellido}
              onChange={onChange}
            />
            {errores.apellido && <small className="error-text">{errores.apellido}</small>}
          </div>

          {/* Teléfono */}
          <div className={`campo ${errores.telefono ? 'con-error' : ''}`}>
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              inputMode="tel"
              placeholder="Ejemplo: 41234567"
              value={form.telefono}
              onChange={onChange}
            />
            {errores.telefono && <small className="error-text">{errores.telefono}</small>}
          </div>

          {/* Correo */}
          <div className={`campo ${errores.correo ? 'con-error' : ''}`}>
            <label htmlFor="correo">Correo Electrónico (Opcional)</label>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.correo}
              onChange={onChange}
            />
            {errores.correo && <small className="error-text">{errores.correo}</small>}
          </div>

          <button className="regcli-button" type="submit" disabled={!esValido}>
            Registrar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarCliente;
