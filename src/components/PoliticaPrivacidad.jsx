import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';

const Privacidad = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      {/* Capa translúcida blanca sobre el fondo marmoleado */}
      <div className="absolute inset-0 bg-white/60 z-0" />

      {/* Imagen de San Miguel centrada, con transparencia */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      {/* Logo institucional */}
      <LogoAngelico />

      {/* Contenedor de contenido */}
      <div className="z-10 bg-white/95 p-6 rounded-3xl shadow-lg w-full max-w-3xl overflow-auto max-h-screen relative mx-4">
        {/* Botón ✖ */}
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        {/* Botón ← Volver */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-purple-600 font-bold flex items-center"
          >
            <span className="text-xl mr-1">←</span> Volver
          </button>
        </div>

        {/* Contenido de la política */}
        <h1 className="text-3xl font-bold text-yellow-700 mb-4 text-center">Política de Privacidad</h1>
        <p className="text-gray-700 mb-6">
          En Plataforma Angélica valoramos profundamente tu privacidad y nos comprometemos a proteger tu información personal.
          Esta política explica cómo recopilamos, usamos y protegemos tus datos:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-3">
          <li>Los datos que proporcionas (nombre, email, preferencias) se usan únicamente para brindarte una experiencia espiritual personalizada.</li>
          <li>No compartimos tus datos con terceros sin tu consentimiento expreso.</li>
          <li>Utilizamos Supabase como backend seguro para el almacenamiento y autenticación de usuarios.</li>
          <li>Puedes solicitar en cualquier momento la eliminación o modificación de tu información.</li>
          <li>Esta política puede actualizarse para adaptarse a nuevas normativas o mejoras del servicio.</li>
        </ul>
      </div>

      {/* Footer Legal */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
