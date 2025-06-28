import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';

const Contacto = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex relative bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      {/* Capa blanca translúcida */}
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      {/* Imagen de San Miguel centrada */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      ></div>

      {/* Logo institucional */}
      <LogoAngelico />

      {/* Contenedor de contenido */}
      <div className="z-20 bg-white/95 p-6 rounded-3xl shadow-lg w-full max-w-3xl overflow-auto max-h-screen relative mx-auto mt-24">
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

      {/* Footer legal */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Contacto;
