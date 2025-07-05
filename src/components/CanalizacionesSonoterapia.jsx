import React, { useState } from 'react';
import './CanalizacionesSonoterapia.css';
import { ArrowLeft, Music, MessageCircle, Headphones, Heart, Star, Clock, Users } from 'lucide-react';
import Sonoterapia from './Sonoterapia';
import CanalizacionesAngelicales from './CanalizacionesAngelicales';

const CanalizacionesSonoterapia = ({ onVolver, onNavigate }) => {
  const [seccionActiva, setSeccionActiva] = useState(null);

  // Si hay una sección activa, mostrar el componente correspondiente
  if (seccionActiva === 'sonoterapia') {
    return <Sonoterapia onVolver={() => setSeccionActiva(null)} />;
  }

  if (seccionActiva === 'canalizaciones') {
    return <CanalizacionesAngelicales onVolver={() => setSeccionActiva(null)} />;
  }

  // Pantalla principal de selección
  return (
    <div className="canalizaciones-sonoterapia-principal">
      {/* Header */}
      <header className="header-principal">
        <div className="header-content">
          <button
            onClick={onVolver}
            className="btn-volver-principal"
          >
            <ArrowLeft className="w-5 h-5" /> 
            Volver al Dashboard
          </button>
          
          <div className="header-title-principal">
            <h1>🎵 Canalizaciones y Sonoterapia</h1>
            <p>Elige tu experiencia de sanación y conexión angelical</p>
          </div>
          
          <div className="header-spacer"></div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="contenido-principal">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icono">
              <Music className="w-16 h-16" />
            </div>
            <h2 className="hero-titulo">Sanación a través del Sonido y la Palabra</h2>
            <p className="hero-descripcion">
              Descubre el poder transformador de las frecuencias sagradas y los mensajes angelicales. 
              Cada experiencia está diseñada para elevar tu vibración y conectarte con tu esencia divina.
            </p>
          </div>
        </div>

        {/* Opciones principales */}
        <div className="opciones-principales">
          {/* Sonoterapia */}
          <div 
            className="opcion-card sonoterapia"
            onClick={() => setSeccionActiva('sonoterapia')}
          >
            <div className="card-header">
              <div className="card-icono sonoterapia-icono">
                <Headphones className="w-12 h-12" />
              </div>
              <div className="card-badge">Nuevo</div>
            </div>
            
            <div className="card-content">
              <h3 className="card-titulo">Sonoterapia Angelical</h3>
              <p className="card-descripcion">
                Frecuencias sagradas y ondas binaurales para armonizar cuerpo, mente y alma. 
                Experimenta la sanación a través del poder del sonido.
              </p>
              
              <div className="card-beneficios">
                <div className="beneficio">
                  <span className="beneficio-icono">🎵</span>
                  <span>Frecuencias de 432Hz, 528Hz, 741Hz</span>
                </div>
                <div className="beneficio">
                  <span className="beneficio-icono">🧘‍♀️</span>
                  <span>Meditación y concentración profunda</span>
                </div>
                <div className="beneficio">
                  <span className="beneficio-icono">😴</span>
                  <span>Sueño reparador y relajación</span>
                </div>
                <div className="beneficio">
                  <span className="beneficio-icono">✨</span>
                  <span>Limpieza energética y sanación</span>
                </div>
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <Clock className="w-4 h-4" />
                  <span>50+ audios</span>
                </div>
                <div className="stat">
                  <Users className="w-4 h-4" />
                  <span>15k+ usuarios</span>
                </div>
                <div className="stat">
                  <Star className="w-4 h-4" />
                  <span>4.9 rating</span>
                </div>
              </div>
              
              <button className="btn-acceder sonoterapia-btn">
                <Music className="w-5 h-5" />
                Explorar Sonoterapia
              </button>
            </div>
          </div>

          {/* Canalizaciones */}
          <div 
            className="opcion-card canalizaciones"
            onClick={() => setSeccionActiva('canalizaciones')}
          >
            <div className="card-header">
              <div className="card-icono canalizaciones-icono">
                <MessageCircle className="w-12 h-12" />
              </div>
              <div className="card-badge popular">Popular</div>
            </div>
            
            <div className="card-content">
              <h3 className="card-titulo">Canalizaciones Angelicales</h3>
              <p className="card-descripcion">
                Mensajes personalizados de tus ángeles guardianes según lo que necesites hoy. 
                Recibe guía divina para tu camino espiritual.
              </p>
              
              <div className="card-beneficios">
                <div className="beneficio">
                  <span className="beneficio-icono">🌟</span>
                  <span>Propósito de vida y misión del alma</span>
                </div>
                <div className="beneficio">
                  <span className="beneficio-icono">💖</span>
                  <span>Amor propio y sanación emocional</span>
                </div>
                <div className="beneficio">
                  <span className="beneficio-icono">🛡️</span>
                  <span>Protección espiritual y confianza</span>
                </div>
                <div className="beneficio">
                  <span className="beneficio-icono">📩</span>
                  <span>Mensaje angelical del día</span>
                </div>
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <Clock className="w-4 h-4" />
                  <span>6 temas</span>
                </div>
                <div className="stat">
                  <Users className="w-4 h-4" />
                  <span>25k+ lecturas</span>
                </div>
                <div className="stat">
                  <Star className="w-4 h-4" />
                  <span>4.8 rating</span>
                </div>
              </div>
              
              <button className="btn-acceder canalizaciones-btn">
                <MessageCircle className="w-5 h-5" />
                Recibir Canalización
              </button>
            </div>
          </div>
        </div>

        {/* Sección informativa */}
        <div className="seccion-info">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icono">
                <Heart className="w-8 h-8" />
              </div>
              <h4>Sanación Integral</h4>
              <p>
                Combina el poder de las frecuencias sagradas con la sabiduría angelical 
                para una experiencia de sanación completa en todos los niveles.
              </p>
            </div>
            
            <div className="info-item">
              <div className="info-icono">
                <Star className="w-8 h-8" />
              </div>
              <h4>Guía Personalizada</h4>
              <p>
                Cada sesión está diseñada para resonar con tu energía única y 
                proporcionarte exactamente lo que tu alma necesita en este momento.
              </p>
            </div>
            
            <div className="info-item">
              <div className="info-icono">
                <Music className="w-8 h-8" />
              </div>
              <h4>Tecnología Sagrada</h4>
              <p>
                Utilizamos frecuencias específicas respaldadas por la ciencia y 
                canalizaciones auténticas para maximizar los beneficios terapéuticos.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>¿Qué experiencia necesitas hoy?</h3>
            <p>
              La <strong>Sonoterapia</strong> te ayuda a equilibrar tu energía a través del poder 
              de las frecuencias sagradas, mientras que las <strong>Canalizaciones</strong> te 
              conectan directamente con los mensajes angelicales personalizados para tu situación actual.
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-btn sonoterapia"
                onClick={() => setSeccionActiva('sonoterapia')}
              >
                <Headphones className="w-5 h-5" />
                Comenzar Sonoterapia
              </button>
              <button 
                className="cta-btn canalizaciones"
                onClick={() => setSeccionActiva('canalizaciones')}
              >
                <MessageCircle className="w-5 h-5" />
                Recibir Mensaje Angelical
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CanalizacionesSonoterapia;

