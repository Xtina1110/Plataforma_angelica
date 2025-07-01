import React, { useState } from 'react';
import './Dashboard.css';
import '../styles/theme.css';

import logo from '../assets/Logosinfondo.png';
import iconoEstrella from '../assets/IconoEstrellaDashboard.png';
import sonoterapia from '../assets/Sonoterapia02.png';
import fondoMarmoleado from '../assets/Fondomarmoleado.jpg';

import {
  Home, User, LogOut, Heart, BookOpen,
  MessageSquare, Headphones, Zap, ShoppingCart
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

  const [userData] = useState({
    nombre: user?.email?.split('@')[0] || 'Usuario Angelical',
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
      case 'tirada': return <TiradaAngelical />;
      case 'canalizaciones': return <CanalizacionesSonoterapia />;
      case 'terapias': return <TerapiasLimpiezas />;
      case 'academia': return <AcademiaAngelical />;
      case 'mensaje': return <MensajeDelDia />;
      case 'blog': return <BlogPodcast />;
      case 'tienda': return <TiendaAngelical />;
      default:
        return (
          <div className="dashboard-home">
            <div className="bienvenida-usuario">
              <h2>¡Bienvenido de nuevo, {userData.nombre}!</h2>
              <p>Tu camino espiritual continúa evolucionando.</p>
            </div>

            <h3 className="titulo-dashboard">Dashboard Personal</h3>

            <div
              className="bloque-metricas"
              style={{
                backgroundImage: `url(${fondoMarmoleado})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderRadius: '16px',
                padding: '25px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
                marginBottom: '40px',
                backdropFilter: 'blur(3px)'
              }}
            >
              <div className="metricas-usuario">
                <div className="metrica-card">
                  <img src={iconoEstrella} alt="Icono" className="icono-metrica" />
                  <span style={{ color: '#000', fontWeight: 'bold' }}>Sonoterapias</span>
                  <strong style={{ color: '#000' }}>{userData.sonoterapiasCompletadas}</strong>
                </div>
                <div className="metrica-card">
                  <img src={iconoEstrella} alt="Icono" className="icono-metrica" />
                  <span style={{ color: '#000', fontWeight: 'bold' }}>Canalizaciones</span>
                  <strong style={{ color: '#000' }}>{userData.canalizacionesEscuchadas}</strong>
                </div>
                <div className="metrica-card">
                  <img src={iconoEstrella} alt="Icono" className="icono-metrica" />
                  <span style={{ color: '#000', fontWeight: 'bold' }}>Días consecutivos</span>
                  <strong style={{ color: '#000' }}>{userData.diasConsecutivos}</strong>
                </div>
                <div className="metrica-card">
                  <img src={iconoEstrella} alt="Icono" className="icono-metrica" />
                  <span style={{ color: '#000', fontWeight: 'bold' }}>Nivel</span>
                  <strong style={{ color: '#000' }}>{userData.nivelEspiritual}</strong>
                </div>
                <div className="metrica-card">
                  <img src={iconoEstrella} alt="Icono" className="icono-metrica" />
                  <span style={{ color: '#000', fontWeight: 'bold' }}>Puntos de luz</span>
                  <strong style={{ color: '#000' }}>{userData.puntosDeLuz}</strong>
                </div>
                <div className="metrica-card">
                  <img src={iconoEstrella} alt="Icono" className="icono-metrica" />
                  <span style={{ color: '#000', fontWeight: 'bold' }}>Cursos</span>
                  <strong style={{ color: '#000' }}>{userData.cursosFinalizados}</strong>
                </div>
              </div>
            </div>

            <h3 className="subtitulo-apps">Explora nuestras aplicaciones angelicales:</h3>
            <div className="grid-aplicaciones">
              <div className="app-card" onClick={() => setActiveSection('tirada')}><Heart /><h4>Tirada Angelical</h4></div>
              <div className="app-card" onClick={() => setActiveSection('canalizaciones')}><Headphones /><h4>Canalizaciones</h4></div>
              <div className="app-card" onClick={() => setActiveSection('terapias')}><Zap /><h4>Terapias</h4></div>
              <div className="app-card" onClick={() => setActiveSection('academia')}><BookOpen /><h4>Academia</h4></div>
              <div className="app-card" onClick={() => setActiveSection('mensaje')}><MessageSquare /><h4>Mensaje del Día</h4></div>
              <div className="app-card" onClick={() => setActiveSection('blog')}><BookOpen /><h4>Blog & Podcast</h4></div>
              <div className="app-card" onClick={() => setActiveSection('tienda')}><ShoppingCart /><h4>Tienda Angélica</h4></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo JCA" className="sidebar-logo" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={iconoEstrella} alt="Estrella" style={{ width: '72px', height: '72px' }} />
            <h3 className="sidebar-title">Plataforma Angélica</h3>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li onClick={() => setActiveSection('home')}><Home />Inicio</li>
          <li onClick={() => setActiveSection('tirada')}><Heart />Tirada</li>
          <li onClick={() => setActiveSection('canalizaciones')}><Headphones />Canalizaciones</li>
          <li onClick={() => setActiveSection('terapias')}><Zap />Terapias</li>
          <li onClick={() => setActiveSection('academia')}><BookOpen />Academia</li>
          <li onClick={() => setActiveSection('mensaje')}><MessageSquare />Mensaje</li>
          <li onClick={() => setActiveSection('blog')}><BookOpen />Blog</li>
          <li onClick={() => setActiveSection('tienda')}><ShoppingCart />Tienda</li>
        </ul>
        <div className="sidebar-footer">
          <User />
          <span>{userData.nombre}</span>
          <button onClick={onLogout}><LogOut />Salir</button>
        </div>
      </aside>
      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default Dashboard;
