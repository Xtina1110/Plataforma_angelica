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
    codigo_postal: '',
    acepta: false
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

    if (!formData.acepta) {
      setError('Debes aceptar los términos y la política de privacidad');
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from('usuarios').insert([{
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        nacimiento: formData.nacimiento,
        idioma: formData.idioma,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        estado: formData.estado,
        pais: formData.pais,
        codigo_postal: formData.codigo_postal,
        rol: 'usuario'
      }]);

      if (dbError) throw dbError;

      setExito('Registro exitoso, redirigiendo...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${fondoMarmol})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />
      <div
        className="absolute top-0 left-0 w-3/5 h-full bg-contain bg-left bg-no-repeat opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />
      <LogoAngelico />

      <div className="relative z-20 bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="px-4 py-2 border rounded-lg col-span-2" />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="password" name="confirmar" placeholder="Confirmar contraseña" value={formData.confirmar} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="idioma" value={formData.idioma} onChange={handleChange} className="px-4 py-2 border rounded-lg">
            <option value="">Idioma preferente</option>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
          <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="px-4 py-2 border rounded-lg col-span-2" />
          <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input name="estado" placeholder="Estado/Provincia" value={formData.estado} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="pais" value={formData.pais} onChange={handleChange} className="px-4 py-2 border rounded-lg">
            <option value="">País</option>
            <option value="Mexico">México</option>
            <option value="Colombia">Colombia</option>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="España">España</option>
            <option value="Otro">Otro</option>
          </select>
          <input name="codigo_postal" placeholder="Código Postal" value={formData.codigo_postal} onChange={handleChange} className="px-4 py-2 border rounded-lg" />

          <div className="col-span-2 flex items-center mt-2">
            <input type="checkbox" name="acepta" checked={formData.acepta} onChange={handleChange} className="mr-2" />
            <span className="text-sm text-gray-700">
              Acepto los <a href="/terminos" className="text-yellow-600 underline">términos y condiciones</a> y la <a href="/politica" className="text-yellow-600 underline">política de privacidad</a>.
            </span>
          </div>

          {error && <p className="text-red-600 col-span-2">{error}</p>}
          {exito && <p className="text-green-600 col-span-2">{exito}</p>}

          <button type="submit" className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium mt-2">
            Crear mi Cuenta
          </button>
        </form>

        <div className="text-center text-sm text-gray-700 mt-4">
          ¿Ya tienes cuenta? <button onClick={() => navigate('/login')} className="text-purple-700 hover:underline">Inicia sesión aquí</button><br />
          <button onClick={() => navigate('/inicio')} className="mt-1 text-gray-500 hover:underline">Volver al inicio</button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Registro;
