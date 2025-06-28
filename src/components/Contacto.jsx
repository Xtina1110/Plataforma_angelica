import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondo from '../assets/FondoPantallaIniciovf.png';

const Contacto = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />

      <LogoAngelico />

      <div className="z-10 bg-white/95 p-6 rounded-3xl shadow-lg w-full max-w-3xl overflow-auto max-h-screen relative">
        {/* Botón de cierre ✖ */}
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        {/* Botón de volver */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-purple-600 font-bold flex items-center"
          >
            <span className="text-xl mr-1">←</span> Volver
          </button>
        </div>

        {/* Contenido principal */}
        <h1 className="text-3xl font-bold text-yellow-700 mb-4 text-center">Contacto</h1>
        <p className="text-gray-700 mb-4 text-center">
          Puedes escribirnos a través de los siguientes medios:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Email: contacto@plataformaangelica.com</li>
          <li>WhatsApp: +123 456 789</li>
          <li>Instagram: @plataforma_angelica</li>
          <li>Facebook: Plataforma Angélica Oficial</li>
        </ul>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Gracias por comunicarte con nosotros 🌟
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Contacto;
