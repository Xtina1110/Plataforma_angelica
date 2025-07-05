import React, { useState, useContext, createContext, useRef } from 'react';
import './CanalizacionesAngelicales.css';
import { 
  ArrowLeft, Play, Pause, Download, Volume2, Heart, Shield, Star, Target, 
  Sun, MessageCircle, Search, Filter, Grid, List, Maximize2, X, Clock, 
  Users, Share2, Bookmark, Settings, RotateCcw, Headphones, Music
} from 'lucide-react';

// Context para las canalizaciones
const CanalizacionesContext = createContext();

// Provider del contexto
export const CanalizacionesProvider = ({ children }) => {
  const [canalizacionesState, setCanalizacionesState] = useState({
    temaSeleccionado: null,
    mostrandoMensaje: false,
    audioReproduciendo: false,
    modalExpandido: false,
    vistaActual: 'grid',
    filtroActivo: 'todos',
    busqueda: '',
    favoritos: [],
    historialCanalizaciones: [],
    configuracion: {
      autoplay: false,
      velocidadLectura: 'normal',
      vozNarracion: 'femenina'
    }
  });

  const updateCanalizacionesState = (updates) => {
    setCanalizacionesState(prev => ({ ...prev, ...updates }));
  };

  const agregarFavorito = (tema) => {
    setCanalizacionesState(prev => ({
      ...prev,
      favoritos: [...prev.favoritos.filter(f => f.id !== tema.id), tema]
    }));
  };

  const quitarFavorito = (temaId) => {
    setCanalizacionesState(prev => ({
      ...prev,
      favoritos: prev.favoritos.filter(f => f.id !== temaId)
    }));
  };

  const agregarHistorial = (tema) => {
    setCanalizacionesState(prev => ({
      ...prev,
      historialCanalizaciones: [
        tema,
        ...prev.historialCanalizaciones.filter(h => h.id !== tema.id).slice(0, 9)
      ]
    }));
  };

  return (
    <CanalizacionesContext.Provider value={{
      canalizacionesState,
      updateCanalizacionesState,
      agregarFavorito,
      quitarFavorito,
      agregarHistorial
    }}>
      {children}
    </CanalizacionesContext.Provider>
  );
};

// Hook para usar el contexto
const useCanalizaciones = () => {
  const context = useContext(CanalizacionesContext);
  if (!context) {
    throw new Error('useCanalizaciones must be used within a CanalizacionesProvider');
  }
  return context;
};

// Datos de temas expandidos
const temas = [
  {
    id: 'proposito-vida',
    nombre: 'Propósito de Vida',
    icono: <Target className="w-8 h-8" />,
    color: 'from-purple-500 to-indigo-600',
    descripcion: 'Descubre tu misión divina en esta encarnación',
    categoria: 'Propósito',
    popularidad: 95,
    duracion: '15:30',
    rating: 4.9,
    reproducciones: 8420,
    fechaCreacion: '2024-01-15',
    tags: ['propósito', 'misión', 'vida', 'destino'],
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    mensaje: `Querido ser de luz,

Tu propósito en esta vida trasciende lo que tu mente humana puede comprender. Has venido a este plano terrenal con una misión específica: ser un faro de luz para otros que aún caminan en la oscuridad.

Tu alma eligió las experiencias que has vivido, tanto las gozosas como las desafiantes, porque cada una de ellas te ha moldeado para convertirte en el instrumento divino que eres hoy. No hay coincidencias en tu camino.

El Arcángel Miguel te susurra: "Tu propósito se revela cuando sigues los impulsos de tu corazón, no los miedos de tu mente. Cada acto de amor, cada palabra de aliento, cada momento de compasión que ofreces, está cumpliendo tu misión divina."

Confía en el proceso. Tu propósito no es algo que debes encontrar afuera, sino algo que debes recordar desde adentro. Está escrito en las fibras de tu ser, en cada latido de tu corazón.

Hoy, permítete ser guiado por la intuición. Los ángeles te mostrarán señales claras del siguiente paso en tu camino. Mantén tu corazón abierto y tu mente receptiva.

Con amor infinito,
Tus Ángeles Guardianes`,
    afirmacion: "Soy un instrumento divino de luz y amor, cumpliendo mi propósito sagrado en cada momento.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 'amor-propio',
    nombre: 'Amor Propio',
    icono: <Heart className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-600',
    descripcion: 'Sana tu relación contigo mismo con amor divino',
    categoria: 'Sanación',
    popularidad: 92,
    duracion: '12:45',
    rating: 4.8,
    reproducciones: 7650,
    fechaCreacion: '2024-01-20',
    tags: ['amor', 'autoestima', 'sanación', 'corazón'],
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    mensaje: `Amado hijo/a de la luz,

El amor propio no es egoísmo, es reconocimiento de tu naturaleza divina. Eres una extensión del Creador, una chispa de luz divina encarnada en forma humana. ¿Cómo podrías no amarte?

La Arcángel Chamuel te envuelve en su luz rosa y te recuerda: "El amor que buscas en otros ya vive en ti. Eres completo, eres perfecto tal como eres en este momento. Tus imperfecciones humanas son simplemente oportunidades para crecer en compasión hacia ti mismo."

Perdónate por los errores del pasado. Cada experiencia te ha enseñado algo valioso. Honra tu cuerpo como el templo sagrado que es. Nutre tu mente con pensamientos amorosos. Alimenta tu alma con momentos de silencio y conexión.

Cuando te mires al espejo, ve más allá de la forma física. Mira a los ojos del alma que te habita. Esa alma es pura, es amor, es luz. Esa eres tú en tu esencia más verdadera.

Hoy, comprométete a hablarte con la misma gentileza con la que le hablarías a un niño pequeño. Eres digno de amor, especialmente del tuyo propio.

Con ternura infinita,
Los Ángeles del Amor`,
    afirmacion: "Me amo y me acepto completamente. Soy digno de todo el amor del universo.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 'proteccion-espiritual',
    nombre: 'Protección Espiritual',
    icono: <Shield className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-600',
    descripcion: 'Fortalece tu escudo energético angelical',
    categoria: 'Protección',
    popularidad: 89,
    duracion: '18:20',
    rating: 4.9,
    reproducciones: 9120,
    fechaCreacion: '2024-01-25',
    tags: ['protección', 'energía', 'escudo', 'seguridad'],
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    mensaje: `Guerrero de la luz,

Estás rodeado por legiones de ángeles protectores que velan por tu seguridad en todos los planos de existencia. El Arcángel Miguel, con su espada de luz azul, corta todas las cuerdas energéticas que no te sirven y sella tu aura con protección divina.

Tu campo energético es sagrado. Tienes el poder y el derecho divino de decidir qué energías permites en tu espacio. Cuando sientes pesadez, negatividad o drenaje energético, es momento de invocar tu protección angelical.

Visualiza una burbuja de luz dorada que te rodea completamente. Esta luz es impenetrable para cualquier energía que no sea de amor puro. Dentro de esta burbuja, solo puede existir paz, amor y armonía.

Los ángeles te recuerdan: "No eres víctima de las energías externas. Eres un ser soberano con el poder de crear tu propia realidad energética. Usa tu discernimiento espiritual para alejarte de situaciones y personas que drenan tu luz."

Confía en tu intuición. Cuando algo no se siente bien, es porque no está alineado con tu bien mayor. Los ángeles siempre te guían hacia lo que es mejor para tu alma.

Con protección eterna,
La Legión de Miguel`,
    afirmacion: "Estoy protegido por la luz divina. Solo el amor puede tocar mi ser.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 'confianza',
    nombre: 'Confianza',
    icono: <Star className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-600',
    descripcion: 'Desarrolla fe inquebrantable en ti y en lo divino',
    categoria: 'Fortaleza',
    popularidad: 87,
    duracion: '14:15',
    rating: 4.7,
    reproducciones: 6890,
    fechaCreacion: '2024-02-01',
    tags: ['confianza', 'fe', 'fortaleza', 'seguridad'],
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    mensaje: `Ser valiente y luminoso,

La confianza verdadera no viene de saber que todo saldrá como esperas, sino de saber que todo saldrá como debe ser para tu mayor bien. El universo conspira a tu favor, siempre.

El Arcángel Jofiel ilumina tu mente con sabiduría dorada y te susurra: "Cada desafío que enfrentas es una oportunidad disfrazada. Cada 'no' que recibes te redirige hacia un 'sí' aún más grande. Cada puerta que se cierra te guía hacia la puerta correcta."

Tu alma es infinitamente sabia. Ha navegado por muchas experiencias y siempre ha encontrado el camino. Confía en esa sabiduría interna. Confía en los impulsos de tu corazón. Confía en las señales que el universo te envía.

Cuando sientes miedo, recuerda que el miedo es solo la ausencia de amor. Llena ese espacio con amor hacia ti mismo, amor hacia el proceso, amor hacia lo desconocido que se aproxima.

Eres más fuerte de lo que crees, más sabio de lo que imaginas, y más amado de lo que puedes comprender. Los ángeles caminan contigo en cada paso.

Con fe inquebrantable,
Los Ángeles de la Sabiduría`,
    afirmacion: "Confío en mi sabiduría interna y en el plan divino para mi vida.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 'mision-alma',
    nombre: 'Misión del Alma',
    icono: <Sun className="w-8 h-8" />,
    color: 'from-amber-500 to-yellow-600',
    descripcion: 'Conecta con el plan sagrado de tu alma',
    categoria: 'Propósito',
    popularidad: 91,
    duracion: '16:50',
    rating: 4.8,
    reproducciones: 7420,
    fechaCreacion: '2024-02-05',
    tags: ['misión', 'alma', 'propósito', 'destino'],
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    mensaje: `Alma antigua y sabia,

Tu alma eligió venir a la Tierra en este momento específico de la historia porque tiene algo único que ofrecer. No eres un accidente cósmico; eres una respuesta divina a una necesidad del mundo.

La Arcángel Uriel te ilumina con la llama dorada de la sabiduría y te revela: "Tu misión no es grandiosa en términos humanos, sino en términos del corazón. Cada sonrisa que compartes, cada mano que extiendes, cada momento de presencia amorosa que ofreces, está sanando el mundo."

Tu alma vino aquí para experimentar el amor en forma física, para recordar su divinidad a través de la humanidad, y para ayudar a otros a recordar la suya. Eres un sanador, aunque no lo sepas. Eres un maestro, aunque no enseñes formalmente. Eres un ángel en forma humana.

Las experiencias difíciles que has vivido no fueron castigos, sino entrenamientos. Te han dado la compasión, la sabiduría y la fortaleza necesarias para cumplir tu misión. Cada cicatriz es una medalla de honor espiritual.

Escucha los susurros de tu alma. Te está guiando hacia las personas que necesitan tu luz, hacia las situaciones que requieren tu presencia, hacia el servicio que solo tú puedes ofrecer.

Con propósito divino,
El Consejo de Almas`,
    afirmacion: "Mi alma tiene una misión sagrada y estoy cumpliendo mi propósito divino.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: 'mensaje-dia',
    nombre: 'Mensaje del Día',
    icono: <MessageCircle className="w-8 h-8" />,
    color: 'from-emerald-500 to-teal-600',
    descripcion: 'Recibe la guía angelical para hoy',
    categoria: 'Diario',
    popularidad: 94,
    duracion: '10:30',
    rating: 4.9,
    reproducciones: 12340,
    fechaCreacion: '2024-02-10',
    tags: ['mensaje', 'día', 'guía', 'presente'],
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    mensaje: `Querido ser de luz,

Hoy es un día especial porque tú estás en él. Los ángeles han preparado sincronicidades hermosas para ti. Mantén tus ojos abiertos a las señales, tu corazón receptivo a los milagros, y tu mente dispuesta a ver la magia en lo ordinario.

El mensaje de hoy viene del Arcángel Gabriel: "La comunicación divina fluye a través de ti hoy. Tus palabras tienen poder sanador. Úsalas para elevar, para consolar, para inspirar. Alguien necesita escuchar exactamente lo que tú tienes que decir."

Presta atención a los números repetidos, a las canciones que escuchas, a las conversaciones que captan tu atención, a los pensamientos que llegan de la nada. Todo es comunicación angelical.

Hoy es un día para soltar el control y fluir con la corriente divina. Confía en que estás exactamente donde necesitas estar, haciendo exactamente lo que necesitas hacer, siendo exactamente quien necesitas ser.

Si sientes pesadez, respira profundo y recuerda: eres amado más allá de toda medida. Si sientes alegría, compártela generosamente. Si sientes paz, irrádiala a tu alrededor.

Los ángeles te acompañan en cada momento de este día bendito.

Con amor presente,
Tus Guías Angelicales`,
    afirmacion: "Estoy abierto a recibir toda la guía y el amor que los ángeles tienen para mí hoy.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  }
];

// Componente principal
const CanalizacionesAngelicales = ({ onVolver }) => {
  const { 
    canalizacionesState, 
    updateCanalizacionesState, 
    agregarFavorito, 
    quitarFavorito,
    agregarHistorial 
  } = useCanalizaciones();
  
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  const audioRef = useRef(null);

  // Filtrar temas según búsqueda y filtros
  const temasFiltrados = temas.filter(tema => {
    const coincideBusqueda = tema.nombre.toLowerCase().includes(canalizacionesState.busqueda.toLowerCase()) ||
                            tema.descripcion.toLowerCase().includes(canalizacionesState.busqueda.toLowerCase()) ||
                            tema.tags.some(tag => tag.toLowerCase().includes(canalizacionesState.busqueda.toLowerCase()));
    
    const coincideFiltro = canalizacionesState.filtroActivo === 'todos' ||
                          (canalizacionesState.filtroActivo === 'favoritos' && canalizacionesState.favoritos.some(f => f.id === tema.id)) ||
                          (canalizacionesState.filtroActivo === 'recientes' && canalizacionesState.historialCanalizaciones.some(h => h.id === tema.id)) ||
                          tema.categoria.toLowerCase() === canalizacionesState.filtroActivo.toLowerCase();
    
    return coincideBusqueda && coincideFiltro;
  });

  const seleccionarTema = (tema) => {
    updateCanalizacionesState({
      temaSeleccionado: tema,
      mostrandoMensaje: true,
      audioReproduciendo: false
    });
    agregarHistorial(tema);
  };

  const toggleAudio = () => {
    const nuevoEstado = !canalizacionesState.audioReproduciendo;
    updateCanalizacionesState({ audioReproduciendo: nuevoEstado });
    
    if (audioRef.current) {
      if (nuevoEstado) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const toggleFavorito = (tema) => {
    const esFavorito = canalizacionesState.favoritos.some(f => f.id === tema.id);
    if (esFavorito) {
      quitarFavorito(tema.id);
    } else {
      agregarFavorito(tema);
    }
  };

  const descargarPDF = () => {
    alert(`Descargando PDF: "${canalizacionesState.temaSeleccionado.nombre}"\n\nEn producción, esto generaría un PDF con el mensaje canalizado.`);
  };

  const compartirMensaje = () => {
    if (navigator.share) {
      navigator.share({
        title: `Canalización: ${canalizacionesState.temaSeleccionado.nombre}`,
        text: canalizacionesState.temaSeleccionado.afirmacion,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(canalizacionesState.temaSeleccionado.afirmacion);
      alert('Afirmación copiada al portapapeles');
    }
  };

  const volverASeleccion = () => {
    updateCanalizacionesState({
      temaSeleccionado: null,
      mostrandoMensaje: false,
      audioReproduciendo: false
    });
  };

  const expandirModal = () => {
    updateCanalizacionesState({ modalExpandido: !canalizacionesState.modalExpandido });
  };

  return (
    <div className="canalizaciones-angelicales">
      <audio ref={audioRef} src={canalizacionesState.temaSeleccionado?.audioUrl} />
      
      {/* Header */}
      <div className="canalizaciones-header">
        <div className="header-content">
          <button 
            onClick={canalizacionesState.mostrandoMensaje ? volverASeleccion : onVolver} 
            className="btn-volver"
          >
            <ArrowLeft size={20} />
            {canalizacionesState.mostrandoMensaje ? 'Volver a Temas' : 'Volver al Dashboard'}
          </button>
          
          <div className="header-title">
            <h1>👼 Canalizaciones Angelicales</h1>
            <p>Mensajes personalizados de tus ángeles guardianes</p>
          </div>
          
          <div className="header-actions">
            <button className="btn-header" onClick={() => setMostrarConfiguracion(true)}>
              <Settings size={20} />
              Config
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="canalizaciones-contenido">
        {!canalizacionesState.mostrandoMensaje ? (
          // Pantalla de selección de temas
          <div className="seleccion-temas">
            {/* Controles de búsqueda y filtros */}
            <div className="controles-principales">
              <div className="busqueda-container">
                <Search size={20} className="busqueda-icono" />
                <input
                  type="text"
                  placeholder="Buscar canalizaciones por tema o categoría..."
                  value={canalizacionesState.busqueda}
                  onChange={(e) => updateCanalizacionesState({ busqueda: e.target.value })}
                  className="busqueda-input"
                />
              </div>
              
              <div className="filtros-container">
                <select
                  value={canalizacionesState.filtroActivo}
                  onChange={(e) => updateCanalizacionesState({ filtroActivo: e.target.value })}
                  className="filtro-select"
                >
                  <option value="todos">Todos los Temas</option>
                  <option value="favoritos">Favoritos</option>
                  <option value="recientes">Recientes</option>
                  <option value="propósito">Propósito</option>
                  <option value="sanación">Sanación</option>
                  <option value="protección">Protección</option>
                  <option value="fortaleza">Fortaleza</option>
                  <option value="diario">Diario</option>
                </select>
                
                <div className="vista-controles">
                  <button
                    className={`btn-vista ${canalizacionesState.vistaActual === 'grid' ? 'activo' : ''}`}
                    onClick={() => updateCanalizacionesState({ vistaActual: 'grid' })}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    className={`btn-vista ${canalizacionesState.vistaActual === 'list' ? 'activo' : ''}`}
                    onClick={() => updateCanalizacionesState({ vistaActual: 'list' })}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid de temas */}
            <div className={`temas-container vista-${canalizacionesState.vistaActual}`}>
              {temasFiltrados.length === 0 ? (
                <div className="sin-resultados">
                  <MessageCircle size={64} className="sin-resultados-icono" />
                  <h3>No se encontraron canalizaciones</h3>
                  <p>Intenta ajustar tus filtros de búsqueda</p>
                </div>
              ) : (
                temasFiltrados.map((tema) => (
                  <TemaCard
                    key={tema.id}
                    tema={tema}
                    esFavorito={canalizacionesState.favoritos.some(f => f.id === tema.id)}
                    onSeleccionar={seleccionarTema}
                    onToggleFavorito={toggleFavorito}
                    vista={canalizacionesState.vistaActual}
                  />
                ))
              )}
            </div>

            {/* Información adicional */}
            <div className="info-adicional">
              <div className="info-card">
                <h4>¿Cómo funcionan las Canalizaciones?</h4>
                <p>
                  Cada mensaje ha sido canalizado directamente desde los reinos angelicales. 
                  Selecciona el tema que más resuene con tu corazón en este momento y permite 
                  que los ángeles te guíen con su sabiduría divina.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Pantalla del mensaje canalizado
          <MensajeCanalizado
            tema={canalizacionesState.temaSeleccionado}
            audioReproduciendo={canalizacionesState.audioReproduciendo}
            modalExpandido={canalizacionesState.modalExpandido}
            onToggleAudio={toggleAudio}
            onDescargarPDF={descargarPDF}
            onCompartir={compartirMensaje}
            onExpandir={expandirModal}
            esFavorito={canalizacionesState.favoritos.some(f => f.id === canalizacionesState.temaSeleccionado.id)}
            onToggleFavorito={() => toggleFavorito(canalizacionesState.temaSeleccionado)}
          />
        )}
      </div>

      {/* Modal de configuración */}
      {mostrarConfiguracion && (
        <ModalConfiguracion onCerrar={() => setMostrarConfiguracion(false)} />
      )}
    </div>
  );
};

// Componente de tarjeta de tema
const TemaCard = ({ tema, esFavorito, onSeleccionar, onToggleFavorito, vista }) => {
  return (
    <div className={`tema-card ${vista}`} onClick={() => onSeleccionar(tema)}>
      <div className="tema-imagen">
        <img src={tema.imagen} alt={tema.nombre} />
        <div className="tema-overlay">
          <div className={`tema-icono bg-gradient-to-br ${tema.color}`}>
            {tema.icono}
          </div>
        </div>
        <button
          className={`btn-favorito-card ${esFavorito ? 'activo' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorito(tema);
          }}
        >
          <Heart size={20} fill={esFavorito ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="tema-info">
        <div className="tema-header">
          <h3 className="tema-titulo">{tema.nombre}</h3>
          <span className="categoria-badge">{tema.categoria}</span>
        </div>
        
        <p className="tema-descripcion">{tema.descripcion}</p>
        
        <div className="tema-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>{tema.duracion}</span>
          </div>
          <div className="meta-item">
            <Users size={16} />
            <span>{tema.reproducciones.toLocaleString()}</span>
          </div>
          <div className="meta-item rating">
            <Star size={16} fill="currentColor" />
            <span>{tema.rating}</span>
          </div>
        </div>
        
        <div className="tema-tags">
          {tema.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente del mensaje canalizado
const MensajeCanalizado = ({ 
  tema, audioReproduciendo, modalExpandido, onToggleAudio, onDescargarPDF, 
  onCompartir, onExpandir, esFavorito, onToggleFavorito 
}) => {
  return (
    <div className={`mensaje-canalizado ${modalExpandido ? 'expandido' : ''}`}>
      {modalExpandido && (
        <div className="modal-overlay-expandido">
          <button className="btn-cerrar-expandido" onClick={onExpandir}>
            <X size={24} />
          </button>
        </div>
      )}
      
      <div className="mensaje-header">
        <div className={`tema-icono-grande bg-gradient-to-br ${tema.color}`}>
          {tema.icono}
        </div>
        <div className="mensaje-titulo-container">
          <h1 className="mensaje-titulo">{tema.nombre}</h1>
          <p className="mensaje-subtitulo">{tema.descripcion}</p>
        </div>
        <div className="mensaje-acciones">
          <button
            className={`btn-favorito-mensaje ${esFavorito ? 'activo' : ''}`}
            onClick={onToggleFavorito}
          >
            <Heart size={24} fill={esFavorito ? 'currentColor' : 'none'} />
          </button>
          <button className="btn-expandir" onClick={onExpandir}>
            <Maximize2 size={24} />
          </button>
        </div>
      </div>
      
      <div className="mensaje-contenido">
        <div className="mensaje-texto">
          <div className="texto-canalizado">
            {tema.mensaje.split('\n').map((parrafo, index) => (
              <p key={index} className={parrafo.trim() === '' ? 'espacio' : ''}>
                {parrafo}
              </p>
            ))}
          </div>
          
          <div className="afirmacion-container">
            <h4 className="afirmacion-titulo">Afirmación Angelical:</h4>
            <p className="afirmacion-texto">"{tema.afirmacion}"</p>
          </div>
        </div>
      </div>
      
      <div className="controles-mensaje">
        <button className="btn-control primario" onClick={onToggleAudio}>
          {audioReproduciendo ? <Pause size={20} /> : <Play size={20} />}
          {audioReproduciendo ? 'Pausar Audio' : 'Escuchar Canalización'}
        </button>
        
        <button className="btn-control secundario" onClick={onDescargarPDF}>
          <Download size={20} />
          Descargar PDF
        </button>
        
        <button className="btn-control secundario" onClick={onCompartir}>
          <Share2 size={20} />
          Compartir
        </button>
      </div>
      
      {audioReproduciendo && (
        <div className="reproductor-audio">
          <div className="audio-info">
            <Headphones size={20} />
            <span>Reproduciendo canalización de {tema.nombre}...</span>
          </div>
          <div className="audio-progreso">
            <div className="progreso-barra">
              <div className="progreso-fill" style={{ width: '45%' }} />
            </div>
            <div className="tiempo-info">
              <span>6:30</span>
              <span>{tema.duracion}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal de configuración
const ModalConfiguracion = ({ onCerrar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Configuración de Canalizaciones</h3>
          <button onClick={onCerrar} className="btn-cerrar">
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="config-section">
            <h4>Audio</h4>
            <label className="config-item">
              <input type="checkbox" />
              <span>Reproducción automática</span>
            </label>
            <label className="config-item">
              <span>Velocidad de lectura:</span>
              <select className="config-select-inline">
                <option value="lenta">Lenta</option>
                <option value="normal">Normal</option>
                <option value="rapida">Rápida</option>
              </select>
            </label>
          </div>
          
          <div className="config-section">
            <h4>Voz de Narración</h4>
            <select className="config-select">
              <option value="femenina">Voz Femenina</option>
              <option value="masculina">Voz Masculina</option>
              <option value="neutral">Voz Neutral</option>
            </select>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onCerrar} className="btn-guardar">
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal con Provider
const CanalizacionesAngelicalesConProvider = ({ onVolver }) => {
  return (
    <CanalizacionesProvider>
      <CanalizacionesAngelicales onVolver={onVolver} />
    </CanalizacionesProvider>
  );
};

export default CanalizacionesAngelicalesConProvider;

