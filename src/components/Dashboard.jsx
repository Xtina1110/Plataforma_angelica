// src/components/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import {
  Home, User, Settings, LogOut, Heart, Star, BookOpen,
  MessageSquare, Headphones, Zap, ShoppingCart, Award, Calendar, TrendingUp, Moon, Play
} from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');

  const userData = {
    nombre: user?.email.split('@')[0] || 'Usuario Angelical',
    rol: 'Miembro Premium',
    sonoterapiasCompletadas: 15,
    canalizacionesEscuchadas: 8,
    diasConsecutivos: 7,
    nivelEspiritual: 'Intermedio',
    puntosDeLuz: 1250,
    cursosFinalizados: 3,
  };

  const renderSection = () => (
    <div className="dashboard-home">
      <div className="dashboard-card">
        <h2><Zap size={28} color="#6a0dad" /> Dashboard Personal</h2>
        <div className="dashboard-metrics">
          <div className="metric-card blue"><Headphones /><strong>{userData.sonoterapiasCompletadas}</strong><span>Sonoterapias</span></div>
          <div className="metric-card lavender"><MessageSquare /><strong>{userData.canalizacionesEscuchadas}</strong><span>Canalizaciones</span></div>
          <div className="metric-card orange"><Calendar /><strong>{userData.diasConsecutivos}</strong><span>Días Consecutivos</span></div>
          <div className="metric-card green"><Award /><strong>{userData.nivelEspiritual}</strong><span>Nivel</span></div>
          <div className="metric-card yellow"><Star /><strong>{userData.puntosDeLuz}</strong><span>Puntos de Luz</span></div>
          <div className="metric-card blue2"><BookOpen /><strong>{userData.cursosFinalizados}</strong><span>Cursos Finalizados</span></div>
          <div className="metric-card red"><button className="btn-comenzar"><Play size={16} /> Comenzar</button><span>Ritual Matutino</span></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/assets/Logosinfondo.png" alt="Logo" className="sidebar-logo" />
          <h3 className="titulo-sidebar">Plataforma Angélica</h3>
        </div>
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''} onClick={() => setActiveSection('home')}><Home /><span>Inicio</span></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info"><User /><span>{userData.nombre}</span><span className="user-role">{userData.rol}</span></div>
          <button className="btn-logout" onClick={onLogout}><LogOut /><span>Salir</span></button>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard Principal</h1>
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
