import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logosinfondo.png'; // Asegúrate de tener este archivo
import facebook from '../icons/facebook.png';
import instagram from '../icons/instagram.png';
import youtube from '../icons/youtube.png';

const FooterLegal = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white/60 backdrop-blur-md text-gray-700 text-sm px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-3">
      
      {/* Logo con enlaces */}
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Logo Ángelico" 
          className="h-12 cursor-pointer"
          onClick={() => navigate('/inicio')}
        />
        <div className="flex gap-3 ml-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className="h-5 hover:scale-110 transition-transform" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="h-5 hover:scale-110 transition-transform" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="YouTube" className="h-5 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Enlaces legales */}
      <div className="flex gap-4">
        <button onClick={() => navigate('/terminos')} className="hover:underline text-purple-700">
          Términos de Uso
        </button>
        <button onClick={() => navigate('/politica')} className="hover:underline text-purple-700">
          Política de Privacidad
        </button>
        <button onClick={() => navigate('/contacto')} className="hover:underline text-purple-700">
          Contacto
        </button>
      </div>
    </footer>
  );
};

export default FooterLegal;
