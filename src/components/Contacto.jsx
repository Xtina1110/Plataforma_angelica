import React from 'react';

const Contacto = () => {
  return (
    <div className="p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">Contacto</h1>
      <p className="mb-4">Puedes escribirnos a través de los siguientes medios:</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Email: contacto@plataformaangelica.com</li>
        <li>WhatsApp: +123 456 789</li>
        <li>Instagram: @plataforma_angelica</li>
        <li>Facebook: Plataforma Angélica Oficial</li>
      </ul>
      <p className="mt-6 text-sm text-gray-500">Gracias por comunicarte con nosotros 🌟</p>
    </div>
  );
};

export default Contacto;
