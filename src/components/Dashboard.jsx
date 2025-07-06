// src/components/Dashboard.jsx
import React, { useState } from 'react';
import {
  Home, Heart, Headphones, Zap, BookOpen, GraduationCap,
  MessageSquare, Mic, ShoppingCart, LogOut, User, Menu, X,
  Calendar, Clock, MapPin, Users, Star, ChevronRight
} from 'lucide-react';

import TiradaAngelical from './TiradaAngelical';
import CanalizacionesSonoterapia from './CanalizacionesSonoterapia';
import MensajeDelDia from './MensajeDelDia';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
        <MensajeDelDia />
        {renderCalendarioEventos()}
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

