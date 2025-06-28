// 📁 src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import './Login.css';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg('Credenciales inválidas. Inténtalo de nuevo.');
    } else {
      navigate('/dashboard-redirect');
    }

    setLoading(false);
  };

  return (
    <div
      className="login-bg min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      {/* Fondo translúcido y San Miguel */}
      <div className="absolute inset-0 bg-white/60 z-0" />
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      <LogoAngelico />

      {/* Panel Login */}
      <div className="login-card z-20 mx-4 mt-20 relative">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        <h2 className="login-title">Iniciar Sesión</h2>
        <p className="login-subtitle">Bienvenido a Plataforma Angélica</p>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : <><LogIn size={20} /> Iniciar Sesión</>}
          </button>
        </form>

        {/* Enlaces extra */}
        <div className="login-footer">
          <p>
            ¿No tienes cuenta?{' '}
            <span className="register-link" onClick={() => navigate('/registro')}>
              Regístrate aquí
            </span>
          </p>
          <p className="forgot-password-link">¿Olvidaste tu contraseña?</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Login;
