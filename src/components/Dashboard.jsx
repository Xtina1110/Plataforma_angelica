import React, { useState } from 'react';
import './Dashboard.css';
import '../styles/theme.css';

import logo from '../assets/Logosinfondo.png';
import fondoMarmoleado from '../assets/Fondomarmoleado.jpg';
import iconSonoterapia from '../assets/IconoSonoterapia.png';
import iconCanalizaciones from '../assets/IconoCanalizaciones.png';
import iconDias from '../assets/IconoDias.png';
import iconNivel from '../assets/IconoNivel.png';
import iconPuntos from '../assets/IconoPuntos.png';
import iconCursos from '../assets/IconoCursos.png';
import iconoAngelDashboard from '../assets/IconoDashboard.png';

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
    nivelEspiritual: 'Iluminado',
    puntosDeLuz: 1500,
    diasConsecutivos: 7,
    sonoterapiasCompletadas: 12,
    canalizacionesEscuchadas: 25,
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
            <div className="seccion-dashboard">
              <img src={iconoAngelDashboard} alt="Ángel" className="imagen-angel-dashboard" />
              <div className="bloque-metricas">
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
              <div className="app-card app-tirada">
                <div className="app-top"><Heart /><span className="badge">Disponible</span></div>
                <h4>Tirada Angelical</h4>
                <p>Conecta con la sabiduría de los ángeles</p>
                <button onClick={() => setActiveSection('tirada')}>Acceder</button>
              </div>
              <div className="app-card app-canalizaciones">
                <div className="app-top"><Headphones /><span className="badge">Disponible</span></div>
                <h4>Canalizaciones y Sonoterapia</h4>
                <p>Frecuencias sagradas de sanación</p>
                <button onClick={() => setActiveSection('canalizaciones')}>Acceder</button>
              </div>
              <div className="app-card app-terapias">
                <div className="app-top"><Zap /><span className="badge">Disponible</span></div>
                <h4>Terapias y Limpiezas</h4>
                <p>Sanación angelical profunda</p>
                <button onClick={() => setActiveSection('terapias')}>Acceder</button>
              </div>
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
          <h3 className="sidebar-title">Plataforma Angélica</h3>
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
