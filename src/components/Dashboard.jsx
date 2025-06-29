// src/components/Dashboard.jsx
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

  const servicios = [
    {
      id: "tirada",
      titulo: "Tirada Angelical",
      descripcion: "Consulta las cartas angelicales para recibir guía divina",
      icono: "🔮",
      color: "from-purple-400 to-pink-400"
    },
    {
      id: "canalizaciones",
      titulo: "Canalizaciones",
      descripcion: "Mensajes directos de los ángeles y guías espirituales",
      icono: "✨",
      color: "from-blue-400 to-purple-400"
    },
    {
      id: "terapias",
      titulo: "Terapias Angelicales",
      descripcion: "Sanación energética y equilibrio espiritual",
      icono: "🌟",
      color: "from-pink-400 to-red-400"
    },
    {
      id: "academia",
      titulo: "Academia Angelical",
      descripcion: "Aprende a conectar con los ángeles",
      icono: "📚",
      color: "from-indigo-400 to-purple-400"
    },
    {
      id: "mensaje",
      titulo: "Mensaje del Día",
      descripcion: "Una guía espiritual diaria",
      icono: "🕊️",
      color: "from-yellow-400 to-orange-400"
    },
    {
      id: "tienda",
      titulo: "Tienda Angelical",
      descripcion: "Productos espirituales bendecidos",
      icono: "🛍️",
      color: "from-green-400 to-blue-400"
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'tirada': return <TiradaAngelical />;
      case 'canalizaciones': return <CanalizacionesSonoterapia />;
      case 'terapias': return <TerapiasLimpiezas />;
      case 'academia': return <AcademiaAngelical />;
      case 'mensaje': return <MensajeDelDia />;
      case 'blog': return <BlogPodcast />;
      case 'tienda': return <TiendaAngelical />;
      default: return (
        <div className="servicios-container">
          <h2 className="servicios-titulo">Explora nuestros servicios angelicales</h2>
          <div className="servicios-grid">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                onClick={() => setActiveSection(servicio.id)}
                className="servicio-card"
              >
                <div className={`servicio-icono ${servicio.color}`}>
                  {servicio.icono}
                </div>
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src="/assets/logo-jca.jpg" alt="Logo" className="sidebar-logo" />
        <nav>
          <ul>
            <li onClick={() => setActiveSection('home')}><Home /> Inicio</li>
            <li onClick={() => setActiveSection('tirada')}><Heart /> Tirada</li>
            <li onClick={() => setActiveSection('canalizaciones')}><Headphones /> Canalizaciones</li>
            <li onClick={() => setActiveSection('terapias')}><Zap /> Terapias</li>
            <li onClick={() => setActiveSection('academia')}><BookOpen /> Academia</li>
            <li onClick={() => setActiveSection('mensaje')}><MessageSquare /> Mensaje</li>
            <li onClick={() => setActiveSection('blog')}><BookOpen /> Blog</li>
            <li onClick={() => setActiveSection('tienda')}><ShoppingCart /> Tienda</li>
            <li onClick={onLogout}><LogOut /> Salir</li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{activeSection === 'home' ? 'Dashboard Principal' : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          <div><Settings /><User /></div>
        </header>
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
