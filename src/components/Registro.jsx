import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import paises from '../data/paises';
import idiomas from '../data/idiomas';
import LogoAngelico from './LogoAngelico';
import fondo from '../assets/Fondomarmoleado.jpg';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmar: '',
    nacimiento: '',
    idioma: '',
    direccion: '',
    ciudad: '',
    estado: '',
    pais: '',
    codigoPostal: '',
    telefono: '',
    contacto: '',
    aceptaTerminos: false
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validarEdad = (fecha) => {
    const hoy = new Date();
    const cumple = new Date(fecha);
    const edad = hoy.getFullYear() - cumple.getFullYear();
    return edad >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    const {
      nombre, apellidos, email, password, confirmar, nacimiento, idioma,
      direccion, ciudad, estado, pais, codigoPostal, telefono, contacto, aceptaTerminos
    } = formData;

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    if (!nombre || !apellidos || !email || !password || !confirmar || !nacimiento || !idioma || !contacto) {
      setError('Todos los campos obligatorios deben estar completos');
      return;
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!validarEdad(nacimiento)) {
      setError('Debes ser mayor de edad para registrarte');
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) throw authError;

      const userId = authData?.user?.id;

      const { error: dbError } = await supabase.from('usuarios').insert([{
        id: userId,
        nombre,
        apellidos,
        email,
        nacimiento,
        idioma,
        direccion,
        ciudad,
        estado,
        pais,
        codigo_postal: codigoPostal,
        telefono,
        contacto_preferido: contacto
      }]);

      if (dbError) throw dbError;

      setExito('Registro exitoso. Redirigiendo...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-y-auto"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/70 z-0" />
      <LogoAngelico />

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 text-red-600 text-3xl font-bold z-30"
      >
        ✖
      </button>

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-blue-700 underline z-30"
      >
        Volver al Inicio
      </button>

      <div className="relative z-10 max-w-4xl mx-auto mt-24 bg-white/90 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Nombre</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Apellidos</label>
            <input name="apellidos" value={formData.apellidos} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Correo electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Confirmar contraseña</label>
            <input type="password" name="confirmar" value={formData.confirmar} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Idioma preferente</label>
            <select name="idioma" value={formData.idioma} onChange={handleChange} className="w-full border rounded-lg p-2">
              <option value="">Selecciona un idioma</option>
              {idiomas.map((idioma, i) => (
                <option key={i} value={idioma}>{idioma}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Teléfono</label>
            <input name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Dirección</label>
            <input name="direccion" value={formData.direccion} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Ciudad</label>
            <input name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Estado / Provincia</label>
            <input name="estado" value={formData.estado} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>Código Postal</label>
            <input name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label>País</label>
            <select name="pais" value={formData.pais} onChange={handleChange} className="w-full border rounded-lg p-2">
              <option value="">Selecciona un país</option>
              {paises.map((pais, i) => (
                <option key={i} value={pais}>{pais}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Medio de contacto preferido</label>
            <select name="contacto" value={formData.contacto} onChange={handleChange} className="w-full border rounded-lg p-2">
              <option value="">Selecciona medio de contacto</option>
              <option value="email">Correo electrónico</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>
          <div className="col-span-2 flex items-center">
            <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleChange} />
            <label className="ml-2 text-sm">
              Acepto los <a href="/terminos" className="text-purple-600 underline">Términos y condiciones</a> y la <a href="/privacidad" className="text-purple-600 underline">Política de privacidad</a>.
            </label>
          </div>
          {error && <p className="col-span-2 text-red-600 text-sm">{error}</p>}
          {exito && <p className="col-span-2 text-green-600 text-sm">{exito}</p>}

          <button
            type="submit"
            className="col-span-2 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-purple-600 underline">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
