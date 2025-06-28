import React from 'react';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondo from '../assets/FondoPantallaIniciovf.png';

const Privacidad = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />

      <LogoAngelico />

      <div className="relative z-10 max-w-3xl mx-auto bg-white/90 p-8 rounded-3xl shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-yellow-700 mb-4">Política de Privacidad</h1>
        <p className="text-gray-700 mb-6">
          En Plataforma Angélica valoramos profundamente tu privacidad y nos comprometemos a proteger tu información personal. Esta política explica cómo recopilamos, usamos y protegemos tus datos:
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-3">
          <li>Los datos que proporcionas (nombre, email, preferencias) se usan únicamente para brindarte una experiencia espiritual personalizada.</li>
          <li>No compartimos tus datos con terceros sin tu consentimiento expreso.</li>
          <li>Utilizamos Supabase como backend seguro para el almacenamiento y autenticación de usuarios.</li>
          <li>Puedes solicitar en cualquier momento la eliminación o modificación de tu información.</li>
          <li>Esta política puede actualizarse para adaptarse a nuevas normativas o mejoras del servicio.</li>
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Privacidad;
