import React from 'react';
import { Link } from 'react-router-dom';

import facebook from '../icons/facebook.jpg';
import instagram from '../icons/IG.png';
import youtube from '../icons/Youtube.jpg';

const FooterLegal = () => {
  return (
    <footer className="bg-white/80 text-gray-700 text-sm py-4 px-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 shadow-inner">
      {/* Links legales */}
      <div className="flex gap-4 mb-2 md:mb-0">
        <Link to="/terminos" className="hover:text-purple-700 transition">
          Términos de Uso
        </Link>
        <Link to="/politica" className="hover:text-purple-700 transition">
          Política de Privacidad
        </Link>
        <Link to="/contacto" className="hover:text-purple-700 transition">
          Contacto
        </Link>
      </div>

      {/* Íconos redes */}
      <div className="flex gap-3">
        <a href="https://www.facebook.com/juan.avila.5811" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" className="w-5 h-5 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.instagram.com/juanavilaelangeologo" target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram" className="w-5 h-5 hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.youtube.com/channel/UCtD7fZCVKj1Jpt-1uBLyFYQ" target="_blank" rel="noopener noreferrer">
          <img src={youtube} alt="YouTube" className="w-5 h-5 hover:scale-110 transition-transform" />
        </a>
      </div>
    </footer>
  );
};

export default FooterLegal;
