import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondo from '../assets/FondoPantallaIniciovf.png';

const Terminos = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative px-6 pt-28 pb-16"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-white/60 z-0" />

      <LogoAngelico />

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold z-20"
      >
        ✖
      </button>

      <div className="relative z-10 max-w-3xl mx-auto bg-white/90 p-8 rounded-3xl shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-yellow-700 mb-4">Términos de Uso</h1>
        <p className="text-gray-700 mb-6">
          Bienvenido a la Plataforma Angélica. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones...
        </p>

        <ul className="list-disc pl-6 text-gray-700 space-y-3">
          <li>El contenido ofrecido es con fines espirituales y de bienestar.</li>
          <li>No sustituye tratamientos médicos ni terapéuticos profesionales.</li>
          <li>El uso indebido del contenido puede conllevar a la suspensión de la cuenta.</li>
          <li>Respetamos la privacidad de tus datos según nuestra política.</li>
          <li>Nos reservamos el derecho a modificar estos términos en cualquier momento.</li>
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <FooterLegal />
      </div>
    </div>
  );
};

export default Terminos;
