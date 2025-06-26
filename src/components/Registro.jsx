import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondo from '../assets/FondoPantallaIniciovf.png';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    nacimiento: '',
    idioma: '',
    direccion: '',
    ciudad: '',
    estado: '',
    pais: '',
    codigo_postal: '',
    acepta: false,
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error: dbError } = await supabase.from('usuarios').insert([{
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        password: formData.password,
        nacimiento: formData.nacimiento,
        idioma: formData.idioma,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        estado: formData.estado,
        pais: formData.pais,
        codigo_postal: formData.codigo_postal,
        rol: 'usuario',
      }]);

      if (dbError) throw dbError;

      setExito('Registro exitoso');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />
      <LogoAngelico />

      {/* ✖ botón de cerrar */}
      <button
        className="absolute top-6 right-6 text-red-600 text-xl z-10"
        onClick={() => navigate('/inicio')}
      >
        ✖
      </button>

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nombre" type="text" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="p-2 border rounded-lg" />
          <input name="apellidos" type="text" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} className="p-2 border rounded-lg" />
          <input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="col-span-2 p-2 border rounded-lg" />
          <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="col-span-2 p-2 border rounded-lg" />
          <input name="nacimiento" type="date" value={formData.nacimiento} onChange={handleChange} className="p-2 border rounded-lg" />
          <select name="idioma" value={formData.idioma} onChange={handleChange} className="p-2 border rounded-lg">
            <option value="">Idioma Preferente</option>
            <option value="Español">Español</option>
            <option value="Inglés">Inglés</option>
            <option value="Portugués">Portugués</option>
          </select>
          <input name="direccion" type="text" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="col-span-2 p-2 border rounded-lg" />
          <input name="ciudad" type="text" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} className="p-2 border rounded-lg" />
          <input name="estado" type="text" placeholder="Estado/Provincia" value={formData.estado} onChange={handleChange} className="p-2 border rounded-lg" />
          <select name="pais" value={formData.pais} onChange={handleChange} className="p-2 border rounded-lg">
            <option value="">País</option>
            <option value="España">España</option>
            <option value="México">México</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Colombia">Colombia</option>
            <option value="Argentina">Argentina</option>
          </select>
          <input name="codigo_postal" type="text" placeholder="Código Postal" value={formData.codigo_postal} onChange={handleChange} className="p-2 border rounded-lg" />

          <label className="col-span-2 flex items-center gap-2 text-sm">
            <input type="checkbox" name="acepta" checked={formData.acepta} onChange={handleChange} />
            Acepto los{' '}
            <a href="/terminos" className="text-purple-700 underline">términos y condiciones</a>{' '}
            y{' '}
            <a href="/politica" className="text-purple-700 underline">política de privacidad</a>
          </label>

          {error && <p className="col-span-2 text-red-600">{error}</p>}
          {exito && <p className="col-span-2 text-green-600">{exito}</p>}

          <button
            type="submit"
            className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium"
          >
            Crear mi Cuenta
          </button>
        </form>

        <div className="text-center text-sm text-purple-700 mt-4">
          <a href="/inicio" className="mr-4 underline">Volver al Inicio</a>
          <a href="/login" className="underline">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>

      <FooterLegal />
    </div>
  );
};

export default Registro;
