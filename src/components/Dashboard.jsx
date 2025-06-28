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
    nombre: user?.email.split('@')[0] || 'Usuario Angelical',
    rol: 'Miembro Premium',
    sonoterapiasCompletadas: 12,
    canalizacionesEscuchadas: 25,
    diasConsecutivos: 7,
    nivelEspiritual: 'Iluminado',
    puntosDeLuz: 1500,
    cursosFinalizados: 3,
  });

  useEffect(() => {
    // Aquí podrías cargar datos reales del usuario desde el backend
    // Por ahora, usamos datos de ejemplo
  }, [user]);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="dashboard-home">
            <div className="bienvenida-usuario">
              <h2>¡Bienvenido de nuevo, {userData.nombre}!</h2>
              <p>Tu camino espiritual continúa evolucionando.</p>
            </div>

            <div className="metricas-usuario">
              <div className="metrica-card">
                <Headphones size={24} />
                <span>Sonoterapias Completadas</span>
                <strong>{userData.sonoterapiasCompletadas}</strong>
              </div>
              <div className="metrica-card">
                <MessageSquare size={24} />
                <span>Canalizaciones Escuchadas</span>
                <strong>{userData.canalizacionesEscuchadas}</strong>
              </div>
              <div className="metrica-card">
                <Calendar size={24} />
                <span>Días Consecutivos</span>
                <strong>{userData.diasConsecutivos}</strong>
              </div>
              <div className="metrica-card">
                <TrendingUp size={24} />
                <span>Nivel Espiritual</span>
                <strong>{userData.nivelEspiritual}</strong>
              </div>
              <div className="metrica-card">
                <Star size={24} />
                <span>Puntos de Luz</span>
                <strong>{userData.puntosDeLuz}</strong>
              </div>
              <div className="metrica-card">
                <Award size={24} />
                <span>Cursos Finalizados</span>
                <strong>{userData.cursosFinalizados}</strong>
              </div>
            </div>

            <h3 className="subtitulo-apps">Explora nuestras aplicaciones angelicales:</h3>
            <div className="grid-aplicaciones">
              <div className="app-card" onClick={() => setActiveSection('tirada')}>
                <Heart size={36} />
                <h4>Tirada Angelical</h4>
                <p>Recibe guía y mensajes de tus ángeles.</p>
                <button className="btn-acceder">Acceder</button>
              </div>
              <div className="app-card" onClick={() => setActiveSection('canalizaciones')}>
                <Headphones size={36} />
                <h4>Canalizaciones y Sonoterapia</h4>
                <p>Escucha mensajes divinos y frecuencias sanadoras.</p>
                <button className="btn-acceder">Acceder</button>
              </div>
              <div className="app-card" onClick={() => setActiveSection('terapias')}>
                <Zap size={36} />
                <h4>Terapias y Limpiezas</h4>
                <p>Armoniza tu ser y eleva tu vibración.</p>
                <button className="btn-acceder">Acceder</button>
              </div>
              <div className="app-card" onClick={() => setActiveSection('academia')}>
                <BookOpen size={36} />
                <h4>Academia Angelical</h4>
                <p>Expande tu conocimiento y conexión.</p>
                <button className="btn-acceder">Acceder</button>
              </div>
              <div className="app-card" onClick={() => setActiveSection('mensaje')}>
                <MessageSquare size={36} />
                <h4>Mensaje del Día</h4>
                <p>Recibe una guía angelical personalizada.</p>
                <button className="btn-acceder">Acceder</button>
              </div>
              <div className="app-card" onClick={() => setActiveSection('blog')}>
                <BookOpen size={36} />
                <h4>Blog & Podcast</h4>
                <p>Artículos inspiradores y episodios que elevan.</p>
                <button className="btn-acceder">Acceder</button>
              </div>
              <div className="app-card" onClick={() => setActiveSection('tienda')}>
                <ShoppingCart size={36} />
                <h4>Tienda Angélica</h4>
                <p>Productos espirituales bendecidos.</p>
                <button className="btn-acceder">Acceder</button>
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
      case 'mensaje':
        return <MensajeDelDia />;
      case 'blog':
        return <BlogPodcast />;
      case 'tienda':
        return <TiendaAngelica />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/assets/logo-jca.jpg" alt="Logo JCA" className="sidebar-logo" />
          <h3>Plataforma Angélica</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}>
              <Home size={20} />
              <span>Inicio</span>
            </li>
            <li className={activeSection === 'tirada' ? 'active' : ''} onClick={() => setActiveSection('tirada')}>
              <Heart size={20} />
              <span>Tirada Angelical</span>
            </li>
            <li className={activeSection === 'canalizaciones' ? 'active' : ''} onClick={() => setActiveSection('canalizaciones')}>
              <Headphones size={20} />
              <span>Canalizaciones</span>
            </li>
            <li className={activeSection === 'terapias' ? 'active' : ''} onClick={() => setActiveSection('terapias')}>
              <Zap size={20} />
              <span>Terapias</span>
            </li>
            <li className={activeSection === 'academia' ? 'active' : ''} onClick={() => setActiveSection('academia')}>
              <BookOpen size={20} />
              <span>Academia</span>
            </li>
            <li className={activeSection === 'mensaje' ? 'active' : ''} onClick={() => setActiveSection('mensaje')}>
              <MessageSquare size={20} />
              <span>Mensaje del Día</span>
            </li>
            <li className={activeSection === 'blog' ? 'active' : ''} onClick={() => setActiveSection('blog')}>
              <BookOpen size={20} />
              <span>Blog & Podcast</span>
            </li>
            <li className={activeSection === 'tienda' ? 'active' : ''} onClick={() => setActiveSection('tienda')}>
              <ShoppingCart size={20} />
              <span>Tienda</span>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <User size={20} />
            <span>{userData.nombre}</span>
            <span className="user-role">{userData.rol}</span>
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
