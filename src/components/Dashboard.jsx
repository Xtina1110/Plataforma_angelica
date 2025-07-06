// src/components/Dashboard.jsx
import React, { useState } from 'react';
import {
  Home, Heart, Headphones, Zap, BookOpen, GraduationCap,
  MessageSquare, Mic, ShoppingCart, LogOut, User, Menu, X,
  Calendar, Clock, MapPin, Users, Star, ChevronRight
} from 'lucide-react';

import TiradaAngelical from './TiradaAngelical';
import CanalizacionesSonoterapia from './CanalizacionesSonoterapia';
import TerapiasLimpiezas from './TerapiasLimpiezas';
import AcademiaAngelical from './AcademiaAngelical';
import MensajeDelDia from './MensajeDelDia';
import BlogPodcast from './BlogPodcast';
import TiendaAngelical from './TiendaAngelical';

import logo from '../assets/Logosinfondo.png';
import fondoMarmoleado from '../assets/Fondomarmoleado.jpg';
import iconoAngelDashboard from '../assets/IconoDashboard.png';
import iconNivel from '../assets/IconoNivel.png';
import iconPuntos from '../assets/IconoPuntos.png';
import iconDias from '../assets/IconoDias.png';
import iconSonoterapia from '../assets/IconoSonoterapia.png';
import iconCanalizaciones from '../assets/IconoCanalizaciones.png';
import iconCursos from '../assets/IconoCursos.png';

import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [userData] = useState({
    nombre: user?.email?.split('@')[0] || 'Usuario Angelical',
    rol: 'Miembro Premium',
    nivelEspiritual: 'Iluminado',
    puntosDeLuz: 1500,
    diasConsecutivos: 7,
    sonoterapiasCompletadas: 12,
    canalizacionesEscuchadas: 25,
    cursosFinalizados: 3,
  });

  // Datos del mensaje del día
  const [mensajeDelDia] = useState({
    fecha: new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    mensaje: "Los ángeles te recuerdan que cada nuevo día es una oportunidad para elevar tu vibración y conectar con tu propósito divino.",
    arcangel: "Arcángel Miguel",
    energia: "Protección y Valor"
  });

  // Datos de eventos del angelólogo
  const [eventos] = useState([
    {
      id: 1,
      titulo: "Meditación Grupal con Arcángeles",
      fecha: "2025-01-15",
      hora: "19:00",
      duracion: "90 min",
      modalidad: "Presencial",
      ubicacion: "Centro Angelical Madrid",
      precio: "25€",
      cupos: 15,
      inscritos: 8,
      descripcion: "Sesión de meditación guiada para conectar con la energía de los arcángeles",
      instructor: "Juan Carlos Ávila",
      categoria: "Meditación",
      inscrito: false
    },
    {
      id: 2,
      titulo: "Taller de Cartas Angelicales",
      fecha: "2025-01-18",
      hora: "16:30",
      duracion: "3 horas",
      modalidad: "Online",
      ubicacion: "Zoom",
      precio: "45€",
      cupos: 25,
      inscritos: 18,
      descripcion: "Aprende a interpretar las cartas angelicales y conectar con tus guías espirituales",
      instructor: "Juan Carlos Ávila",
      categoria: "Formación",
      inscrito: true
    },
    {
      id: 3,
      titulo: "Sanación con Frecuencias Angelicales",
      fecha: "2025-01-22",
      hora: "20:00",
      duracion: "60 min",
      modalidad: "Online",
      ubicacion: "Plataforma Angelical",
      precio: "20€",
      cupos: 50,
      inscritos: 32,
      descripcion: "Sesión de sanación utilizando frecuencias sagradas y energía angelical",
      instructor: "Juan Carlos Ávila",
      categoria: "Sanación",
      inscrito: false
    },
    {
      id: 4,
      titulo: "Círculo de Canalización Angelical",
      fecha: "2025-01-25",
      hora: "18:00",
      duracion: "2 horas",
      modalidad: "Presencial",
      ubicacion: "Centro Angelical Barcelona",
      precio: "35€",
      cupos: 12,
      inscritos: 12,
      descripcion: "Círculo íntimo para recibir mensajes canalizados de los ángeles",
      instructor: "Juan Carlos Ávila",
      categoria: "Canalización",
      inscrito: true
    }
  ]);

  const [eventosInscritos, setEventosInscritos] = useState(
    eventos.filter(evento => evento.inscrito).map(evento => evento.id)
  );

  const toggleInscripcion = (eventoId) => {
    setEventosInscritos(prev => {
      if (prev.includes(eventoId)) {
        return prev.filter(id => id !== eventoId);
      } else {
        return [...prev, eventoId];
      }
    });
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Inicio', color: '#6a0dad' },
    { id: 'tirada', icon: Heart, label: 'Apertura Angelica', color: '#4fc3f7' },
    { id: 'canalizaciones', icon: Headphones, label: 'Sonoterapia y Canalizaciones', color: '#b39ddb' },
    { id: 'terapias', icon: Zap, label: 'Terapias y Limpiezas', color: '#f48fb1' },
    { id: 'academia', icon: GraduationCap, label: 'Academia Angelica', color: '#81c784' },
    { id: 'mensaje', icon: MessageSquare, label: 'Mensaje Diario', color: '#9575cd' },
    { id: 'blog', icon: Mic, label: 'Blog & Podcast', color: '#ce93d8' },
    { id: 'tienda', icon: ShoppingCart, label: 'Tienda Angelica', color: '#ff8a65' },
  ];

  const renderMensajeDelDia = () => (
    <div className="mensaje-del-dia-widget">
      <div className="mensaje-header">
        <MessageSquare className="mensaje-icon" />
        <h3>Mensaje del Día</h3>
      </div>
      <div className="mensaje-content">
        <p className="mensaje-fecha">{mensajeDelDia.fecha}</p>
        <blockquote className="mensaje-texto">
          "{mensajeDelDia.mensaje}"
        </blockquote>
        <div className="mensaje-footer">
          <span className="arcangel">- {mensajeDelDia.arcangel}</span>
          <span className="energia">{mensajeDelDia.energia}</span>
        </div>
      </div>
    </div>
  );

  const renderCalendarioEventos = () => (
    <div className="calendario-eventos-widget">
      <div className="calendario-header">
        <Calendar className="calendario-icon" />
        <h3>Próximos Eventos</h3>
      </div>
      <div className="eventos-lista">
        {eventos.slice(0, 3).map(evento => {
          const estaInscrito = eventosInscritos.includes(evento.id);
          const fechaEvento = new Date(evento.fecha);
          const esCompleto = evento.inscritos >= evento.cupos;
          
          return (
            <div key={evento.id} className={`evento-card ${estaInscrito ? 'inscrito' : ''} ${esCompleto ? 'completo' : ''}`}>
              <div className="evento-fecha">
                <span className="dia">{fechaEvento.getDate()}</span>
                <span className="mes">{fechaEvento.toLocaleDateString('es-ES', { month: 'short' })}</span>
              </div>
              
              <div className="evento-info">
                <h4 className="evento-titulo">{evento.titulo}</h4>
                <div className="evento-detalles">
                  <span className="evento-hora">
                    <Clock size={14} />
                    {evento.hora} ({evento.duracion})
                  </span>
                  <span className="evento-modalidad">
                    <MapPin size={14} />
                    {evento.modalidad}
                  </span>
                  <span className="evento-cupos">
                    <Users size={14} />
                    {evento.inscritos}/{evento.cupos}
                  </span>
                </div>
                <div className="evento-categoria">
                  <span className={`categoria-badge ${evento.categoria.toLowerCase()}`}>
                    {evento.categoria}
                  </span>
                  <span className="evento-precio">{evento.precio}</span>
                </div>
              </div>
              
              <div className="evento-acciones">
                {estaInscrito ? (
                  <div className="inscrito-badge">
                    <Star size={16} />
                    Inscrito
                  </div>
                ) : (
                  <button 
                    className={`btn-inscribir ${esCompleto ? 'completo' : ''}`}
                    onClick={() => !esCompleto && toggleInscripcion(evento.id)}
                    disabled={esCompleto}
                  >
                    {esCompleto ? 'Completo' : 'Inscribirse'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="ver-todos-eventos" onClick={() => setActiveSection('eventos')}>
        Ver todos los eventos
        <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'tirada': return <TiradaAngelical onVolver={() => setActiveSection('home')} />;
      case 'canalizaciones': return <CanalizacionesSonoterapia onVolver={() => setActiveSection('home')} />;
      case 'terapias': return <TerapiasLimpiezas onVolver={() => setActiveSection('home')} />;
      case 'academia': return <AcademiaAngelical onVolver={() => setActiveSection('home')} />;
      case 'mensaje': return <MensajeDelDia onVolver={() => setActiveSection('home')} />;
      case 'blog': return <BlogPodcast onVolver={() => setActiveSection('home')} />;
      case 'tienda': return <TiendaAngelical onVolver={() => setActiveSection('home')} />;
      case 'eventos':
        return (
          <div className="eventos-completos">
            <div className="eventos-header">
              <button onClick={() => setActiveSection('home')} className="btn-volver">
                ← Volver al Dashboard
              </button>
              <h2>Calendario de Eventos Angelicales</h2>
            </div>
            <div className="eventos-grid">
              {eventos.map(evento => {
                const estaInscrito = eventosInscritos.includes(evento.id);
                const fechaEvento = new Date(evento.fecha);
                const esCompleto = evento.inscritos >= evento.cupos;
                
                return (
                  <div key={evento.id} className={`evento-card-completa ${estaInscrito ? 'inscrito' : ''}`}>
                    <div className="evento-header-completa">
                      <div className="evento-fecha-completa">
                        <span className="dia">{fechaEvento.getDate()}</span>
                        <span className="mes">{fechaEvento.toLocaleDateString('es-ES', { month: 'long' })}</span>
                      </div>
                      <span className={`categoria-badge ${evento.categoria.toLowerCase()}`}>
                        {evento.categoria}
                      </span>
                    </div>
                    
                    <h3>{evento.titulo}</h3>
                    <p className="evento-descripcion">{evento.descripcion}</p>
                    
                    <div className="evento-detalles-completa">
                      <div className="detalle">
                        <Clock size={16} />
                        <span>{evento.hora} - {evento.duracion}</span>
                      </div>
                      <div className="detalle">
                        <MapPin size={16} />
                        <span>{evento.modalidad} - {evento.ubicacion}</span>
                      </div>
                      <div className="detalle">
                        <Users size={16} />
                        <span>{evento.inscritos}/{evento.cupos} participantes</span>
                      </div>
                      <div className="detalle">
                        <User size={16} />
                        <span>{evento.instructor}</span>
                      </div>
                    </div>
                    
                    <div className="evento-footer-completa">
                      <span className="precio">{evento.precio}</span>
                      {estaInscrito ? (
                        <button className="btn-inscrito" onClick={() => toggleInscripcion(evento.id)}>
                          <Star size={16} />
                          Cancelar Inscripción
                        </button>
                      ) : (
                        <button 
                          className={`btn-inscribir-completa ${esCompleto ? 'completo' : ''}`}
                          onClick={() => !esCompleto && toggleInscripcion(evento.id)}
                          disabled={esCompleto}
                        >
                          {esCompleto ? 'Evento Completo' : 'Inscribirse Ahora'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard-home">
            <div className="bienvenida-usuario">
              <h2>¡Bienvenido de nuevo, {userData.nombre}!</h2>
              <p>Tu camino espiritual continúa evolucionando.</p>
            </div>

            {/* Mensaje del Día */}
            {renderMensajeDelDia()}

            {/* Calendario de Eventos */}
            {renderCalendarioEventos()}

            <h3 className="titulo-dashboard">Dashboard Personal</h3>

            {/* Fondo angelical con transparencia */}
            <div
              className="seccion-dashboard relative overflow-hidden rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6"
              style={{
                backgroundImage: `url(${fondoMarmoleado})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Capa de transparencia */}
              <div className="absolute inset-0 bg-white/40 z-0 pointer-events-none rounded-xl" />

              {/* Imagen del ángel */}
              <div className="relative z-10">
                <img src={iconoAngelDashboard} alt="Ángel" className="imagen-angel-dashboard grande" />
              </div>

              {/* Tarjetas métricas */}
              <div className="bloque-metricas relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="metrica-card"><img src={iconNivel} /><span>Nivel</span><strong>{userData.nivelEspiritual}</strong></div>
                <div className="metrica-card"><img src={iconPuntos} /><span>Puntos de luz</span><strong>{userData.puntosDeLuz}</strong></div>
                <div className="metrica-card"><img src={iconDias} /><span>Días consecutivos</span><strong>{userData.diasConsecutivos}</strong></div>
                <div className="metrica-card"><img src={iconSonoterapia} /><span>Sonoterapias</span><strong>{userData.sonoterapiasCompletadas}</strong></div>
                <div className="metrica-card"><img src={iconCanalizaciones} /><span>Canalizaciones</span><strong>{userData.canalizacionesEscuchadas}</strong></div>
                <div className="metrica-card"><img src={iconCursos} /><span>Cursos</span><strong>{userData.cursosFinalizados}</strong></div>
              </div>
            </div>

            <h3 className="subtitulo-apps">Explora nuestras aplicaciones angelicales:</h3>
            <div className="grid-aplicaciones">
              {[
                { id: 'tirada', icon: <Heart />, titulo: 'Apertura Angelica', desc: 'Conecta con la sabiduría de los ángeles', disponible: true },
                { id: 'canalizaciones', icon: <Headphones />, titulo: 'Canalizaciones y Sonoterapia', desc: 'Frecuencias sagradas de sanación', disponible: true },
                { id: 'terapias', icon: <Zap />, titulo: 'Terapias y Limpiezas', desc: 'Sanación angelica profunda', disponible: true },
                { id: 'academia', icon: <GraduationCap />, titulo: 'Academia Angelica', desc: 'Formación espiritual completa', disponible: true },
                { id: 'mensaje', icon: <MessageSquare />, titulo: 'Mensaje del Día', desc: 'Recibe una canalización espiritual', disponible: true },
                { id: 'blog', icon: <Mic />, titulo: 'Blog & Podcast', desc: 'Contenido espiritual diario', disponible: true },
                { id: 'tienda', icon: <ShoppingCart />, titulo: 'Tienda Angélica', desc: 'Cartas y recursos espirituales', disponible: false },
              ].map(app => (
                <div key={app.id} className={`app-card ${app.id}`}>
                  <div className="app-header">
                    {app.icon}
                    <span className={`disponibilidad ${app.disponible ? 'disponible' : 'proximamente'}`}>
                      {app.disponible ? 'Disponible' : 'Próximamente'}
                    </span>
                  </div>
                  <h4>{app.titulo}</h4>
                  <p>{app.desc}</p>
                  <button onClick={() => setActiveSection(app.id)}>Acceder</button>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo JCA" className="sidebar-logo" />
          {!sidebarCollapsed && <h3 className="sidebar-title">Plataforma Angélica</h3>}
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        <ul className="sidebar-nav">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            return (
              <li 
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
                style={{ '--item-color': item.color }}
              >
                <IconComponent size={20} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </li>
            );
          })}
        </ul>
        
        <div className="sidebar-footer">
          <User size={20} />
          {!sidebarCollapsed && (
            <>
              <span>{userData.nombre}</span>
              <button onClick={onLogout}>
                <LogOut size={16} />
                Salir
              </button>
            </>
          )}
        </div>
      </aside>
      
      <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;

