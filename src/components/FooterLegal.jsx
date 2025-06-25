import React from 'react';

const FooterLegal = () => {
  return (
    <footer className="bg-transparent text-center py-4 text-sm text-gray-600 z-50">
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <a href="/terminos" className="hover:underline">Términos de Uso</a>
        <a href="/privacidad" className="hover:underline">Política de Privacidad</a>
        <a href="/contacto" className="hover:underline">Contacto</a>
      </div>
      <div className="mt-2 flex justify-center gap-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 inline" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 inline" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/youtube.svg" alt="YouTube" className="w-5 h-5 inline" />
        </a>
      </div>
      <p className="mt-2 text-xs text-gray-400">© 2025 Plataforma Angélica</p>
    </footer>
  );
};

export default FooterLegal;
