import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Home, User, Settings, LogOut, Heart, Star, BookOpen, MessageSquare, Headphones, Zap, ShoppingCart, Award, Calendar, TrendingUp } from 'lucide-react';

// Importar componentes de las aplicaciones
import TiradaAngelical from './TiradaAngelical';
import CanalizacionesSonoterapia from './CanalizacionesSonoterapia';
import TerapiasLimpiezas from './TerapiasLimpiezas';
import AcademiaAngelical from './AcademiaAngelical';
import MensajeDelDia from './MensajeDelDia';
import BlogPodcast from './BlogPodcast';
import TiendaAngelica from './TiendaAngelica';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home'); // home, tirada, canalizaciones, etc.
  const [userData, setUserData] = useState({
    nombre: user?.email.split('@')[0] || 'Usuario',
    email: user?.email || 'usuario@example.com',
    avatar: 'https://via.placeholder.com/150/6a0dad/FFFFFF?text=U'
  } );

  // Datos de ejemplo para las métricas del dashboard
  const [metrics, setMetrics] = useState({
    tiradasRealizadas: 12,
    canalizacionesEscuchadas: 8,
    cursosCompletados: 2,
    mensajesFavoritos: 5,
    productosComprados: 3,
    terapiasAgendadas: 1
  });

  useEffect(() => {
    // Aquí podrías cargar datos reales del usuario y sus métricas desde el backend
    // Por ejemplo, fetch('/api/user/dashboard-data').then(res => res.json()).then(data => setMetrics(data));
  }, [user]);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="dashboard-home">
            <div className="welcome-banner">
              <h2>¡Bienvenido, {userData.nombre}!</h2>
              <p>Conecta con la sabiduría angelical y transforma tu día.</p>
            </div>

            <div className="metrics-summary">
              <h3>Tu Actividad Reciente</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <Star size={24} />
                  <h4>Tiradas Realizadas</h4>
                  <p>{metrics.tiradasRealizadas}</p>
                </div>
                <div className="metric-card">
                  <Headphones size={24} />
                  <h4>Canalizaciones Escuchadas</h4>
                  <p>{metrics.canalizacionesEscuchadas}</p>
                </div>
                <div className="metric-card">
                  <Award size={24} />
                  <h4>Cursos Completados</h4>
                  <p>{metrics.cursosCompletados}</p>
                </div>
                <div className="metric-card">
                  <Heart size={24} />
                  <h4>Mensajes Favoritos</h4>
                  <p>{metrics.mensajesFavoritos}</p>
                </div>
                <div className="metric-card">
                  <ShoppingCart size={24} />
                  <h4>Productos Comprados</h4>
                  <p>{metrics.productosComprados}</p>
                </div>
                <div className="metric-card">
                  <Zap size={24} />
                  <h4>Terapias Agendadas</h4>
                  <p>{metrics.terapiasAgendadas}</p>
                </div>
              </div>
            </div>

            <div className="quick-access">
              <h3>Acceso Rápido a tus Aplicaciones</h3>
              <div className="apps-grid">
                <div className="app-card" onClick={() => setActiveSection('tirada')}>
                  <Star size={36} />
                  <h4>Tirada Angelical</h4>
                  <p>Recibe guía divina al instante.</p>
                </div>
                <div className="app-card" onClick={() => setActiveSection('canalizaciones')}>
                  <Headphones size={36} />
                  <h4>Canalizaciones y Sonoterapia</h4>
                  <p>Armoniza tu ser con sonidos y mensajes.</p>
                </div>
                <div className="app-card" onClick={() => setActiveSection('terapias')}>
                  <Zap size={36} />
                  <h4>Terapias y Limpiezas</h4>
                  <p>Sana y purifica tu energía.</p>
                </div>
                <div className="app-card" onClick={() => setActiveSection('academia')}>
                  <BookOpen size={36} />
                  <h4>Academia Angelical</h4>
                  <p>Aprende y crece espiritualmente.</p>
                </div>
                <div className="app-card" onClick={() => setActiveSection('mensajeDelDia')}>
                  <MessageSquare size={36} />
                  <h4>Mensaje del Día</h4>
                  <p>Inspiración diaria de tus ángeles.</p>
                </div>
                <div className="app-card" onClick={() => setActiveSection('blogPodcast')}>
                  <Calendar size={36} />
                  <h4>Blog y Podcast</h4>
                  <p>Artículos y audios para tu camino.</p>
                </div>
                <div className="app-card" onClick={() => setActiveSection('tienda')}>
                  <ShoppingCart size={36} />
                  <h4>Tienda Angélica</h4>
                  <p>Encuentra productos con energía divina.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tirada':
        return <TiradaAngelical />;
      case 'canalizaciones':
        return <CanalizacionesSonoterapia />;
      case 'terapias':
        return <TerapiasLimpiezas />;
      case 'academia':
        return <AcademiaAngelical />;
      case 'mensajeDelDia':
        return <MensajeDelDia />;
      case 'blogPodcast':
        return <BlogPodcast />;
      case 'tienda':
        return <TiendaAngelica />;
      default:
        return <div className="section-placeholder">Selecciona una opción del menú.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/assets/logos/logo-angelica.png" alt="Logo" className="sidebar-logo" /> {/* Asegúrate de tener un logo en public/assets/logos/ */}
          <h3>Plataforma Angélica</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}>
              <Home size={20} />
              <span>Inicio</span>
            </li>
            <li className={activeSection === 'tirada' ? 'active' : ''} onClick={() => setActiveSection('tirada')}>
              <Star size={20} />
              <span>Tirada Angelical</span>
            </li>
            <li className={activeSection === 'canalizaciones' ? 'active' : ''} onClick={() => setActiveSection('canalizaciones')}>
              <Headphones size={20} />
              <span>Canalizaciones</span>
            </li>
            <li className={activeSection === 'terapias' ? 'active' : ''} onClick={() => setActiveSection('terapias')}>
              <Zap size={20} />
              <span>Terapias y Limpiezas</span>
            </li>
            <li className={activeSection === 'academia' ? 'active' : ''} onClick={() => setActiveSection('academia')}>
              <Award size={20} />
              <span>Academia Angelical</span>
            </li>
            <li className={activeSection === 'mensajeDelDia' ? 'active' : ''} onClick={() => setActiveSection('mensajeDelDia')}>
              <MessageSquare size={20} />
              <span>Mensaje del Día</span>
            </li>
            <li className={activeSection === 'blogPodcast' ? 'active' : ''} onClick={() => setActiveSection('blogPodcast')}>
              <BookOpen size={20} />
              <span>Blog y Podcast</span>
            </li>
            <li className={activeSection === 'tienda' ? 'active' : ''} onClick={() => setActiveSection('tienda')}>
              <ShoppingCart size={20} />
              <span>Tienda Angélica</span>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile-summary">
            <img src={userData.avatar} alt="Avatar" className="user-avatar" />
            <div className="user-info">
              <p className="user-name">{userData.nombre}</p>
              <p className="user-email">{userData.email}</p>
            </div>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            {/* Aquí podrías poner un título dinámico de la sección activa */}
            <h1>{activeSection === 'home' ? 'Dashboard Principal' : activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
          </div>
          <div className="header-right">
            <button className="btn-settings">
              <Settings size={20} />
            </button>
            <button className="btn-user-profile">
              <User size={20} />
            </button>
          </div>
        </header>
        <section className="content-area">
          {renderSection()}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
