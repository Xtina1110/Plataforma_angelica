import React, { useState } from 'react';
import './Dashboard.css';
import {
  Home, User, Settings, LogOut, Heart, Star, BookOpen,
  MessageSquare, Headphones, Zap, ShoppingCart, Award, Calendar, TrendingUp
} from 'lucide-react';

import TiradaAngelical from './TiradaAngelical';
import CanalizacionesSonoterapia from './CanalizacionesSonoterapia';
import TerapiasLimpiezas from './TerapiasLimpiezas';
import AcademiaAngelical from './AcademiaAngelical';
import MensajeDelDia from './MensajeDelDia';
import BlogPodcast from './BlogPodcast';
import TiendaAngelical from './TiendaAngelical';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');

  const userData = {
    nombre: user?.email.split('@')[0] || 'Usuario Angelical',
    rol: 'Miembro Premium',
    sonoterapiasCompletadas: 15,
    canalizacionesEscuchadas: 25,
    diasConsecutivos: 7,
    nivelEspiritual: 'Intermedio',
    puntosDeLuz: 1250,
    cursosFinalizados: 3,
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return renderHome();
      case 'tirada': return <TiradaAngelical />;
      case 'canalizaciones': return <CanalizacionesSonoterapia />;
      case 'terapias': return <TerapiasLimpiezas />;
      case 'academia': return <AcademiaAngelical />;
      case 'mensaje': return <MensajeDelDia />;
      case 'blog': return <BlogPodcast />;
      case 'tienda': return <TiendaAngelical />;
      default: return null;
    }
  };

  const renderHome = () => (
    <div className="dashboard-home">
      <h2 className="titulo-principal">¡Bienvenido de nuevo, <span>{userData.nombre}</span>!</h2>
      <p className="subtitulo-principal">Tu camino espiritual continúa evolucionando.</p>

      <div className="bloques-metricas">
        <div className="bloque azul"><Headphones /> <p>{userData.sonoterapiasCompletadas}<br />Sonoterapias</p></div>
        <div className="bloque lavanda"><MessageSquare /> <p>{userData.canalizacionesEscuchadas}<br />Canalizaciones</p></div>
        <div className="bloque naranja"><Calendar /> <p>{userData.diasConsecutivos}<br />Días consecutivos</p></div>
        <div className="bloque verde"><TrendingUp /> <p>{userData.nivelEspiritual}<br />Nivel</p></div>
        <div className="bloque dorado"><Star /> <p>{userData.puntosDeLuz}<br />Puntos de Luz</p></div>
        <div className="bloque violeta"><Award /> <p>{userData.cursosFinalizados}<br />Cursos</p></div>
      </div>

      <h3 className="subtitulo-apps">Explora nuestras aplicaciones angelicales:</h3>
      <div className="grid-aplicaciones">
        <div className="app-card" onClick={() => setActiveSection('tirada')}><Heart /> Tirada</div>
        <div className="app-card" onClick={() => setActiveSection('canalizaciones')}><Headphones /> Canalizaciones</div>
        <div className="app-card" onClick={() => setActiveSection('terapias')}><Zap /> Terapias</div>
        <div className="app-card" onClick={() => setActiveSection('academia')}><BookOpen /> Academia</div>
        <div className="app-card" onClick={() => setActiveSection('mensaje')}><MessageSquare /> Mensaje</div>
        <div className="app-card" onClick={() => setActiveSection('blog')}><BookOpen /> Blog & Podcast</div>
        <div className="app-card" onClick={() => setActiveSection('tienda')}><ShoppingCart /> Tienda</div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/assets/logo-jca.jpg" alt="Logo JCA" className="sidebar-logo" />
          <h1 className="titulo-sidebar">Plataforma Angélica</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}><Home /> Inicio</li>
            <li className={activeSection === 'tirada' ? 'active' : ''} onClick={() => setActiveSection('tirada')}><Heart /> Tirada</li>
            <li className={activeSection === 'canalizaciones' ? 'active' : ''} onClick={() => setActiveSection('canalizaciones')}><Headphones /> Canalizaciones</li>
            <li className={activeSection === 'terapias' ? 'active' : ''} onClick={() => setActiveSection('terapias')}><Zap /> Terapias</li>
            <li className={activeSection === 'academia' ? 'active' : ''} onClick={() => setActiveSection('academia')}><BookOpen /> Academia</li>
            <li className={activeSection === 'mensaje' ? 'active' : ''} onClick={() => setActiveSection('mensaje')}><MessageSquare /> Mensaje</li>
            <li className={activeSection === 'blog' ? 'active' : ''} onClick={() => setActiveSection('blog')}><BookOpen /> Blog</li>
            <li className={activeSection === 'tienda' ? 'active' : ''} onClick={() => setActiveSection('tienda')}><ShoppingCart /> Tienda</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <User />
          <p>{userData.nombre}</p>
          <span>{userData.rol}</span>
          <button onClick={onLogout}><LogOut />Salir</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-area">{renderSection()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
