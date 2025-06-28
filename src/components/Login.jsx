import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import fondo from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg('Credenciales inválidas');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      <LogoAngelico />

      <div className="z-10 bg-white/95 p-8 rounded-3xl shadow-xl backdrop-blur-sm max-w-md w-full mx-4">
        <h2 className="text-yellow-700 text-3xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        {errorMsg && <p className="text-red-600 text-sm mb-2 text-center">{errorMsg}</p>}

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
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Login;
