import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Mail, Lock, LogIn } from 'lucide-react';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulación de autenticación
      if (email === 'test@example.com' && password === 'password123') {
        setTimeout(() => {
          setLoading(false);
          onLogin({ email: email, name: 'Usuario Demo' });
        }, 1500);
      } else {
        throw new Error('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />

      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      <LogoAngelico />

      <div className="z-20 bg-white/95 p-8 rounded-3xl shadow-xl backdrop-blur-sm max-w-md w-full mx-4 mt-24 relative login-card">

        {/* Botón cerrar (X) */}
        <button
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-purple-600 font-bold flex items-center"
        >
          <span className="text-xl mr-1">←</span> Volver
        </button>

        <h2 className="login-title text-yellow-700 text-3xl font-bold mb-2 text-center">Iniciar Sesión</h2>
        <p className="login-subtitle text-gray-600 mb-6 text-center">Bienvenido de nuevo a la Plataforma Angélica</p>

        {error && <p className="error-message text-red-600 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form flex flex-col gap-4">
          <div className="input-group relative">
            <Mail size={20} className="input-icon absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 p-3 rounded-lg border border-gray-300 w-full"
            />
          </div>

          <div className="input-group relative">
            <Lock size={20} className="input-icon absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 p-3 rounded-lg border border-gray-300 w-full"
            />
          </div>

          <button
            type="submit"
            className="login-button bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? 'Cargando...' : <><LogIn size={20} /> Iniciar Sesión</>}
          </button>
        </form>

        <div className="login-footer text-center mt-6 text-sm text-gray-700">
          <p>¿No tienes una cuenta?{' '}
            <span
              className="register-link text-purple-700 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/registro')}
            >
              Regístrate aquí
            </span>
          </p>
          <p className="forgot-password-link text-sm mt-2 text-blue-600 cursor-pointer hover:underline">
            ¿Olvidaste tu contraseña?
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Login;
