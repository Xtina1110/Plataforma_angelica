import React, { useState } from 'react';
import { supabase } from '../supabase';
import Fondo from '../assets/FondoPantallaIniciovf.png';
import SanMiguel from '../assets/SanMiguelArcangel.png';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmarPassword: '',
    nacimiento: '',
    idioma: '',
    direccion: '',
    ciudad: '',
    estado: '',
    pais: '',
    codigo_postal: '',
    telefono: '',
    contacto_preferido: '',
  });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();

    if (formulario.password !== formulario.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: formulario.email,
      password: formulario.password,
    });

    if (signUpError) {
      alert('Error al registrar: ' + signUpError.message);
      return;
    }

    const user = signUpData.user;
    if (!user) {
      alert('No se pudo obtener el usuario autenticado.');
      return;
    }

    const { error: insertError } = await supabase.from('usuarios').insert([
      {
        id: user.id,
        nombre: formulario.nombre,
        apellidos: formulario.apellidos,
        email: formulario.email,
        nacimiento: formulario.nacimiento,
        idioma: formulario.idioma,
        direccion: formulario.direccion,
        ciudad: formulario.ciudad,
        estado: formulario.estado,
        pais: formulario.pais,
        codigo_postal: formulario.codigo_postal,
        telefono: formulario.telefono,
        contacto_preferido: formulario.contacto_preferido,
        rol: 'usuario',
      },
    ]);

    if (insertError) {
      alert('Error al guardar datos: ' + insertError.message);
      return;
    }

    alert('Registro exitoso. Verifica tu correo para confirmar.');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${Fondo})` }}
    >
      <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-xl text-gray-800 hover:text-red-600">⮌ Volver</button>
      <div className="absolute top-4 right-4 text-xl text-gray-800 cursor-pointer" onClick={() => navigate('/')}>✖</div>

      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-3xl relative flex gap-6">
        <img
          src={SanMiguel}
          alt="San Miguel Arcángel"
          className="w-1/3 object-contain hidden md:block"
        />

        <form onSubmit={manejarRegistro} className="flex-1 overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Registro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} className="p-2 border rounded" required />
            <input name="apellidos" placeholder="Apellidos" value={formulario.apellidos} onChange={manejarCambio} className="p-2 border rounded" required />
            <input type="email" name="email" placeholder="Correo electrónico" value={formulario.email} onChange={manejarCambio} className="p-2 border rounded" required />
            <input type="date" name="nacimiento" placeholder="Nacimiento" value={formulario.nacimiento} onChange={manejarCambio} className="p-2 border rounded" required />
            <input type="password" name="password" placeholder="Contraseña" value={formulario.password} onChange={manejarCambio} className="p-2 border rounded" required />
            <input type="password" name="confirmarPassword" placeholder="Confirmar contraseña" value={formulario.confirmarPassword} onChange={manejarCambio} className="p-2 border rounded" required />
            <select name="idioma" value={formulario.idioma} onChange={manejarCambio} className="p-2 border rounded" required>
              <option value="">Idioma preferente</option>
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Portugués">Portugués</option>
              <option value="Francés">Francés</option>
            </select>
            <input name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={manejarCambio} className="p-2 border rounded" required />
            <input name="direccion" placeholder="Dirección" value={formulario.direccion} onChange={manejarCambio} className="p-2 border rounded" required />
            <input name="ciudad" placeholder="Ciudad" value={formulario.ciudad} onChange={manejarCambio} className="p-2 border rounded" required />
            <input name="estado" placeholder="Estado / Provincia" value={formulario.estado} onChange={manejarCambio} className="p-2 border rounded" required />
            <input name="codigo_postal" placeholder="Código Postal" value={formulario.codigo_postal} onChange={manejarCambio} className="p-2 border rounded" required />
            <input name="pais" placeholder="País" value={formulario.pais} onChange={manejarCambio} className="p-2 border rounded" required />
            <select name="contacto_preferido" value={formulario.contacto_preferido} onChange={manejarCambio} className="p-2 border rounded" required>
              <option value="">Medio de contacto preferido</option>
              <option value="Correo electrónico">Correo electrónico</option>
              <option value="Teléfono">Teléfono</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" required className="mr-2" />
            <label>Acepto los <a href="/terminos" className="underline">Términos y condiciones</a> y la <a href="/privacidad" className="underline">Política de privacidad</a>.</label>
          </div>

          <button type="submit" className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold">
            Registrarse
          </button>

          <p className="mt-4 text-center">¿Ya tienes cuenta? <a href="/login" className="text-blue-600 underline">Inicia sesión aquí</a></p>
        </form>
      </div>
    </div>
  );
}

export default Registro;
