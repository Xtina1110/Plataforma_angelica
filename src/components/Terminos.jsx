import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoAngelico from './LogoAngelico';
import FooterLegal from './FooterLegal';
import fondoMarmol from '../assets/Fondomarmoleado.jpg';
import sanMiguel from '../assets/FondoPantallaIniciovf.png';

const Terminos = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondoMarmol})` }}
    >
      {/* Fondo translúcido */}
      <div className="absolute inset-0 bg-white/60 z-0" />

      {/* Imagen San Miguel centrada */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-40 z-10"
        style={{ backgroundImage: `url(${sanMiguel})` }}
      />

      <LogoAngelico />

      {/* Contenedor central reducido */}
      <div className="z-10 bg-white/95 p-6 rounded-3xl shadow-lg w-full max-w-3xl overflow-auto max-h-screen relative mx-4">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={() => navigate('/inicio')}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ✖
        </button>

        {/* Botón volver */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-purple-600 font-bold flex items-center"
          >
            <span className="text-xl mr-1">←</span> Volver
          </button>
        </div>

        {/* Contenido */}
        <h1 className="text-3xl font-bold text-yellow-700 mb-4 text-center">Términos de Uso</h1>
        <p className="text-gray-700 mb-6">
          Bienvenido a la Plataforma Angélica. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones:
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
