import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LogoAngelico from './LogoAngelico';
import fondo from '../assets/FondoPantallaIniciovf.png';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
    nacimiento: '',
    contacto: '',
    rol: 'usuario'
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarEdad = (fecha) => {
    const cumple = new Date(fecha);
    const hoy = new Date();
    const edad = hoy.getFullYear() - cumple.getFullYear();
    return edad >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.nacimiento ||
      !formData.contacto
    ) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (formData.password !== formData.confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!validarEdad(formData.nacimiento)) {
      setError('Debes ser mayor de edad para registrarte');
      return;
    }

    try {
      // Registro en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      // Registro en tabla usuarios
      const { error: dbError } = await supabase.from('usuarios').insert([
        {
          nombre: formData.nombre,
          email: formData.email,
          nacimiento: formData.nacimiento,
          contacto_preferido: formData.contacto,
          rol: 'usuario' // siempre por defecto
        }
      ]);

      if (dbError) throw dbError;

      setExito('Registro exitoso, redirigiendo...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />
      <LogoAngelico />

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="confirmar"
            placeholder="Confirmar contraseña"
            value={formData.confirmar}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="date"
            name="nacimiento"
            value={formData.nacimiento}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Medio de contacto preferido</option>
            <option value="email">Correo electrónico</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>

          {error && <p className="text-red-600">{error}</p>}
          {exito && <p className="text-green-600">{exito}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
