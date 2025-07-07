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

import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [userData, setUserData] = useState({
    nombre: user?.displayName || 'Juan Carlos',
    apellido: user?.lastName || 'Pérez',
    email: user?.email || 'demo@test.com',
    username: user?.username || 'demo@test.com',
    rol: 'Usuario Premium',
    telefono: '+34 600 123 456',
    fechaNacimiento: '1985-03-15',
    pais: 'España',
    ciudad: 'Madrid',
    nivelEspiritual: 'Iluminado',
    puntosDeLuz: 1500,
    diasConsecutivos: 7,
    sonoterapiasCompletadas: 12,
    canalizacionesEscuchadas: 25,
    cursosFinalizados: 3,
    notificaciones: true,
    emailMarketing: false,
    modoOscuro: false,
    idioma: 'es'
  });

  // Sistema de mensajes diarios expandido
  const getMensajeDelDia = () => {
    const hoy = new Date();
    const dayOfYear = Math.floor((hoy - new Date(hoy.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    const mensajesDiarios = [
      // Semana 1 - Arcángeles Principales
      { mensaje: "Los ángeles te recuerdan que cada nuevo día es una oportunidad para elevar tu vibración y conectar con tu propósito divino.", arcangel: "Arcángel Miguel", energia: "Protección y Valor" },
      { mensaje: "Confía en tu intuición, los ángeles te están guiando hacia el camino correcto. Escucha los susurros de tu corazón.", arcangel: "Arcángel Gabriel", energia: "Claridad y Comunicación" },
      { mensaje: "Hoy es un día perfecto para sanar heridas del pasado. Los ángeles te envían energía de amor y renovación.", arcangel: "Arcángel Rafael", energia: "Sanación y Renovación" },
      { mensaje: "La sabiduría divina fluye a través de ti. Permite que la luz angelical ilumine tus decisiones del día.", arcangel: "Arcángel Uriel", energia: "Sabiduría e Iluminación" },
      { mensaje: "El amor incondicional te rodea. Abre tu corazón para recibir y compartir la compasión angelical.", arcangel: "Arcángel Chamuel", energia: "Amor y Compasión" },
      { mensaje: "Encuentra la belleza en cada momento. Los ángeles te invitan a celebrar la alegría que existe en tu vida.", arcangel: "Arcángel Jofiel", energia: "Belleza y Alegría" },
      { mensaje: "La justicia divina está trabajando en tu favor. Confía en que todo se alineará según el plan perfecto.", arcangel: "Arcángel Raguel", energia: "Justicia y Equilibrio" },
      
      // Semana 2 - Abundancia y Naturaleza
      { mensaje: "Conecta con la naturaleza y siente la abundancia que te rodea. Los ángeles bendicen tu prosperidad.", arcangel: "Arcángel Ariel", energia: "Naturaleza y Abundancia" },
      { mensaje: "Tu conexión con lo divino se fortalece cada día. Los misterios del universo se revelan ante ti.", arcangel: "Arcángel Metatrón", energia: "Sabiduría Universal" },
      { mensaje: "Es tiempo de perdonar y liberar. Los ángeles te ayudan a transmutar cualquier energía negativa en luz.", arcangel: "Arcángel Zadkiel", energia: "Perdón y Transmutación" },
      { mensaje: "Tu intuición femenina se despierta. Los ciclos naturales te guían hacia tu máximo potencial.", arcangel: "Arcángel Haniel", energia: "Intuición y Ciclos" },
      { mensaje: "Los secretos del universo se revelan a quienes buscan con corazón puro. Mantén tu mente abierta.", arcangel: "Arcángel Raziel", energia: "Misterios Divinos" },
      { mensaje: "Tus oraciones han sido escuchadas. Los ángeles trabajan para manifestar tus deseos más elevados.", arcangel: "Arcángel Sandalfón", energia: "Oraciones y Respuestas" },
      { mensaje: "Es momento de revisar tu camino y hacer los cambios necesarios. Los ángeles te apoyan en tu transformación.", arcangel: "Arcángel Jeremiel", energia: "Revisión y Cambio" },
      
      // Semana 3 - Transformación y Crecimiento
      { mensaje: "Las transiciones son oportunidades de crecimiento. Los ángeles te acompañan en cada paso de tu evolución.", arcangel: "Arcángel Azrael", energia: "Transformación" },
      { mensaje: "Tu autoestima brilla con luz propia. Los ángeles refuerzan tu confianza y valor personal.", arcangel: "Arcángel Camael", energia: "Autoestima y Confianza" },
      { mensaje: "La paciencia es una virtud divina. Los ángeles te enseñan a fluir con los tiempos perfectos del universo.", arcangel: "Arcángel Cassiel", energia: "Paciencia y Perseverancia" },
      { mensaje: "Las bendiciones llueven sobre ti. Los ángeles multiplican la fortuna en todos los aspectos de tu vida.", arcangel: "Arcángel Barachiel", energia: "Bendiciones y Fortuna" },
      { mensaje: "Tu práctica espiritual se profundiza. Los ángeles elevan tus oraciones y meditaciones.", arcangel: "Arcángel Selaphiel", energia: "Oración y Meditación" },
      { mensaje: "La esperanza renace en tu corazón. Los ángeles traen renovación y nuevas oportunidades.", arcangel: "Arcángel Remiel", energia: "Esperanza y Renovación" },
      { mensaje: "Sana tu mundo emocional. Los ángeles te envuelven en amor incondicional para restaurar tu paz interior.", arcangel: "Arcángel Muriel", energia: "Sanación Emocional" },
      
      // Semana 4 - Creatividad y Propósito
      { mensaje: "Tu creatividad es un don divino. Los ángeles inspiran tu expresión artística y pasión por la vida.", arcangel: "Arcángel Iofiel", energia: "Creatividad y Pasión" },
      { mensaje: "El fuego sagrado arde en tu interior. Los ángeles avivan tu determinación y fuerza espiritual.", arcangel: "Arcángel Nathaniel", energia: "Fuego Sagrado" },
      { mensaje: "Vive en tu verdad auténtica. Los ángeles te apoyan para expresar quien realmente eres.", arcangel: "Arcángel Amitiel", energia: "Verdad y Autenticidad" },
      { mensaje: "Tu determinación es inquebrantable. Los ángeles fortalecen tu voluntad para alcanzar tus metas.", arcangel: "Arcángel Uzziel", energia: "Determinación y Fuerza" },
      { mensaje: "La armonía se establece en tu vida. Los ángeles equilibran todas las áreas de tu existencia.", arcangel: "Arcángel Anael", energia: "Armonía y Equilibrio" },
      { mensaje: "La prosperidad fluye hacia ti. Los ángeles abren canales de abundancia en tu camino.", arcangel: "Arcángel Sachiel", energia: "Prosperidad y Abundancia" },
      { mensaje: "Tu luz interior brilla más fuerte cada día. Los ángeles amplifican tu radiancia espiritual.", arcangel: "Arcángel Raziel", energia: "Luz Interior" },
      
      // Mensajes adicionales para completar el mes
      { mensaje: "Confía en el proceso divino. Los ángeles orquestan sincronías perfectas para tu mayor bien.", arcangel: "Arcángel Miguel", energia: "Confianza Divina" },
      { mensaje: "Tu corazón es un templo sagrado. Los ángeles bendicen cada latido con amor incondicional.", arcangel: "Arcángel Chamuel", energia: "Amor Sagrado" },
      { mensaje: "La sabiduría ancestral despierta en ti. Los ángeles conectan tu alma con conocimientos eternos.", arcangel: "Arcángel Metatrón", energia: "Sabiduría Ancestral" },
      { mensaje: "Eres un canal de luz en este mundo. Los ángeles te utilizan para irradiar sanación a otros.", arcangel: "Arcángel Rafael", energia: "Canal de Luz" }
    ];
    
    // Seleccionar mensaje basado en el día del año para que sea consistente
    const mensajeIndex = dayOfYear % mensajesDiarios.length;
    const mensajeSeleccionado = mensajesDiarios[mensajeIndex];
    
    return {
      fecha: hoy.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      ...mensajeSeleccionado
    };
  };

  // Datos del mensaje del día (ahora dinámico)
  const [mensajeDelDia] = useState(getMensajeDelDia());

  // Datos de eventos del angelólogo
  const [eventos] = useState([
    {
      id: 1,
      titulo: "Meditación Grupal con Arcángeles",
      fecha: "2025-01-15",
      hora: "19:00",
      duracion: "90 min",
      modalidad: "Presencial",
      ubicacion: "Centro Angelical Madrid",
      precio: "25€",
      cupos: 15,
      inscritos: 8,
      descripcion: "Sesión de meditación guiada para conectar con la energía de los arcángeles",
      instructor: "Juan Carlos Ávila",
      categoria: "Meditación",
      inscrito: false
    },
    {
      id: 2,
      titulo: "Taller de Cartas Angelicales",
      fecha: "2025-01-18",
      hora: "16:30",
      duracion: "3 horas",
      modalidad: "Online",
      ubicacion: "Zoom",
      precio: "45€",
      cupos: 25,
      inscritos: 18,
      descripcion: "Aprende a interpretar las cartas angelicales y conectar con tus guías espirituales",
      instructor: "Juan Carlos Ávila",
      categoria: "Formación",
      inscrito: true
    },
    {
      id: 3,
      titulo: "Sanación con Frecuencias Angelicales",
      fecha: "2025-01-22",
      hora: "20:00",
      duracion: "60 min",
      modalidad: "Online",
      ubicacion: "Plataforma Angelical",
      precio: "20€",
      cupos: 50,
      inscritos: 32,
      descripcion: "Sesión de sanación utilizando frecuencias sagradas y energía angelical",
      instructor: "Juan Carlos Ávila",
      categoria: "Sanación",
      inscrito: false
    },
    {
      id: 4,
      titulo: "Círculo de Canalización Angelical",
      fecha: "2025-01-25",
      hora: "18:00",
      duracion: "2 horas",
      modalidad: "Presencial",
      ubicacion: "Centro Angelical Barcelona",
      precio: "35€",
      cupos: 12,
      inscritos: 12,
      descripcion: "Círculo íntimo para recibir mensajes canalizados de los ángeles",
      instructor: "Juan Carlos Ávila",
      categoria: "Canalización",
      inscrito: true
    }
  ]);

  const [eventosInscritos, setEventosInscritos] = useState(
    eventos.filter(evento => evento.inscrito).map(evento => evento.id)
  );

  const toggleInscripcion = (eventoId) => {
    setEventosInscritos(prev => {
      if (prev.includes(eventoId)) {
        return prev.filter(id => id !== eventoId);
      } else {
        return [...prev, eventoId];
      }
    });
  };

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Inicio', color: '#6a0dad' },
    { id: 'tirada', icon: Heart, label: 'Apertura Angelica', color: '#4fc3f7' },
    { id: 'canalizaciones', icon: Headphones, label: 'Sonoterapia y Canalizaciones', color: '#b39ddb' },
    { id: 'terapias', icon: Zap, label: 'Terapias y Limpiezas', color: '#f48fb1' },
    { id: 'academia', icon: GraduationCap, label: 'Academia Angelica', color: '#81c784' },
    { id: 'mensaje', icon: MessageSquare, label: 'Mensaje Diario', color: '#9575cd' },
    { id: 'blog', icon: Mic, label: 'Blog & Podcast', color: '#ce93d8' },
    { id: 'tienda', icon: ShoppingCart, label: 'Tienda Angelica', color: '#ff8a65' },
  ];

  const renderSettings = () => (
    <div className="settings-modal-overlay" onClick={() => setShowSettings(false)}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Configuración de Usuario</h2>
          <button onClick={() => setShowSettings(false)} className="close-settings">
            <X size={24} />
          </button>
        </div>
        
        <div className="settings-content">
          <div className="settings-section">
            <h3>Información Personal</h3>
            <div className="settings-grid">
              <div className="setting-field">
                <label>Nombre</label>
                <input 
                  type="text" 
                  value={userData.nombre}
                  onChange={(e) => updateUserData({ nombre: e.target.value })}
                />
              </div>
              <div className="setting-field">
                <label>Apellido</label>
                <input 
                  type="text" 
                  value={userData.apellido}
                  onChange={(e) => updateUserData({ apellido: e.target.value })}
                />
              </div>
              <div className="setting-field">
                <label>Email</label>
                <input 
                  type="email" 
                  value={userData.email}
                  onChange={(e) => updateUserData({ email: e.target.value })}
                />
              </div>
              <div className="setting-field">
                <label>Teléfono</label>
                <input 
                  type="tel" 
                  value={userData.telefono}
                  onChange={(e) => updateUserData({ telefono: e.target.value })}
                />
              </div>
              <div className="setting-field">
                <label>Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  value={userData.fechaNacimiento}
                  onChange={(e) => updateUserData({ fechaNacimiento: e.target.value })}
                />
              </div>
              <div className="setting-field">
                <label>País</label>
                <input 
                  type="text" 
                  value={userData.pais}
                  onChange={(e) => updateUserData({ pais: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Preferencias de la Plataforma</h3>
            <div className="settings-grid">
              <div className="setting-field">
                <label>Idioma</label>
                <select 
                  value={userData.idioma}
                  onChange={(e) => updateUserData({ idioma: e.target.value })}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="setting-toggle">
                <label>
                  <input 
                    type="checkbox" 
                    checked={userData.notificaciones}
                    onChange={(e) => updateUserData({ notificaciones: e.target.checked })}
                  />
                  <span>Recibir notificaciones</span>
                </label>
              </div>
              <div className="setting-toggle">
                <label>
                  <input 
                    type="checkbox" 
                    checked={userData.emailMarketing}
                    onChange={(e) => updateUserData({ emailMarketing: e.target.checked })}
                  />
                  <span>Emails promocionales</span>
                </label>
              </div>
              <div className="setting-toggle">
                <label>
                  <input 
                    type="checkbox" 
                    checked={userData.modoOscuro}
                    onChange={(e) => updateUserData({ modoOscuro: e.target.checked })}
                  />
                  <span>Modo oscuro</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-footer">
          <button onClick={() => setShowSettings(false)} className="btn-guardar">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );

  const renderMensajeDelDia = () => (
    <div className="mensaje-del-dia-section">
      <h3 className="titulo-dashboard">Mensaje del Día</h3>
      <div className="mensaje-del-dia-premium">
        {/* Imagen del ángel de fondo */}
        <div className="mensaje-angel-fondo">
          <img 
            src="/angel-mensaje.jpg" 
            alt="Ángel del día" 
            className="angel-background-img"
          />
        </div>
        
        {/* Overlay con gradientes angelicales */}
        <div className="mensaje-overlay-angelical"></div>
        
        {/* Efectos de luz y partículas */}
        <div className="mensaje-efectos-luz">
          <div className="particula-luz particula-1"></div>
          <div className="particula-luz particula-2"></div>
          <div className="particula-luz particula-3"></div>
          <div className="particula-luz particula-4"></div>
          <div className="particula-luz particula-5"></div>
          <div className="rayo-luz rayo-1"></div>
          <div className="rayo-luz rayo-2"></div>
        </div>
        
        {/* Contenido del mensaje */}
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
          
          {/* Botón Luz Interior en esquina superior derecha */}
          <button className="btn-luz-interior">
            <span className="luz-icono">✨</span>
            <span className="luz-texto">Luz Interior</span>
          </button>
        </div>
        
        {/* Bordes decorativos angelicales */}
        <div className="bordes-angelicales">
          <div className="borde-esquina esquina-tl"></div>
          <div className="borde-esquina esquina-tr"></div>
          <div className="borde-esquina esquina-bl"></div>
          <div className="borde-esquina esquina-br"></div>
        </div>
      </div>
    </div>
  );

  const renderCalendarioEventos = () => (
    <div className="calendario-eventos-widget">
      <div className="calendario-header">
        <Calendar className="calendario-icon" />
        <h3>Próximos Eventos</h3>
      </div>
      <div className="eventos-lista">
        {eventos.slice(0, 3).map(evento => {
          const estaInscrito = eventosInscritos.includes(evento.id);
          const fechaEvento = new Date(evento.fecha);
          const esCompleto = evento.inscritos >= evento.cupos;
          
          return (
            <div key={evento.id} className={`evento-card ${estaInscrito ? 'inscrito' : ''} ${esCompleto ? 'completo' : ''}`}>
              <div className="evento-fecha">
                <span className="dia">{fechaEvento.getDate()}</span>
                <span className="mes">{fechaEvento.toLocaleDateString('es-ES', { month: 'short' })}</span>
              </div>
              
              <div className="evento-info">
                <h4 className="evento-titulo">{evento.titulo}</h4>
                <div className="evento-detalles">
                  <span className="evento-hora">
                    <Clock size={14} />
                    {evento.hora} ({evento.duracion})
                  </span>
                  <span className="evento-modalidad">
                    <MapPin size={14} />
                    {evento.modalidad}
                  </span>
                  <span className="evento-cupos">
                    <Users size={14} />
                    {evento.inscritos}/{evento.cupos}
                  </span>
                </div>
                <div className="evento-categoria">
                  <span className={`categoria-badge ${evento.categoria.toLowerCase()}`}>
                    {evento.categoria}
                  </span>
                  <span className="evento-precio">{evento.precio}</span>
                </div>
              </div>
              
              <div className="evento-acciones">
                {estaInscrito ? (
                  <div className="inscrito-badge">
                    <Star size={16} />
                    Inscrito
                  </div>
                ) : (
                  <button 
                    className={`btn-inscribir ${esCompleto ? 'completo' : ''}`}
                    onClick={() => !esCompleto && toggleInscripcion(evento.id)}
                    disabled={esCompleto}
                  >
                    {esCompleto ? 'Completo' : 'Inscribirse'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="ver-todos-eventos" onClick={() => setActiveSection('eventos')}>
        Ver todos los eventos
        <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'tirada': return <TiradaAngelical onVolver={() => setActiveSection('home')} />;
      case 'canalizaciones': return <CanalizacionesSonoterapia onVolver={() => setActiveSection('home')} />;
      case 'terapias': return <TerapiasLimpiezas onVolver={() => setActiveSection('home')} />;
      case 'academia': return <AcademiaAngelical onVolver={() => setActiveSection('home')} />;
      case 'mensaje': return renderMensajeDelDia();
      case 'blog': return <BlogPodcast onVolver={() => setActiveSection('home')} />;
      case 'tienda': return <TiendaAngelical onVolver={() => setActiveSection('home')} />;
      case 'eventos':
        return (
          <div className="eventos-completos">
            <div className="eventos-header">
              <button onClick={() => setActiveSection('home')} className="btn-volver">
                ← Volver al Dashboard
              </button>
              <h2>Calendario de Eventos Angelicales</h2>
            </div>
            <div className="eventos-grid">
              {eventos.map(evento => {
                const estaInscrito = eventosInscritos.includes(evento.id);
                const fechaEvento = new Date(evento.fecha);
                const esCompleto = evento.inscritos >= evento.cupos;
                
                return (
                  <div key={evento.id} className={`evento-card-completa ${estaInscrito ? 'inscrito' : ''}`}>
                    <div className="evento-header-completa">
                      <div className="evento-fecha-completa">
                        <span className="dia">{fechaEvento.getDate()}</span>
                        <span className="mes">{fechaEvento.toLocaleDateString('es-ES', { month: 'long' })}</span>
                      </div>
                      <span className={`categoria-badge ${evento.categoria.toLowerCase()}`}>
                        {evento.categoria}
                      </span>
                    </div>
                    
                    <h3>{evento.titulo}</h3>
                    <p className="evento-descripcion">{evento.descripcion}</p>
                    
                    <div className="evento-detalles-completa">
                      <div className="detalle">
                        <Clock size={16} />
                        <span>{evento.hora} - {evento.duracion}</span>
                      </div>
                      <div className="detalle">
                        <MapPin size={16} />
                        <span>{evento.modalidad} - {evento.ubicacion}</span>
                      </div>
                      <div className="detalle">
                        <Users size={16} />
                        <span>{evento.inscritos}/{evento.cupos} participantes</span>
                      </div>
                      <div className="detalle">
                        <User size={16} />
                        <span>{evento.instructor}</span>
                      </div>
                    </div>
                    
                    <div className="evento-footer-completa">
                      <span className="precio">{evento.precio}</span>
                      {estaInscrito ? (
                        <button className="btn-inscrito" onClick={() => toggleInscripcion(evento.id)}>
                          <Star size={16} />
                          Cancelar Inscripción
                        </button>
                      ) : (
                        <button 
                          className={`btn-inscribir-completa ${esCompleto ? 'completo' : ''}`}
                          onClick={() => !esCompleto && toggleInscripcion(evento.id)}
                          disabled={esCompleto}
                        >
                          {esCompleto ? 'Evento Completo' : 'Inscribirse Ahora'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard-home">
            <div className="bienvenida-usuario">
              <h2>¡Bienvenido de nuevo, {userData.nombre} {userData.apellido}!</h2>
              <p>Tu camino espiritual continúa evolucionando.</p>
            </div>

            <h3 className="titulo-dashboard">Dashboard Personal</h3>

            {/* Fondo angelical con transparencia */}
            <div
              className="seccion-dashboard relative overflow-hidden rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6"
              style={{
                backgroundImage: `url(${fondoMarmoleado})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Capa de transparencia */}
              <div className="absolute inset-0 bg-white/40 z-0 pointer-events-none rounded-xl" />

              {/* Imagen del ángel */}
              <div className="relative z-10">
                <img src={iconoAngelDashboard} alt="Ángel" className="imagen-angel-dashboard grande" />
              </div>

              {/* Tarjetas métricas */}
              <div className="bloque-metricas relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="metrica-card"><img src={iconNivel} /><span>Nivel</span><strong>{userData.nivelEspiritual}</strong></div>
                <div className="metrica-card"><img src={iconPuntos} /><span>Puntos de luz</span><strong>{userData.puntosDeLuz}</strong></div>
                <div className="metrica-card"><img src={iconDias} /><span>Días consecutivos</span><strong>{userData.diasConsecutivos}</strong></div>
                <div className="metrica-card"><img src={iconSonoterapia} /><span>Sonoterapias</span><strong>{userData.sonoterapiasCompletadas}</strong></div>
                <div className="metrica-card"><img src={iconCanalizaciones} /><span>Canalizaciones</span><strong>{userData.canalizacionesEscuchadas}</strong></div>
                <div className="metrica-card"><img src={iconCursos} /><span>Cursos</span><strong>{userData.cursosFinalizados}</strong></div>
              </div>
            </div>

            {/* Mensaje del Día */}
            {renderMensajeDelDia()}

            {/* Calendario de Eventos */}
            {renderCalendarioEventos()}

            <h3 className="subtitulo-apps">Aplicaciones angelicas</h3>
            <div className="grid-aplicaciones">
              {[
                { id: 'tirada', icon: <Heart />, titulo: 'Apertura Angelica', desc: 'Conecta con la sabiduría de los ángeles', disponible: true },
                { id: 'canalizaciones', icon: <Headphones />, titulo: 'Canalizaciones y Sonoterapia', desc: 'Frecuencias sagradas de sanación', disponible: true },
                { id: 'terapias', icon: <Zap />, titulo: 'Terapias y Limpiezas', desc: 'Sanación angelica profunda', disponible: true },
                { id: 'academia', icon: <GraduationCap />, titulo: 'Academia Angelica', desc: 'Formación espiritual completa', disponible: true },
                { id: 'mensaje', icon: <MessageSquare />, titulo: 'Mensaje del Día', desc: 'Recibe una canalización espiritual', disponible: true },
                { id: 'blog', icon: <Mic />, titulo: 'Blog & Podcast', desc: 'Contenido espiritual diario', disponible: true },
                { id: 'tienda', icon: <ShoppingCart />, titulo: 'Tienda Angélica', desc: 'Cartas y recursos espirituales', disponible: false },
              ].map(app => (
                <div key={app.id} className={`app-card ${app.id}`}>
                  <div className="app-header">
                    {app.icon}
                    <span className={`disponibilidad ${app.disponible ? 'disponible' : 'proximamente'}`}>
                      {app.disponible ? 'Disponible' : 'Próximamente'}
                    </span>
                  </div>
                  <h4>{app.titulo}</h4>
                  <p>{app.desc}</p>
                  <button onClick={() => setActiveSection(app.id)}>Acceder</button>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo JCA" className="sidebar-logo" />
          {!sidebarCollapsed && <h3 className="sidebar-title">Plataforma Angélica</h3>}
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        <ul className="sidebar-nav">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            return (
              <li 
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
                style={{ '--item-color': item.color }}
              >
                <IconComponent size={20} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </li>
            );
          })}
        </ul>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar" onClick={() => setShowSettings(true)}>
              <User size={20} />
            </div>
            {!sidebarCollapsed && (
              <div className="user-details">
                <span className="user-email">{userData.username}</span>
                <span className="user-role">{userData.rol}</span>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <button onClick={onLogout} className="logout-button">
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          )}
        </div>
      </aside>
      
      <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {renderSection()}
      </main>
      
      {showSettings && renderSettings()}
    </div>
  );
};

export default Dashboard;

