import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoAngelico from './LogoAngelico';
import fondo from '../assets/FondoPantalladeCargavf.png?url'; // importante el ?url

const PantallaCarga = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Preparando tu espacio sagrado...",
    "Conectando con la energía angelical...",
    "Abriendo los canales de luz divina...",
    "Invocando la protección celestial...",
    "Activando tu conexión espiritual...",
    "Los ángeles te están esperando...",
    "Creando un ambiente de paz y amor...",
    "Sintonizando con las frecuencias angelicales...",
    "Preparando tu encuentro divino...",
    "¡Bienvenido a tu transformación!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        const index = Math.floor(next / 10);

        if (index < messages.length && index !== currentMessage) {
          setCurrentMessage(index);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/inicio');
          }, 800);
        }

        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [navigate, currentMessage]);

  console.log("🟡 Fondo usado:", fondo); // Verificar que se carga correctamente

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundColor: '#ffffff', // fallback de color si no carga
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Capa de transparencia */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none"></div>

      {/* Logo en esquina */}
      <LogoAngelico />

      {/* Contenido central */}
      <div className="z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-700 mb-4 tracking-wide drop-shadow-md">
          PLATAFORMA ANGÉLICA
        </h1>

        <p className="text-lg italic text-gray-700 mb-12 min-h-[2rem] transition-all duration-500">
          {messages[currentMessage]}
        </p>

        <div className="w-72 md:w-96 h-5 rounded-full bg-white/80 border border-yellow-300 shadow-inner overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-yellow-700 font-semibold mt-4 text-lg">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default PantallaCarga;
