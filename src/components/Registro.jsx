import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Globe, MapPin, UserPlus } from 'lucide-react';
import { supabase } from '../supabase';
import paises from '../data/paises';
import idiomas from '../data/idiomas';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import './Registro.css';

const Registro = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const { email } = formData;
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

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
      className="registro-fondo"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      <div className="fondo-blanco" />
      <div
        className="fondo-san-miguel"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />
      <LogoAngelico />

      <form onSubmit={handleSubmit} className="registro-card">
        <button onClick={() => navigate('/inicio')} className="cerrar-btn">✖</button>
        <div className="volver-container">
          <button onClick={() => navigate(-1)} className="volver-btn">← Volver</button>
        </div>

        <h2 className="titulo-registro">Registro de Usuario</h2>

        <div className="registro-grid">
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
          <input type="date" name="nacimiento" placeholder="Nacimiento" value={formData.nacimiento} onChange={handleChange} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <select name="idioma" value={formData.idioma} onChange={handleChange} required>
            <option value="">Idioma preferente</option>
            {idiomas.map((idioma, i) => <option key={i} value={idioma}>{idioma}</option>)}
          </select>
          <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
          <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
          <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
          <input name="estado" placeholder="Estado/Provincia" value={formData.estado} onChange={handleChange} required />
          <input name="codigo_postal" placeholder="Código Postal" value={formData.codigo_postal} onChange={handleChange} required />
          <select name="pais" value={formData.pais} onChange={handleChange} required>
            <option value="">Selecciona un país</option>
            {paises.map((pais, i) => <option key={i} value={pais}>{pais}</option>)}
          </select>
          <select name="contacto_preferido" value={formData.contacto_preferido} onChange={handleChange} required>
            <option value="">Medio de contacto preferido</option>
            <option value="Correo electrónico">Correo electrónico</option>
            <option value="Teléfono">Teléfono</option>
          </select>
        </div>

        <div className="checkbox-terminos">
          <input type="checkbox" required className="mr-2 mt-1" />
          <p className="text-sm">
            Acepto los <a href="/terminos">Términos y condiciones</a> y la <a href="/privacidad">Política de privacidad</a>.
          </p>
        </div>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <button type="submit" className="boton-registrarse">
          <UserPlus size={20} className="mr-2" /> Registrarse
        </button>

        <p className="texto-login">
          ¿Ya tienes cuenta? <button type="button" onClick={() => navigate('/login')}>Inicia sesión aquí</button>
        </p>
      </form>

      <div className="footer-fijo">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Registro;
