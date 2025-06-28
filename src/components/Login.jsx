import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    // Aquí iría el login real con Supabase
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg('Credenciales inválidas');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Error inesperado al iniciar sesión');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      {/* Capa translúcida */}
      <div className="absolute inset-0 bg-white/60 z-0" />

      {/* Imagen de San Miguel */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      {/* Logo institucional */}
      <LogoAngelico />

      {/* Contenedor principal */}
      <div className="z-20 bg-white/95 p-8 rounded-3xl shadow-xl backdrop-blur-sm max-w-md w-full mx-4 mt-24 relative">

        {/* Botón cerrar (✖) */}
        <button
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        {/* Botón ← Volver */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-purple-600 font-bold flex items-center"
        >
          <span className="text-xl mr-1">←</span> Volver
        </button>

        <h2 className="text-yellow-700 text-3xl font-bold mb-2 text-center">Iniciar Sesión</h2>
        <p className="text-gray-600 mb-6 text-center">Bienvenido de nuevo a la Plataforma Angélica</p>

        {errorMsg && <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold transition duration-300"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          ¿No tienes una cuenta?{' '}
          <span
            onClick={() => navigate('/registro')}
            className="text-purple-700 font-semibold cursor-pointer hover:underline"
          >
            Regístrate aquí
          </span>
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
