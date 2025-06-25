import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoAngelico from './LogoAngelico';
import fondo from '../assets/FondoPantalladeCargavf.png';

const PantallaCarga = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = [
    "Preparando tu espacio sagrado...",
    "Conectando con la energía angelical...",
    "Abriendo los canales de luz divina...",
    "Invocando la protección celestial...",
    "Activando tu conexión espiritual...",
    "Los ángeles te están esperando...",
    "Creando un ambiente de paz y amor...",
    "Sintonizando con las frecuencias angelicales...",
    "Preparando tu encuentro divino..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;

        if (newProgress < 100) {
          const index = Math.floor(newProgress / 10);
          if (index < messages.length) {
            setCurrentMessage(messages[index]);
          }
        } else {
          setCurrentMessage("¡Bienvenido a tu transformación!");
          clearInterval(interval);
          setTimeout(() => navigate('/inicio'), 1500);
        }

        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-white/70 pointer-events-none"></div>

      <LogoAngelico />

      <div className="z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-700 mb-4 tracking-wide drop-shadow-md">
          PLATAFORMA ANGÉLICA
        </h1>

        <p className="text-lg italic text-gray-700 mb-12 min-h-[2rem]">
          {currentMessage}
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
