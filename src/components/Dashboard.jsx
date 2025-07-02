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
    nombre: user?.email?.split('@')[0] || 'Usuario Angelical',
    rol: 'Miembro Premium',
    nivelEspiritual: 'Iluminado',
    puntosDeLuz: 1500,
    diasConsecutivos: 7,
    sonoterapiasCompletadas: 12,
    canalizacionesEscuchadas: 25,
    cursosFinalizados: 3,
  };

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
              <div
                className="bloque-metricas"
                style={{
                  backgroundImage: `url(${fondoMarmoleado})`,
                  backgroundSize: 'cover',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  borderRadius: '16px',
                  padding: '20px',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div className="metrica-card"><img src={iconNivel} /><span>Nivel</span><strong>{userData.nivelEspiritual}</strong></div>
                <div className="metrica-card"><img src={iconPuntos} /><span>Puntos de luz</span><strong>{userData.puntosDeLuz}</strong></div>
                <div className="metrica-card"><img src={iconDias} /><span>Días consecutivos</span><strong>{userData.diasConsecutivos}</strong></div>
                <div className="metrica-card"><img src={iconSonoterapia} /><span>Sonoterapias</span><strong>{userData.sonoterapiasCompletadas}</strong></div>
                <div className="metrica-card"><img src={iconCanalizaciones} /><span>Canalizaciones</span><strong>{userData.canalizacionesEscuchadas}</strong></div>
                <div className="metrica-card"><img src={iconCursos} /><span>Cursos</span><strong>{userData.cursosFinalizados}</strong></div>
              </div>
            </div>

            <h3 className="subtitulo-apps">Explora nuestras aplicaciones angelicales:</h3>
            <div className="grid-aplicaciones tarjetas-coloridas">
              <div className="tarjeta-app azul" onClick={() => setActiveSection('tirada')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Tirada Angelical</h4>
                <p>Conecta con la sabiduría de los ángeles</p>
                <button className="btn-acceder">Acceder</button>
              </div>

              <div className="tarjeta-app morado" onClick={() => setActiveSection('canalizaciones')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Canalizaciones y Sonoterapia</h4>
                <p>Frecuencias sagradas de sanación</p>
                <button className="btn-acceder">Acceder</button>
              </div>

              <div className="tarjeta-app fucsia" onClick={() => setActiveSection('terapias')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Terapias y Limpiezas</h4>
                <p>Sanación angelical profunda</p>
                <button className="btn-acceder">Acceder</button>
              </div>

              <div className="tarjeta-app verde" onClick={() => setActiveSection('academia')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Academia Angelical</h4>
                <p>Formación espiritual completa</p>
                <button className="btn-acceder">Acceder</button>
              </div>

              <div className="tarjeta-app celeste" onClick={() => setActiveSection('mensaje')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Mensaje del Día</h4>
                <p>Canalización espiritual diaria</p>
                <button className="btn-acceder">Acceder</button>
              </div>

              <div className="tarjeta-app rojo" onClick={() => setActiveSection('blog')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Blog & Podcast</h4>
                <p>Contenido espiritual diario</p>
                <button className="btn-acceder">Acceder</button>
              </div>

              <div className="tarjeta-app dorado" onClick={() => setActiveSection('tienda')}>
                <span className="estado-disponible">Disponible</span>
                <h4>Tienda Angélica</h4>
                <p>Productos y regalos con alma</p>
                <button className="btn-acceder">Acceder</button>
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
          <li onClick={() => setActiveSection('home')}>Inicio</li>
          <li onClick={() => setActiveSection('tirada')}>Tirada</li>
          <li onClick={() => setActiveSection('canalizaciones')}>Canalizaciones</li>
          <li onClick={() => setActiveSection('terapias')}>Terapias</li>
          <li onClick={() => setActiveSection('academia')}>Academia</li>
          <li onClick={() => setActiveSection('mensaje')}>Mensaje</li>
          <li onClick={() => setActiveSection('blog')}>Blog</li>
          <li onClick={() => setActiveSection('tienda')}>Tienda</li>
        </ul>
        <div className="sidebar-footer">
          <strong>{userData.nombre}</strong>
          <button onClick={onLogout}>Salir</button>
        </div>
      </aside>
      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default Dashboard;
