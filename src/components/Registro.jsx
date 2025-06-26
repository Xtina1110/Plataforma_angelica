import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondo from '../assets/FondoPantallaIniciovf.png';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';

const idiomas = [
  'Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués',
  'Árabe', 'Chino', 'Japonés', 'Ruso', 'Hindi', 'Coreano', 'Turco'
];

const paises = [
  'Argentina', 'Bolivia', 'Brasil', 'Canadá', 'Chile', 'Colombia', 'Costa Rica',
  'Cuba', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala',
  'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Uruguay',
  'Venezuela', 'Otros'
];

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
    postal: '',
    telefono: '',
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

    if (!formData.acepta) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    const camposObligatorios = ['nombre', 'apellidos', 'email', 'password', 'confirmar', 'nacimiento', 'idioma', 'pais', 'contacto'];
    for (const campo of camposObligatorios) {
      if (!formData[campo]) {
        setError('Por favor, completa todos los campos requeridos.');
        return;
      }
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
          codigo_postal: formData.postal,
          telefono: formData.telefono,
          contacto_preferido: formData.contacto,
          rol: 'usuario'
        }
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
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${fondoMarmol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />
      <LogoAngelico />

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-3xl backdrop-blur-sm">
        <button
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Registro de Usuario</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="px-4 py-2 border rounded-lg col-span-2" />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="password" name="confirmar" placeholder="Confirmar contraseña" value={formData.confirmar} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="idioma" value={formData.idioma} onChange={handleChange} className="px-4 py-2 border rounded-lg">
            <option value="">Idioma preferente</option>
            {idiomas.map((idioma) => <option key={idioma}>{idioma}</option>)}
          </select>
          <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className="px-4 py-2 border rounded-lg col-span-2" />
          <input type="text" name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <input type="text" name="estado" placeholder="Estado / Provincia" value={formData.estado} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="pais" value={formData.pais} onChange={handleChange} className="px-4 py-2 border rounded-lg">
            <option value="">Selecciona un país</option>
            {paises.map((pais) => <option key={pais}>{pais}</option>)}
          </select>
          <input type="text" name="postal" placeholder="Código Postal" value={formData.postal} onChange={handleChange} className="px-4 py-2 border rounded-lg" />
          <select name="contacto" value={formData.contacto} onChange={handleChange} className="px-4 py-2 border rounded-lg col-span-2">
            <option value="">Medio de contacto preferido</option>
            <option value="email">Correo electrónico</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>

          <div className="col-span-2 text-sm flex items-start gap-2">
            <input type="checkbox" name="acepta" checked={formData.acepta} onChange={handleChange} className="mt-1" />
            <label>
              Acepto los <a href="/terminos" className="text-purple-700 underline">Términos y condiciones</a> y la{' '}
              <a href="/privacidad" className="text-purple-700 underline">Política de privacidad</a>.
            </label>
          </div>

          {error && <p className="text-red-600 col-span-2">{error}</p>}
          {exito && <p className="text-green-600 col-span-2">{exito}</p>}

          <button type="submit" className="col-span-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium">
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          ¿Ya tienes cuenta?{' '}
          <button onClick={() => navigate('/login')} className="text-purple-700 underline">Inicia sesión aquí</button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Registro;
