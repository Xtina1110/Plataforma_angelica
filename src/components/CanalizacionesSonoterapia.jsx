import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, Users } from 'lucide-react';

const CanalizacionesSonoterapia = ({ onVolver, onNavigate }) => {
  return (
    <div className="min-h-screen spiritual-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={onVolver}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Volver al Dashboard
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6">
            <Music className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold title-spiritual mb-4">
            🎵 Canalizaciones y Sonoterapia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige tu experiencia de sanación y conexión angelical
          </p>
        </motion.div>

        {/* Opciones principales */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Botón Sonoterapia */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="card-angelic overflow-hidden cursor-pointer bg-white shadow-lg"
            onClick={() => onNavigate('sonoterapia')}
          >
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-6 flex items-center justify-center">
              <span className="text-4xl">🎵</span>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonoterapia</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Frecuencias para armonizar cuerpo, mente y alma
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>✨ Frecuencias de 432 Hz</p>
                <p>🧘‍♀️ Meditación guiada</p>
                <p>😴 Sueño reparador</p>
              </div>
              <button className="w-full btn-golden">
                Acceder a Sonoterapia
              </button>
            </div>
          </motion.div>

          {/* Botón Canalizaciones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="card-angelic overflow-hidden cursor-pointer bg-white shadow-lg"
            onClick={() => onNavigate('canalizaciones')}
          >
            <div className="bg-gradient-to-br from-[#D4AF37] to-white text-[#8B4513] p-6 flex items-center justify-center">
              <span className="text-4xl">👼</span>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Canalizaciones
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Mensajes de tus ángeles según lo que necesites hoy
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>🌟 Propósito de Vida</p>
                <p>💖 Amor Propio</p>
                <p>🛡️ Protección Espiritual</p>
                <p>📩 Mensaje del Día</p>
              </div>
              <button className="w-full btn-golden">
                Acceder a Canalizaciones
              </button>
            </div>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="card-angelic p-8 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              ¿Qué experiencia necesitas hoy?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              La <strong>Sonoterapia</strong> te ayuda a equilibrar tu energía a través del poder 
              de las frecuencias sagradas, mientras que las <strong>Canalizaciones</strong> te 
              conectan directamente con los mensajes angelicales personalizados para tu situación actual.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CanalizacionesSonoterapia;

