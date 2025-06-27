
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LogoAngelico from './LogoAngelico';
import fondo from '../assets/FondoPantallaIniciovf.png';
import { paises } from '../data/paises';

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
    aceptaTerminos: false,
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validarEdad = (fecha) => {
    const cumple = new Date(fecha);
    const hoy = new Date();
    const edad = hoy.getFullYear() - cumple.getFullYear();
    return edad >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    const {
      nombre, apellidos, email, password, confirmar,
      nacimiento, idioma, direccion, ciudad, estado,
      pais, codigoPostal, telefono, contacto, aceptaTerminos
    } = formData;

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    if (!nombre || !apellidos || !email || !password || !confirmar || !nacimiento || !idioma || !pais || !contacto) {
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
        password,
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from('usuarios').insert([{
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

      <div className="absolute top-6 right-6 z-30">
        <button onClick={() => navigate('/')} className="text-2xl font-bold text-red-500">✖</button>
      </div>

      <div className="relative z-10 bg-white/90 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input type="password" name="confirmar" placeholder="Confirmar contraseña" value={formData.confirmar} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <select name="idioma" value={formData.idioma} onChange={handleChange} className="px-4 py-2 border rounded-lg">
              <option value="">Idioma Preferido</option>
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Portugués">Portugués</option>
              <option value="Francés">Francés</option>
              <option value="Otro">Otro</option>
            </select>
            <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <input name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
            <select name="pais" value={formData.pais} onChange={handleChange} className="px-4 py-2 border rounded-lg">
              <option value="">Selecciona un país</option>
              {paises.map((pais, index) => (
                <option key={index} value={pais}>{pais}</option>
              ))}
            </select>
            <select name="contacto" value={formData.contacto} onChange={handleChange} className="px-4 py-2 border rounded-lg">
              <option value="">Medio de contacto preferido</option>
              <option value="email">Correo electrónico</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleChange} />
            <span className="text-sm">
              Acepto los <a href="/terminos" className="text-blue-600 underline">Términos y condiciones</a> y la <a href="/politica" className="text-blue-600 underline">Política de privacidad</a>.
            </span>
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}
          {exito && <p className="text-green-600 mt-2">{exito}</p>}

          <button type="submit" className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium">
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿Ya tienes cuenta? <a href="/login" className="text-purple-700 underline">Inicia sesión aquí</a>
        </p>

        <p className="text-center text-sm mt-2">
          <a href="/" className="text-blue-600 underline">Volver al Inicio</a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
