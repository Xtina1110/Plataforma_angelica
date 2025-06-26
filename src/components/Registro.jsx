import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';

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

  const validarEdad = (fecha) => {
    const cumple = new Date(fecha);
    const hoy = new Date();
    const edad = hoy.getFullYear() - cumple.getFullYear();
    return edad >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.acepta) {
      setError('Debes aceptar los términos y condiciones.');
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
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from('usuarios').insert([
        {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          nacimiento: formData.nacimiento,
          idioma: formData.idioma,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          estado: formData.estado,
          pais: formData.pais,
          codigo_postal: formData.codigoPostal,
          rol: 'usuario',
        },
      ]);

      if (dbError) throw dbError;

      setExito('Registro exitoso. Redirigiendo...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />
      <div
        className="absolute inset-0 bg-no-repeat bg-left bg-contain opacity-40 z-0"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      <LogoAngelico />

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg col-span-2"
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
              name="idioma"
              value={formData.idioma}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Idioma Preferente</option>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="pt">Portugués</option>
              <option value="fr">Francés</option>
            </select>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg col-span-2"
            />
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado / Provincia"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Selecciona tu país</option>
              <option value="México">México</option>
              <option value="Colombia">Colombia</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Perú">Perú</option>
              <option value="España">España</option>
              <option value="Estados Unidos">Estados Unidos</option>
            </select>
            <input
              type="text"
              name="codigoPostal"
              placeholder="Código Postal"
              value={formData.codigoPostal}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <label className="flex items-center mt-4 text-sm text-gray-700">
            <input
              type="checkbox"
              name="acepta"
              checked={formData.acepta}
              onChange={handleChange}
              className="mr-2"
            />
            Acepto los{' '}
            <a href="/terminos" className="text-purple-700 underline ml-1 mr-1">términos y condiciones</a> y la{' '}
            <a href="/politica" className="text-purple-700 underline">política de privacidad</a>
          </label>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {exito && <p className="text-green-600 text-sm">{exito}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-medium mt-4"
          >
            Crear mi Cuenta
          </button>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <button type="button" onClick={() => navigate('/inicio')} className="underline text-purple-700">
              Volver al Inicio
            </button>
            <button type="button" onClick={() => navigate('/login')} className="underline text-purple-700">
              ¿Ya tienes cuenta? Inicia sesión
            </button>
            <button type="button" onClick={() => navigate('/inicio')} className="text-red-500 font-bold">
              ✖
            </button>
          </div>
        </form>
      </div>

      <div className="relative z-10 mt-12 w-full">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Registro;
