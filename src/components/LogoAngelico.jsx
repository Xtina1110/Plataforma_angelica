import React from 'react';
import logo from '../assets/Logosinfondo.png';

const LogoAngelico = () => {
  return (
    <div className="absolute top-6 left-6 z-50">
      <img
        src={logo}
        alt="Juan Carlos Ávila - Elangeólogo"
        className="h-16 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default LogoAngelico;
