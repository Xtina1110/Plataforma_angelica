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
      'Menos susceptibilidad a energías externas',
      'Mayor confianza',
      'Sueño reparador'
    ],
    duracion: '30 minutos',
    precio: '€45'
  },
  {
    id: 4,
    nombre: 'Activación de la Abundancia Divina',
    descripcion: 'Abre tus canales para recibir la prosperidad y abundancia que el universo tiene para ti, alineándote con tu propósito.',
    icono: <Sun size={36} />,
    beneficios: [
      'Atracción de oportunidades',
      'Mejora financiera',
      'Mentalidad positiva',
      'Manifestación de deseos'
    ],
    duracion: '50 minutos',
    precio: '€70'
  }
];

const TerapiasLimpiezas = () => {
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState(null);

  const handleSeleccionarTerapia = (terapia) => {
    setTerapiaSeleccionada(terapia);
  };

  const handleCerrarDetalle = () => {
    setTerapiaSeleccionada(null);
  };

  return (
    <div className="terapias-limpiezas">
      <h2 className="titulo-seccion"><Feather /> Terapias y Limpiezas</h2>
      <p className="subtitulo-seccion">Armoniza tu ser y eleva tu vibración con nuestras terapias angelicales.</p>

      <div className="lista-terapias">
        {terapias.map((terapia) => (
          <div 
            key={terapia.id} 
            className="card-terapia"
            onClick={() => handleSeleccionarTerapia(terapia)}
          >
            <div className="icono-terapia">
              {terapia.icono}
            </div>
            <h3>{terapia.nombre}</h3>
            <p className="descripcion-corta">{terapia.descripcion}</p>
            <div className="meta-info">
              <span>{terapia.duracion}</span>
              <span>{terapia.precio}</span>
            </div>
            <button className="btn-ver-mas">Ver Detalles</button>
          </div>
        ))}
      </div>

      {terapiaSeleccionada && (
        <div className="modal-terapia-detalle">
          <div className="modal-contenido">
            <button className="btn-cerrar-modal" onClick={handleCerrarDetalle}>&times;</button>
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
