import React, { useState } from 'react';
import './TerapiasLimpiezas.css';
import { Zap, Heart, Shield, Sun, Feather, CheckCircle } from 'lucide-react';

const terapias = [
  {
    id: 1,
    nombre: 'Limpieza Energética Profunda',
    descripcion: 'Elimina bloqueos y energías estancadas de tu aura y chakras. Te sentirás renovado y ligero.',
    icono: <Zap size={36} />,
    beneficios: [
      'Mayor claridad mental',
      'Reducción del estrés',
      'Aumento de la vitalidad',
      'Mejora del estado de ánimo'
    ],
    duracion: '60 minutos',
    precio: '€75'
  },
  {
    id: 2,
    nombre: 'Sanación con Arcángel Rafael',
    descripcion: 'Canalización de energía sanadora del Arcángel Rafael para restaurar el equilibrio físico, emocional y espiritual.',
    icono: <Heart size={36} />,
    beneficios: [
      'Alivio de dolencias físicas',
      'Sanación de heridas emocionales',
      'Fortalecimiento del sistema inmune',
      'Paz interior'
    ],
    duracion: '45 minutos',
    precio: '€60'
  },
  {
    id: 3,
    nombre: 'Protección Angélica del Aura',
    descripcion: 'Crea un escudo de luz divina alrededor de tu campo energético para protegerte de influencias negativas.',
    icono: <Shield size={36} />,
    beneficios: [
      'Sensación de seguridad',
      'Menos susceptibilidad a energías bajas',
      'Fortalecimiento del campo áurico',
      'Mayor confianza y paz'
    ],
    duracion: '30 minutos',
    precio: '€50'
  },
  {
    id: 4,
    nombre: 'Activación de la Abundancia Divina',
    descripcion: 'Sesión para abrir tus canales a la prosperidad y la abundancia en todas las áreas de tu vida, con la guía de los ángeles de la abundancia.',
    icono: <Sun size={36} />,
    beneficios: [
      'Atracción de oportunidades',
      'Mentalidad de prosperidad',
      'Flujo de ingresos mejorado',
      'Gratitud y alegría'
    ],
    duracion: '50 minutos',
    precio: '€80'
  },
];

const TerapiasLimpiezas = () => {
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState(null);

  const handleVerDetalle = (terapia) => {
    setTerapiaSeleccionada(terapia);
  };

  const handleCerrarDetalle = () => {
    setTerapiaSeleccionada(null);
  };

  return (
    <div className="terapias-limpiezas-container">
      <h2>Terapias y Limpiezas Angelicales</h2>
      <p className="subtitle">Encuentra la sanación y el equilibrio que tu alma necesita.</p>

      <div className="terapias-grid">
        {terapias.map((terapia) => (
          <div key={terapia.id} className="terapia-card">
            <div className="terapia-icon">
              {terapia.icono}
            </div>
            <h3>{terapia.nombre}</h3>
            <p className="terapia-descripcion">{terapia.descripcion}</p>
            <div className="terapia-meta">
              <span>Duración: <strong>{terapia.duracion}</strong></span>
              <span>Precio: <strong>{terapia.precio}</strong></span>
            </div>
            <button className="btn-ver-detalle" onClick={() => handleVerDetalle(terapia)}>
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {terapiaSeleccionada && (
        <div className="modal-overlay" onClick={handleCerrarDetalle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Evita que el clic dentro del modal cierre el modal */}
            <button className="modal-close-btn" onClick={handleCerrarDetalle}>&times;</button>
            <div className="modal-header">
              <div className="icono-terapia-modal">
                {terapiaSeleccionada.icono}
              </div>
              <h2>{terapiaSeleccionada.nombre}</h2>
            </div>
            <p className="descripcion-larga">{terapiaSeleccionada.descripcion}</p>
            
            <div className="beneficios-seccion">
              <h4>Beneficios Clave:</h4>
              <ul>
                {terapiaSeleccionada.beneficios.map((beneficio, index) => (
                  <li key={index}><CheckCircle size={16} /> {beneficio}</li>
                ))}
              </ul>
            </div>

            <div className="info-adicional">
              <p><strong>Duración:</strong> {terapiaSeleccionada.duracion}</p>
              <p><strong>Inversión:</strong> {terapiaSeleccionada.precio}</p>
            </div>

            <button className="btn-agendar">Agendar Terapia</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerapiasLimpiezas;
