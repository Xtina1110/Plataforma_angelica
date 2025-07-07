
// src/components/Dashboard.jsx
import React, { useState } from 'react';
import {
  Home, Heart, Headphones, Zap, BookOpen, GraduationCap,
  MessageSquare, Mic, ShoppingCart, LogOut, User, Menu, X,
  Calendar, Clock, MapPin, Users, Star, ChevronRight
} from 'lucide-react';

import TiradaAngelical from './TiradaAngelical';
import CanalizacionesSonoterapia from './CanalizacionesSonoterapia';
import TerapiasLimpiezas from './TerapiasLimpiezas';
import AcademiaAngelical from './AcademiaAngelical';
import BlogPodcast from './BlogPodcast';
import TiendaAngelical from './TiendaAngelical';

import logo from '../assets/Logosinfondo.png';
import fondoMarmoleado from '../assets/Fondomarmoleado.jpg';
import iconoAngelDashboard from '../assets/IconoDashboard.png';
import iconNivel from '../assets/IconoNivel.png';
import iconPuntos from '../assets/IconoPuntos.png';
import iconDias from '../assets/IconoDias.png';
import iconSonoterapia from '../assets/IconoSonoterapia.png';
import iconCanalizaciones from '../assets/IconoCanalizaciones.png';
import iconCursos from '../assets/IconoCursos.png';
import mensajeDelDiaFondo from '../assets/MensajeDelDia.png';

import './Dashboard.css';

// CONTENIDO OMITIDO: toda la lógica anterior sigue igual

// Modificamos el método renderMensajeDelDia para usar la nueva imagen
const renderMensajeDelDia = () => (
  <div className="mensaje-del-dia-section">
    <h3 className="titulo-dashboard">Mensaje del Día</h3>
    <div className="mensaje-del-dia-premium">
      <div className="mensaje-angel-fondo">
        <img 
          src={mensajeDelDiaFondo} 
          alt="Fondo angelical del mensaje del día" 
          className="angel-background-img"
        />
      </div>
      <div className="mensaje-overlay-angelical"></div>
      <div className="mensaje-contenido-premium">
        <div className="mensaje-fecha-premium">
          <span className="fecha-icono">✨</span>
          <span className="fecha-texto">{mensajeDelDia.fecha}</span>
        </div>
        <div className="mensaje-texto-premium">
          <div className="comilla-apertura">"</div>
          <p className="texto-mensaje">{mensajeDelDia.mensaje}</p>
          <div className="comilla-cierre">"</div>
        </div>
        <div className="mensaje-arcangel-premium">
          <div className="arcangel-info">
            <span className="arcangel-nombre">- {mensajeDelDia.arcangel}</span>
            <span className="arcangel-energia">{mensajeDelDia.energia}</span>
          </div>
          <button 
            className="btn-meditar-premium"
            onClick={() => setActiveSection('mensaje')}
          >
            <span className="btn-icono">💌</span>
            <span className="btn-texto">Mensajes del Día</span>
          </button>
        </div>
        <button className="btn-luz-interior">
          <span className="luz-icono">✨</span>
          <span className="luz-texto">Luz Interior</span>
        </button>
      </div>
      <div className="bordes-angelicales">
        <div className="borde-esquina esquina-tl"></div>
        <div className="borde-esquina esquina-tr"></div>
        <div className="borde-esquina esquina-bl"></div>
        <div className="borde-esquina esquina-br"></div>
      </div>
    </div>
  </div>
);

// CONTENIDO OMITIDO: resto del archivo sigue igual

