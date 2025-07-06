import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

const PantallaInicio = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex relative bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${fondoMarmol})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Capa de transparencia */}
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      {/* Logo */}
      <LogoAngelico />

      {/* Imagen San Miguel izquierda */}
      <div 
        className="absolute top-0 left-[72px] w-3/5 h-full bg-contain bg-center bg-no-repeat opacity-40 z-10"
        
        style={{ 
          backgroundImage: `url(${sanMiguel})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center left'
        }}
      />

      {/* Contenido del panel derecho */}
      <div className="flex-1 flex items-center justify-end pr-8 md:pr-16 relative z-20">
        <div className="bg-white/95 rounded-3xl shadow-xl p-8 md:p-10 max-w-md w-full backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out hover:bg-white/98">
          <p className="text-xl md:text-2xl text-yellow-700 font-semibold mb-6 text-center italic">
            Dios nos bendice mil veces mil
          </p>

          <h1
            className="text-4xl md:text-5xl font-bold mb-3 text-center tracking-wide drop-shadow-md"
            style={{ color: '#6a0dad' }}
          >
            PLATAFORMA ANGÉLICA
          </h1>

          <p className="text-gray-700 mb-8 text-center">
            Conecta con tus ángeles.<br />Transforma tu vida.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-white text-lg font-semibold py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 ease-in-out transform active:scale-95"
            >
              🔒 Iniciar Sesión
            </button>

            <button
              onClick={() => navigate('/registro')}
              className="border-2 border-purple-600 text-purple-700 text-lg font-semibold py-3 rounded-full hover:bg-purple-50 hover:scale-105 hover:shadow-lg hover:border-purple-700 hover:text-purple-800 transition-all duration-300 ease-in-out transform active:scale-95"
            >
              👤 Registrarse
            </button>
          </div>
        </div>
      </div>

      {/* Footer legal */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default PantallaInicio;

