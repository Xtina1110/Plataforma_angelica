// src/components/Dashboard.jsx
import React, { useState } from 'react';
import {
  Home, Heart, Headphones, Zap, BookOpen, GraduationCap,
  MessageSquare, Mic, ShoppingCart, LogOut, User, Menu, X,
  Calendar, Clock, MapPin, Users, Star, ChevronRight
} from 'lucide-react';

import TiradaAngelical from './TiradaAngelical';
import CanalizacionesSonoterapia from './CanalizacionesSonoterapia';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sistema de mensajes diarios con rotación automática
  const mensajesAngelicales = [
    // Semana 1 - Arcángeles Principales
    { mensaje: "Tu luz interior brilla más fuerte cada día. Los ángeles amplifican tu radiancia espiritual.", arcangel: "Arcángel Miguel", energia: "Protección y Fuerza" },
    { mensaje: "Encuentra la belleza en cada momento. Los ángeles te invitan a celebrar la alegría que existe en tu vida.", arcangel: "Arcángel Gabriel", energia: "Comunicación Divina" },
    { mensaje: "La sanación fluye a través de ti como un río de luz dorada. Permite que tu corazón se abra a nuevas posibilidades.", arcangel: "Arcángel Rafael", energia: "Sanación y Renovación" },
    { mensaje: "Tu sabiduría interior es un faro que guía a otros hacia la luz. Confía en tu intuición angelical.", arcangel: "Arcángel Uriel", energia: "Sabiduría y Claridad" },
    { mensaje: "El amor incondicional fluye desde tu corazón hacia todo lo que te rodea. Eres un canal de amor divino.", arcangel: "Arcángel Chamuel", energia: "Amor Incondicional" },
    { mensaje: "La creatividad divina se manifiesta a través de tus acciones. Cada paso que das crea belleza en el mundo.", arcangel: "Arcángel Jofiel", energia: "Belleza y Creatividad" },
    { mensaje: "La justicia divina trabaja a tu favor. Confía en que el universo conspira para tu mayor bien.", arcangel: "Arcángel Raguel", energia: "Justicia Divina" },

    // Semana 2 - Abundancia y Naturaleza
    { mensaje: "La abundancia del universo fluye hacia ti en formas inesperadas. Abre tu corazón para recibirla.", arcangel: "Arcángel Ariel", energia: "Abundancia Natural" },
    { mensaje: "Tu conexión con lo divino se fortalece cada día. Eres un puente entre el cielo y la tierra.", arcangel: "Arcángel Metatrón", energia: "Conexión Divina" },
    { mensaje: "La compasión que muestras hacia otros regresa a ti multiplicada. Eres un instrumento de misericordia divina.", arcangel: "Arcángel Zadkiel", energia: "Compasión y Perdón" },
    { mensaje: "Tu intuición femenina es un regalo sagrado. Honra la sabiduría que fluye desde tu alma.", arcangel: "Arcángel Haniel", energia: "Intuición Femenina" },
    { mensaje: "Los misterios del universo se revelan gradualmente ante ti. Tu alma está lista para recibir conocimiento sagrado.", arcangel: "Arcángel Raziel", energia: "Misterios Divinos" },
    { mensaje: "Tus oraciones son escuchadas y respondidas de maneras perfectas. Mantén la fe en el plan divino.", arcangel: "Arcángel Sandalfón", energia: "Oraciones Elevadas" },
    { mensaje: "Los sueños que tienes contienen mensajes angelicales. Presta atención a las señales que recibes durante el descanso.", arcangel: "Arcángel Jeremiel", energia: "Sueños Proféticos" },

    // Semana 3 - Transformación y Crecimiento
    { mensaje: "Cada final es un nuevo comienzo disfrazado. Los ángeles te guían a través de todas las transiciones.", arcangel: "Arcángel Azrael", energia: "Transformación" },
    { mensaje: "Tu coraje interior es inquebrantable. Enfrentas cada desafío con la fuerza de mil ángeles a tu lado.", arcangel: "Arcángel Camael", energia: "Coraje Divino" },
    { mensaje: "La paciencia que cultivas te lleva a la maestría espiritual. Cada momento de espera es una oportunidad de crecimiento.", arcangel: "Arcángel Cassiel", energia: "Paciencia Celestial" },
    { mensaje: "Las bendiciones llueven sobre tu vida como pétalos de flores celestiales. Reconoce la gracia que te rodea.", arcangel: "Arcángel Barachiel", energia: "Bendiciones Divinas" },
    { mensaje: "Tu devoción espiritual es un faro de luz en el mundo. Inspiras a otros a buscar su propia conexión divina.", arcangel: "Arcángel Selaphiel", energia: "Devoción Sagrada" },
    { mensaje: "La esperanza que mantienes en tu corazón ilumina el camino para otros. Eres un portador de luz divina.", arcangel: "Arcángel Remiel", energia: "Esperanza Eterna" },
    { mensaje: "Tu conexión con la naturaleza te revela secretos antiguos. Los elementos te susurran sabiduría ancestral.", arcangel: "Arcángel Muriel", energia: "Sabiduría Natural" },

    // Semana 4 - Creatividad y Propósito
    { mensaje: "La belleza que creas en el mundo es un reflejo de tu alma divina. Cada acto creativo es una oración.", arcangel: "Arcángel Iofiel", energia: "Belleza Creativa" },
    { mensaje: "Tu propósito de vida se revela a través de las pasiones que encienden tu corazón. Sigue lo que te inspira.", arcangel: "Arcángel Nathaniel", energia: "Propósito Divino" },
    { mensaje: "Los milagros son eventos naturales cuando vives alineado con tu verdad espiritual. Espera lo extraordinario.", arcangel: "Arcángel Amitiel", energia: "Milagros Cotidianos" },
    { mensaje: "Tu fuerza espiritual crece con cada acto de bondad que realizas. Eres más poderoso de lo que imaginas.", arcangel: "Arcángel Uzziel", energia: "Fuerza Espiritual" },
    { mensaje: "El amor que irradias transforma todo lo que tocas. Eres un alquimista del corazón.", arcangel: "Arcángel Anael", energia: "Alquimia del Amor" },
    { mensaje: "La prosperidad fluye hacia ti cuando vives en gratitud y generosidad. Eres un imán para la abundancia.", arcangel: "Arcángel Sachiel", energia: "Prosperidad Divina" },
    { mensaje: "Los secretos del cosmos se revelan a través de tu meditación profunda. Tu alma conoce verdades eternas.", arcangel: "Arcángel Raziel", energia: "Conocimiento Cósmico" },

    // Días adicionales para completar el año
    { mensaje: "Tu presencia angelical bendice a todos los que te rodean. Eres un regalo del cielo en la tierra.", arcangel: "Arcángel Miguel", energia: "Presencia Divina" },
    { mensaje: "La música de las esferas resuena en tu corazón. Escucha la sinfonía celestial que guía tu camino.", arcangel: "Arcángel Gabriel", energia: "Armonía Celestial" },
    { mensaje: "Cada respiración que tomas es un acto sagrado de conexión con lo divino. Respira conscientemente.", arcangel: "Arcángel Rafael", energia: "Respiración Sagrada" },
    { mensaje: "Tu luz interior es inextinguible. Ni las tormentas más fuertes pueden apagar la llama de tu espíritu.", arcangel: "Arcángel Uriel", energia: "Luz Eterna" }
  ];

  const obtenerMensajeDelDia = () => {
    const hoy = new Date();
    const inicioAño = new Date(hoy.getFullYear(), 0, 1);
    const diaDelAño = Math.floor((hoy - inicioAño) / (24 * 60 * 60 * 1000));
    const indiceMensaje = diaDelAño % mensajesAngelicales.length;
    
    const opcionesFecha = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return {
      fecha: hoy.toLocaleDateString('es-ES', opcionesFecha),
      ...mensajesAngelicales[indiceMensaje]
    };
  };

  const mensajeDelDia = obtenerMensajeDelDia();

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'apertura', label: 'Apertura Angelical', icon: Heart },
    { id: 'sonoterapia', label: 'Sonoterapia y Canalizaciones', icon: Headphones },
    { id: 'terapias', label: 'Terapias y Limpiezas', icon: Zap },
    { id: 'academia', label: 'Academia Angelical', icon: GraduationCap },
    { id: 'mensaje', label: 'Mensaje Diario', icon: MessageSquare },
    { id: 'blog', label: 'Blog & Podcast', icon: Mic },
    { id: 'tienda', label: 'Tienda Angelical', icon: ShoppingCart }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'inicio':
        return renderDashboardInicio();
      case 'apertura':
        return <div className="content-placeholder">Apertura Angelical - Próximamente</div>;
      case 'sonoterapia':
        return <CanalizacionesSonoterapia />;
      case 'terapias':
        return <TiradaAngelical />;
      case 'academia':
        return <div className="content-placeholder">Academia Angelical - Próximamente</div>;
      case 'mensaje':
        return <div className="content-placeholder">Mensaje Diario - Próximamente</div>;
      case 'blog':
        return <div className="content-placeholder">Blog & Podcast - Próximamente</div>;
      case 'tienda':
        return <div className="content-placeholder">Tienda Angelical - Próximamente</div>;
      default:
        return renderDashboardInicio();
    }
  };

  const renderDashboardInicio = () => (
    <div className="dashboard-inicio">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="welcome-title">Bienvenido a tu Plataforma Angelical</h1>
            <p className="welcome-subtitle">Tu espacio sagrado para la conexión divina y el crecimiento espiritual</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🌟</div>
              <div className="stat-content">
                <div className="stat-label">Nivel</div>
                <div className="stat-value">Iluminado</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✨</div>
              <div className="stat-content">
                <div className="stat-label">Puntos de luz</div>
                <div className="stat-value">1500</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🕊️</div>
              <div className="stat-content">
                <div className="stat-label">Días consecutivos</div>
                <div className="stat-value">7</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de estadísticas detalladas */}
      <div className="detailed-stats">
        <div className="stats-row">
          <div className="detailed-stat-card">
            <div className="stat-icon-large">🎵</div>
            <div className="stat-info">
              <div className="stat-number">12</div>
              <div className="stat-description">Sonoterapias</div>
            </div>
          </div>
          
          <div className="detailed-stat-card">
            <div className="stat-icon-large">✈️</div>
            <div className="stat-info">
              <div className="stat-number">25</div>
              <div className="stat-description">Canalizaciones</div>
            </div>
          </div>
          
          <div className="detailed-stat-card">
            <div className="stat-icon-large">♍</div>
            <div className="stat-info">
              <div className="stat-number">3</div>
              <div className="stat-description">Cursos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets principales */}
      <div className="dashboard-widgets">
        {renderMensajeDelDia()}
        {renderCalendarioEventos()}
      </div>
    </div>
  );

  const renderMensajeDelDia = () => (
    <div className="mensaje-del-dia-section">
      <h3 className="titulo-dashboard">Mensaje del Día</h3>
      <div 
        style={{
          position: 'relative',
          height: '450px',
          borderRadius: '30px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 25%, #9370db 50%, #ba55d3 75%, #6a0dad 100%)',
          boxShadow: '0 25px 80px rgba(106, 13, 173, 0.6), 0 15px 40px rgba(138, 43, 226, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          animation: 'mensaje-glow 4s ease-in-out infinite'
        }}
      >
        {/* Imagen del ángel de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <img 
            src="/angel-mensaje.jpg" 
            alt="Ángel celestial" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(1.4) contrast(1.2) saturate(1.1) hue-rotate(15deg)',
              opacity: 0.6
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Overlay con gradientes angelicales */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(106, 13, 173, 0.8) 0%, rgba(138, 43, 226, 0.6) 25%, rgba(147, 112, 219, 0.4) 50%, rgba(186, 85, 211, 0.6) 75%, rgba(106, 13, 173, 0.8) 100%)',
          backdropFilter: 'blur(2px)',
          zIndex: 2
        }}></div>
        
        {/* Efectos de luz y partículas */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none'
        }}>
          {/* Partículas de luz */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 255, 255, 0.8) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            animation: 'particula-float 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '75%',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 255, 255, 0.8) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            animation: 'particula-float 6s ease-in-out infinite',
            animationDelay: '1.2s'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '45%',
            left: '15%',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 255, 255, 0.8) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            animation: 'particula-float 6s ease-in-out infinite',
            animationDelay: '2.4s'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '65%',
            left: '80%',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 255, 255, 0.8) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            animation: 'particula-float 6s ease-in-out infinite',
            animationDelay: '3.6s'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '80%',
            left: '40%',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 255, 255, 0.8) 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
            animation: 'particula-float 6s ease-in-out infinite',
            animationDelay: '4.8s'
          }}></div>
          
          {/* Rayos de luz */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '-20%',
            width: '140%',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 100%)',
            transform: 'rotate(10deg)',
            animation: 'rayo-sweep 8s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '70%',
            left: '-20%',
            width: '140%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 100%)',
            transform: 'rotate(-5deg)',
            animation: 'rayo-sweep 8s ease-in-out infinite',
            animationDelay: '4s'
          }}></div>
        </div>
        
        {/* Contenido del mensaje */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '20px',
          borderRadius: '25px',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.4)'
        }}>
          {/* Fecha premium */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px'
          }}>
            <span style={{
              fontSize: '2rem',
              filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
              animation: 'icono-pulse 3s ease-in-out infinite'
            }}>✨</span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '1.4rem',
              fontWeight: 700,
              fontFamily: 'Playfair Display, serif',
              textTransform: 'capitalize',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
              letterSpacing: '1px'
            }}>{mensajeDelDia.fecha}</span>
          </div>
          
          {/* Texto del mensaje premium */}
          <div style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '30px 0'
          }}>
            {/* Comilla apertura */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: '-20px',
              fontSize: '5rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900,
              color: 'rgba(255, 215, 0, 0.9)',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)',
              animation: 'comilla-shimmer 4s ease-in-out infinite'
            }}>"</div>
            
            {/* Texto del mensaje */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '1.6rem',
              lineHeight: 1.8,
              fontWeight: 500,
              fontStyle: 'italic',
              fontFamily: 'Inter, sans-serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.2)',
              padding: '30px 50px',
              margin: 0,
              position: 'relative',
              zIndex: 1
            }}>{mensajeDelDia.mensaje}</p>
            
            {/* Comilla cierre */}
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              right: '-20px',
              fontSize: '5rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900,
              color: 'rgba(255, 215, 0, 0.9)',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)',
              animation: 'comilla-shimmer 4s ease-in-out infinite'
            }}>"</div>
          </div>
          
          {/* Arcángel premium */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '25px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '1.5rem',
                fontWeight: 800,
                fontFamily: 'Playfair Display, serif',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                letterSpacing: '1px'
              }}>- {mensajeDelDia.arcangel}</span>
              <span style={{
                color: 'rgba(255, 215, 0, 0.95)',
                fontSize: '1.1rem',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}>{mensajeDelDia.energia}</span>
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95) 0%, rgba(255, 193, 7, 0.9) 50%, rgba(255, 215, 0, 0.95) 100%)',
              color: 'rgba(106, 13, 173, 0.9)',
              border: 'none',
              borderRadius: '30px',
              padding: '15px 30px',
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              <span style={{
                fontSize: '1.4rem'
              }}>🧘‍♀️</span>
              <span>Meditar</span>
            </button>
          </div>
        </div>
        
        {/* Bordes decorativos angelicales */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5
        }}>
          {/* Esquina superior izquierda */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 215, 0, 0.8)',
            borderRight: 'none',
            borderBottom: 'none',
            borderRadius: '15px 0 0 0',
            animation: 'esquina-glow 5s ease-in-out infinite'
          }}></div>
          
          {/* Esquina superior derecha */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 215, 0, 0.8)',
            borderLeft: 'none',
            borderBottom: 'none',
            borderRadius: '0 15px 0 0',
            animation: 'esquina-glow 5s ease-in-out infinite'
          }}></div>
          
          {/* Esquina inferior izquierda */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 215, 0, 0.8)',
            borderRight: 'none',
            borderTop: 'none',
            borderRadius: '0 0 0 15px',
            animation: 'esquina-glow 5s ease-in-out infinite'
          }}></div>
          
          {/* Esquina inferior derecha */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 215, 0, 0.8)',
            borderLeft: 'none',
            borderTop: 'none',
            borderRadius: '0 0 15px 0',
            animation: 'esquina-glow 5s ease-in-out infinite'
          }}></div>
        </div>
      </div>
    </div>
  );

  const renderCalendarioEventos = () => (
    <div className="calendario-eventos-widget">
      <div className="calendario-header">
        <h3 className="titulo-dashboard">
          <Calendar className="titulo-icono" />
          Próximos Eventos
        </h3>
      </div>
      
      <div className="eventos-lista">
        <div className="evento-card">
          <div className="evento-fecha">
            <div className="fecha-dia">15</div>
            <div className="fecha-mes">Jul</div>
          </div>
          <div className="evento-info">
            <h4 className="evento-titulo">Meditación Grupal con Arcángeles</h4>
            <div className="evento-detalles">
              <span className="evento-hora">
                <Clock size={14} />
                19:00 - 20:30
              </span>
              <span className="evento-lugar">
                <MapPin size={14} />
                Online
              </span>
            </div>
          </div>
          <div className="evento-accion">
            <button className="btn-unirse">Unirse</button>
          </div>
        </div>

        <div className="evento-card">
          <div className="evento-fecha">
            <div className="fecha-dia">22</div>
            <div className="fecha-mes">Jul</div>
          </div>
          <div className="evento-info">
            <h4 className="evento-titulo">Taller de Canalización Angelical</h4>
            <div className="evento-detalles">
              <span className="evento-hora">
                <Clock size={14} />
                10:00 - 12:00
              </span>
              <span className="evento-lugar">
                <MapPin size={14} />
                Presencial
              </span>
            </div>
          </div>
          <div className="evento-accion">
            <button className="btn-unirse">Reservar</button>
          </div>
        </div>

        <div className="evento-card">
          <div className="evento-fecha">
            <div className="fecha-dia">28</div>
            <div className="fecha-mes">Jul</div>
          </div>
          <div className="evento-info">
            <h4 className="evento-titulo">Círculo de Sanación con Cristales</h4>
            <div className="evento-detalles">
              <span className="evento-hora">
                <Clock size={14} />
                18:00 - 19:30
              </span>
              <span className="evento-lugar">
                <MapPin size={14} />
                Híbrido
              </span>
            </div>
          </div>
          <div className="evento-accion">
            <button className="btn-unirse">Inscribirse</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">👼</div>
            {!sidebarCollapsed && (
              <div className="logo-text">
                <div className="logo-title">Plataforma</div>
                <div className="logo-subtitle">Angelical</div>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <IconComponent size={20} className="nav-icon" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        <ChevronRight size={16} className="nav-arrow" />
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <User size={20} />
            </div>
            {!sidebarCollapsed && (
              <div className="user-info">
                <div className="user-name">demo@test.com</div>
                <div className="user-status">Usuario Premium</div>
              </div>
            )}
          </div>
          
          <button className="logout-btn">
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;

