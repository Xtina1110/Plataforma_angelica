import React from 'react';
import logo from '../assets/Logosinfondo.png'; // Asegúrate que el path y nombre del archivo coincidan

const LogoAngelico = () => {
  return (
    <div className="absolute top-4 left-4 z-50">
      <img 
        src={logo} 
        alt="Logo Juan Carlos Ávila - Elangeólogo" 
        className="w-28 md:w-36 lg:w-44 xl:w-52" // ⬅️ Aquí se ajusta el tamaño en responsive
      />
    </div>
  );
};

export default LogoAngelico;
