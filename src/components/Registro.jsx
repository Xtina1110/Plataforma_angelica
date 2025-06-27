import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondo from '../assets/FondoPantallaIniciovf.png';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';

import paises from './data/paises';
import idiomas from './data/idiomas';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmar: '',
    nacimiento: '',
    telefono: '',
    idioma: '',
    direccion: '',
    ciudad: '',
    estado: '',
    pais: '',
    codigo_postal: '',
    contacto: '',
    acepta: false
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
      nombre, apellidos, email, password, confirmar, nacimiento,
      telefono, idioma, direccion, ciudad, estado, pais, codigo_postal, contacto, acepta
    } = formData;

    if (!acepta) return setError('Debes aceptar los términos y condiciones');
    if (password !== confirmar) return setError('Las contraseñas no coinciden');
    if (!validarEdad(nacimiento)) return setError('Debes ser mayor de edad');
    if (!nombre || !apellidos || !email || !password || !nacimiento || !contacto) return setError('Faltan campos obligatorios');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from('usuarios').insert([{
        nombre,
        apellidos,
        email,
        nacimiento,
        telefono,
        idioma,
        direccion,
        ciudad,
        estado,
        pais,
        codigo_postal,
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
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center px-4"
      style={{
        backgroundImage: `url(${fondoMarmol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />
      <div
        className="absolute inset-0 bg-no-repeat bg-left opacity-30 z-0"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'contain'
        }}
      />
      <LogoAngelico />

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-6 text-xl font-bold text-red-600 hover:text-red-800"
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="col-span-2 px-4 py-2 border rounded-lg" />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="password" name="confirmar" placeholder="Confirmar contraseña" value={formData.confirmar} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="idioma" value={formData.idioma} onChange={handleChange} className="px-4 py-2 border rounded-lg">
            <option value="">Idioma Preferente</option>
            <option value="Español">Español</option>
            <option value="Inglés">Inglés</option>
            <option value="Francés">Francés</option>
            <option value="Portugués">Portugués</option>
            <option value="Alemán">Alemán</option>
          </select>
          <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="col-span-2 px-4 py-2 border rounded-lg" />
          <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input name="estado" placeholder="Estado/Provincia" value={formData.estado} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="pais" value={formData.pais} onChange={handleChange} className="px-4 py-2 border rounded-lg">
            <option value="">País</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="México">México</option>
            <option value="España">España</option>
            <option value="Colombia">Colombia</option>
            <option value="Argentina">Argentina</option>
          </select>
          <input name="codigo_postal" placeholder="Código Postal" value={formData.codigo_postal} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="contacto" value={formData.contacto} onChange={handleChange} className="col-span-2 px-4 py-2 border rounded-lg">
            <option value="">Medio de contacto preferido</option>
            <option value="email">Correo electrónico</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>
          <div className="col-span-2 flex items-center space-x-2">
            <input type="checkbox" name="acepta" checked={formData.acepta} onChange={handleChange} />
            <span>
              Acepto los <a href="/terminos" className="text-purple-700 underline">Términos y condiciones</a> y la{' '}
              <a href="/politica" className="text-purple-700 underline">Política de privacidad</a>.
            </span>
          </div>

          {error && <p className="col-span-2 text-red-600">{error}</p>}
          {exito && <p className="col-span-2 text-green-600">{exito}</p>}

          <button type="submit" className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-purple-700">
          <a href="/" className="mr-4 underline">Volver al Inicio</a>
          ¿Ya tienes cuenta? <a href="/login" className="underline">Inicia sesión</a>
        </div>
      </div>

      <FooterLegal />
    </div>
  );
};

export default Registro;
