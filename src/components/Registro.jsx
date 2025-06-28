import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import paises from '../data/paises';
import idiomas from '../data/idiomas';
import fondo from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

export default function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    nacimiento: '',
    idioma: '',
    direccion: '',
    ciudad: '',
    estado: '',
    pais: '',
    codigo_postal: '',
    telefono: '',
    contacto_preferido: '',
    rol: 'usuario',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setExito('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const { email } = formData;
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const { error: insertError } = await supabase.from('usuarios').insert([
      {
        id: data.user.id,
        ...formData,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setExito('Registro exitoso. Revisa tu correo para confirmar la cuenta.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      <LogoAngelico />

      <form onSubmit={handleSubmit} className="z-10 bg-white/95 p-6 rounded-3xl shadow-lg w-full max-w-3xl overflow-auto max-h-screen relative">
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        <div className="flex justify-between items-center mb-4">
          <button type="button" onClick={() => navigate('/inicio')} className="text-gray-600 hover:text-purple-600 font-bold flex items-center">
            <span className="text-xl mr-1">←</span> Volver
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Registro de Usuario</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="input" />
          <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required className="input" />

          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required className="input" />
          <input type="date" name="nacimiento" placeholder="Fecha de nacimiento" value={formData.nacimiento} onChange={handleChange} required className="input" />

          <input type="password" name="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required className="input" />
          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="input" />

          <select name="idioma" value={formData.idioma} onChange={handleChange} required className="input">
            <option value="">Idioma preferente</option>
            {idiomas.map((idioma, index) => (
              <option key={index} value={idioma}>{idioma}</option>
            ))}
          </select>
          <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required className="input" />

          <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required className="input" />
          <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required className="input" />

          <input name="estado" placeholder="Estado / Provincia" value={formData.estado} onChange={handleChange} required className="input" />
          <input name="codigo_postal" placeholder="Código Postal" value={formData.codigo_postal} onChange={handleChange} required className="input" />

          <select name="pais" value={formData.pais} onChange={handleChange} required className="input">
            <option value="">Selecciona un país</option>
            {paises.map((pais, index) => (
              <option key={index} value={pais}>{pais}</option>
            ))}
          </select>

          <select name="contacto_preferido" value={formData.contacto_preferido} onChange={handleChange} required className="input">
            <option value="">Medio de contacto preferido</option>
            <option value="Correo electrónico">Correo electrónico</option>
            <option value="Teléfono">Teléfono</option>
          </select>
        </div>

        <div className="mt-4 flex items-start">
          <input type="checkbox" required className="mr-2 mt-1" />
          <p className="text-sm">
            Acepto los{' '}
            <a href="/terminos" className="text-blue-600 underline">Términos y condiciones</a> y la{' '}
            <a href="/privacidad" className="text-blue-600 underline">Política de privacidad</a>.
          </p>
        </div>

        {error && <p className="text-red-600 mt-2 text-sm font-semibold">{error}</p>}
        {exito && <p className="text-green-600 mt-2 text-sm font-semibold">{exito}</p>}

        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg font-bold mt-4 hover:bg-yellow-600">
          Registrarse
        </button>

        <p className="text-sm mt-4 text-center">
          ¿Ya tienes cuenta?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-blue-600 underline">
            Inicia sesión aquí
          </button>
        </p>
      </form>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
}
