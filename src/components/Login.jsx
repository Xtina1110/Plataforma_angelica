import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './Login.css';
import { Mail, Lock, LogIn } from 'lucide-react';

import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
      setLoading(false);
    } else {
      navigate('/dashboard-redirect');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      {/* Fondo translúcido */}
      <div className="absolute inset-0 bg-white/60 z-0" />

      {/* Imagen San Miguel */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      {/* Logo institucional */}
      <LogoAngelico />

      {/* Contenedor de login */}
      <div className="z-20 bg-white/95 p-8 rounded-3xl shadow-xl max-w-md w-full mx-4 mt-20 relative login-card">
        {/* Botón ✖ */}
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        {/* Botón ← Volver */}
        <div className="absolute top-4 left-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-purple-600 font-bold flex items-center"
          >
            <span className="text-xl mr-1">←</span> Volver
          </button>
        </div>

        <h2 className="login-title">Iniciar Sesión</h2>
        <p className="login-subtitle">Bienvenido de nuevo a la Plataforma Angélica</p>

        <form onSubmit={handleSubmit} className="login-form">
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : (<><LogIn size={20} /> Iniciar Sesión</>)}
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <span className="register-link" onClick={() => navigate('/registro')}>
              Regístrate aquí
            </span>
          </p>
          <p className="forgot-password-link">¿Olvidaste tu contraseña?</p>
        </div>
      </div>

      {/* Footer legal */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Login;
