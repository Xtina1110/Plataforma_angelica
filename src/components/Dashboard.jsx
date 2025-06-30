import React, { useState } from 'react';
import './Dashboard.css';
import '../styles/theme.css';

import logo from '../assets/Logosinfondo.png';
import iconoEstrella from '../assets/IconoEstrellaDashboard.png';
import sonoterapia from '../assets/Sonoterapia02.png';
import fondoMarmoleado from '../assets/Fondomarmoleado.jpg';

import {
  Home, User, LogOut, Heart, Star, BookOpen,
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

            <h3 className="titulo-dashboard

