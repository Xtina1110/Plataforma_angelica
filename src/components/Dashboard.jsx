// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
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
import TiendaAngelical from './TiendaAngelical'; // nombre correcto

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
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
              <div className="metrica-card"><Headphones /><span>Sonoterapias</span><strong>{userData.sonoterapiasCompletadas}</strong></div>
              <div className="metrica-card"><MessageSquare /><span>Canalizaciones</span><strong>{userData.canalizacionesEscuchadas}</strong></div>
              <div className="metrica-card"><Calendar /><span>Días consecutivos</span><strong>{userData.diasConsecutivos}</strong></div>
              <div className="metrica-card"><TrendingUp /><span>Nivel</span><strong>{userData.nivelEspiritual}</strong></div>
              <div className="metrica-card"><Star /><span>Puntos de luz</span><strong>{userData.puntosDeLuz}</strong></div>
              <div className="metrica-card"><Award /><span>Cursos</span><strong>{userData.cursosFinalizados}</strong></div>
            </div>
            <h3 className="subtitulo-apps">Explora nuestras aplicaciones angelicales:</h3>
            <div className="grid-aplicaciones">
              <div className="app-card" onClick={() => setActiveSection('tirada')}><Heart /><h4>Tirada Angelical</h4><button className="btn-acceder">Acceder</button></div>
              <div className="app-card" onClick={() => setActiveSection('canalizaciones')}><Headphones /><h4>Canalizaciones</h4><button className="btn-acceder">Acceder</button></div>
              <div className="app-card" onClick={() => setActiveSection('terapias')}><Zap /><h4>Terapias</h4><button className="btn-acceder">Acceder</button></div>
              <div className="app-card" onClick={() => setActiveSection('academia')}><BookOpen /><h4>Academia</h4><button className="btn-acceder">Acceder</button></div>
              <div className="app-card" onClick={() => setActiveSection('mensaje')}><MessageSquare /><h4>Mensaje del Día</h4><button className="btn-acceder">Acceder</button></div>
              <div className="app-card" onClick={() => setActiveSection('blog')}><BookOpen /><h4>Blog & Podcast</h4><button className="btn-acceder">Acceder</button></div>
              <div className="app-card" onClick={() => setActiveSection('tienda')}><ShoppingCart /><h4>Tienda Angélica</h4><button className="btn-acceder">Acceder</button></div>
            </div>
          </div>
        );
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

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/assets/logo-jca.jpg" alt="Logo JCA" className="sidebar-logo" />
          <h3>Plataforma Angélica</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}><Home /><span>Inicio</span></li>
            <li className={activeSection === 'tirada' ? 'active' : ''} onClick={() => setActiveSection('tirada')}><Heart /><span>Tirada</span></li>
            <li className={activeSection === 'canalizaciones' ? 'active' : ''} onClick={() => setActiveSection('canalizaciones')}><Headphones /><span>Canalizaciones</span></li>
            <li className={activeSection === 'terapias' ? 'active' : ''} onClick={() => setActiveSection('terapias')}><Zap /><span>Terapias</span></li>
            <li className={activeSection === 'academia' ? 'active' : ''} onClick={() => setActiveSection('academia')}><BookOpen /><span>Academia</span></li>
            <li className={activeSection === 'mensaje' ? 'active' : ''} onClick={() => setActiveSection('mensaje')}><MessageSquare /><span>Mensaje</span></li>
            <li className={activeSection === 'blog' ? 'active' : ''} onClick={() => setActiveSection('blog')}><BookOpen /><span>Blog</span></li>
            <li className={activeSection === 'tienda' ? 'active' : ''} onClick={() => setActiveSection('tienda')}><ShoppingCart /><span>Tienda</span></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info"><User /><span>{userData.nombre}</span><span className="user-role">{userData.rol}</span></div>
          <button className="btn-logout" onClick={onLogout}><LogOut /><span>Salir</span></button>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>{activeSection === 'home' ? 'Dashboard Principal' : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          <div className="header-right">
            <button className="btn-settings"><Settings /></button>
            <button className="btn-user-profile"><User /></button>
          </div>
        </header>
        <section className="content-area">{renderSection()}</section>
      </main>
    </div>
  );
};

export default Dashboard;
