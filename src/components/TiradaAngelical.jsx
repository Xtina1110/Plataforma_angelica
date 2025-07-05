import React, { useState, useEffect, useContext, createContext } from 'react';
import './TiradaAngelical.css';
import { 
  ArrowLeft, Download, Users, Loader2, Star, Heart, Eye, Sparkles,
  ChevronRight, ChevronDown, ChevronUp, Maximize2, X, Play, Pause,
  Volume2, VolumeX, RotateCcw, Shuffle, BookOpen, Clock, Calendar,
  Crown, Gift, Zap, Target, BookmarkPlus, Search, Filter
} from 'lucide-react';

// Context para el estado de la tirada
const TiradaContext = createContext();

// Provider del contexto
export const TiradaProvider = ({ children }) => {
  const [tiradaState, setTiradaState] = useState({
    fase: 'bienvenida',
    tipoTirada: 3,
    temaSeleccionado: null,
    cartasSeleccionadas: [],
    cartaActual: 0,
    tiradaCompleta: false,
    consultaEnVivo: false,
    audioActivo: false,
    modalExpandido: false
  });

  const updateTiradaState = (updates) => {
    setTiradaState(prev => ({ ...prev, ...updates }));
  };

  return (
    <TiradaContext.Provider value={{ tiradaState, updateTiradaState }}>
      {children}
    </TiradaContext.Provider>
  );
};

// Hook para usar el contexto
const useTirada = () => {
  const context = useContext(TiradaContext);
  if (!context) {
    throw new Error('useTirada must be used within a TiradaProvider');
  }
  return context;
};

// Datos de configuración
const tiposDeCartas = {
  3: {
    nombre: 'Tirada Rápida',
    descripcion: 'Guía inmediata para tu situación actual',
    icono: '⚡',
    color: 'from-blue-500 to-cyan-500',
    posiciones: ['Pasado/Causa', 'Presente/Situación', 'Futuro/Resultado']
  },
  6: {
    nombre: 'Tirada Completa',
    descripcion: 'Análisis profundo de tu camino espiritual',
    icono: '🔮',
    color: 'from-purple-500 to-pink-500',
    posiciones: ['Situación Actual', 'Desafío', 'Pasado', 'Futuro', 'Corona/Meta', 'Resultado Final']
  },
  9: {
    nombre: 'Tirada Maestra',
    descripción: 'Revelación completa de tu destino angelical',
    icono: '✨',
    color: 'from-yellow-500 to-orange-500',
    posiciones: ['Yo Interior', 'Situación', 'Desafío', 'Pasado Distante', 'Pasado Reciente', 'Futuro Posible', 'Tu Enfoque', 'Influencias Externas', 'Esperanzas y Miedos']
  }
};

const temasConsulta = [
  {
    id: 1,
    nombre: 'Amor y Relaciones',
    descripcion: 'Guía angelical para tu vida amorosa y relaciones',
    icono: '💕',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    nombre: 'Trabajo y Carrera',
    descripcion: 'Orientación para tu camino profesional',
    icono: '💼',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 3,
    nombre: 'Salud y Bienestar',
    descripcion: 'Sanación y equilibrio para tu ser',
    icono: '🌿',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    nombre: 'Dinero y Abundancia',
    descripcion: 'Prosperidad y flujo financiero',
    icono: '💰',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 5,
    nombre: 'Espiritualidad',
    descripcion: 'Crecimiento y despertar espiritual',
    icono: '🙏',
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 6,
    nombre: 'Familia',
    descripcion: 'Armonía y comprensión familiar',
    icono: '👨‍👩‍👧‍👦',
    color: 'from-orange-500 to-red-500'
  }
];

// Datos de ejemplo de cartas angelicales
const cartasAngelicas = [
  {
    id: 1,
    nombre: 'Arcángel Miguel',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Azul Real',
    cristal: 'Lapislázuli',
    elemento: 'Fuego',
    mensaje: 'El Arcángel Miguel te rodea con su manto de protección. Es momento de liberar los miedos que te limitan y avanzar con valentía hacia tus metas. Tu fuerza interior es más poderosa de lo que imaginas.',
    afirmacion: 'Soy valiente y estoy protegido por la luz divina',
    energia: 'Protección y Valor'
  },
  {
    id: 2,
    nombre: 'Arcángel Gabriel',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Blanco Puro',
    cristal: 'Selenita',
    elemento: 'Agua',
    mensaje: 'Gabriel trae mensajes de claridad y comunicación. Es tiempo de expresar tu verdad con amor y escuchar los mensajes que el universo tiene para ti. Tu intuición está especialmente activa.',
    afirmacion: 'Comunico mi verdad con amor y claridad',
    energia: 'Comunicación y Claridad'
  },
  {
    id: 3,
    nombre: 'Arcángel Rafael',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Verde Esmeralda',
    cristal: 'Esmeralda',
    elemento: 'Tierra',
    mensaje: 'Rafael extiende sus alas sanadoras sobre ti. La sanación está llegando a todos los niveles de tu ser. Permite que la energía curativa fluya y transforma lo que necesita ser sanado.',
    afirmacion: 'Acepto la sanación divina en todos los niveles',
    energia: 'Sanación y Renovación'
  },
  {
    id: 4,
    nombre: 'Arcángel Uriel',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    color: 'Dorado Brillante',
    cristal: 'Citrino',
    elemento: 'Fuego',
    mensaje: 'Uriel ilumina tu camino con sabiduría divina. Las respuestas que buscas están dentro de ti. Confía en tu sabiduría interior y permite que la luz de la comprensión guíe tus decisiones.',
    afirmacion: 'Confío en mi sabiduría interior y en la guía divina',
    energia: 'Sabiduría e Iluminación'
  },
  {
    id: 5,
    nombre: 'Arcángel Chamuel',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Rosa Suave',
    cristal: 'Cuarzo Rosa',
    elemento: 'Aire',
    mensaje: 'Chamuel envuelve tu corazón con amor incondicional. Es momento de sanar las heridas del pasado y abrir tu corazón al amor verdadero. El amor que buscas comienza contigo mismo.',
    afirmacion: 'Mi corazón está abierto al amor divino e incondicional',
    energia: 'Amor y Compasión'
  },
  {
    id: 6,
    nombre: 'Arcángel Jofiel',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Amarillo Dorado',
    cristal: 'Topacio',
    elemento: 'Aire',
    mensaje: 'Jofiel trae belleza y alegría a tu vida. Es tiempo de ver la belleza en todo lo que te rodea y encontrar alegría en los pequeños momentos. Tu perspectiva está cambiando hacia la luz.',
    afirmacion: 'Veo belleza y alegría en cada momento de mi vida',
    energia: 'Belleza y Alegría'
  }
];

// Componente principal
const TiradaAngelical = ({ onVolver }) => {
  const { tiradaState, updateTiradaState } = useTirada();
  const [cartasDisponibles, setCartasDisponibles] = useState([]);
  const [generandoPDF, setGenerandoPDF] = useState(false);
  const [audioReproduciendo, setAudioReproduciendo] = useState(false);

  // Inicializar cartas disponibles
  useEffect(() => {
    const cartasBarajadas = [...cartasAngelicas].sort(() => Math.random() - 0.5);
    setCartasDisponibles(cartasBarajadas);
  }, []);

  // Funciones de navegación
  const irAFase = (nuevaFase) => {
    updateTiradaState({ fase: nuevaFase });
  };

  const seleccionarTipoTirada = (tipo) => {
    updateTiradaState({ tipoTirada: tipo });
  };

  const seleccionarTema = (tema) => {
    updateTiradaState({ temaSeleccionado: tema });
  };

  const toggleConsultaEnVivo = () => {
    updateTiradaState({ consultaEnVivo: !tiradaState.consultaEnVivo });
  };

  // Funciones de tirada
  const iniciarBarajado = () => {
    irAFase('barajando');
    setTimeout(() => {
      irAFase('seleccion-cartas');
    }, 3000);
  };

  const seleccionarCarta = (carta) => {
    if (tiradaState.cartasSeleccionadas.length < tiradaState.tipoTirada) {
      const nuevasCartas = [...tiradaState.cartasSeleccionadas, carta];
      updateTiradaState({ cartasSeleccionadas: nuevasCartas });
      
      if (nuevasCartas.length === tiradaState.tipoTirada) {
        setTimeout(() => {
          irAFase('revelacion');
          updateTiradaState({ cartaActual: 0 });
        }, 1000);
      }
    }
  };

  const siguienteCarta = () => {
    if (tiradaState.cartaActual < tiradaState.cartasSeleccionadas.length - 1) {
      updateTiradaState({ cartaActual: tiradaState.cartaActual + 1 });
    } else {
      updateTiradaState({ tiradaCompleta: true });
      irAFase('resumen');
    }
  };

  const nuevaTirada = () => {
    updateTiradaState({
      fase: 'bienvenida',
      tipoTirada: 3,
      temaSeleccionado: null,
      cartasSeleccionadas: [],
      cartaActual: 0,
      tiradaCompleta: false,
      consultaEnVivo: false,
      modalExpandido: false
    });
    const cartasBarajadas = [...cartasAngelicas].sort(() => Math.random() - 0.5);
    setCartasDisponibles(cartasBarajadas);
  };

  const exportarPDF = async () => {
    setGenerandoPDF(true);
    // Simular generación de PDF
    setTimeout(() => {
      setGenerandoPDF(false);
      alert('PDF generado exitosamente');
    }, 2000);
  };

  const solicitarConsultaEnVivo = () => {
    alert('Tu solicitud de Consulta en Vivo ha sido recibida. Un angelólogo se pondrá en contacto contigo pronto.');
  };

  const toggleAudio = () => {
    setAudioReproduciendo(!audioReproduciendo);
  };

  return (
    <div className="tirada-angelical-moderna">
      {/* Header */}
      <div className="tirada-header">
        <div className="header-content">
          <button onClick={onVolver} className="btn-volver">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </button>
          <div className="header-title">
            <h1>🃏 Tirada Angelical</h1>
            <p>Conecta con la sabiduría celestial a través de las cartas angelicales</p>
          </div>
          <div className="header-actions">
            <button className="btn-audio" onClick={toggleAudio}>
              {audioReproduciendo ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {audioReproduciendo ? 'Silenciar' : 'Audio'}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="tirada-contenido">
        {/* Fase 1: Bienvenida */}
        {tiradaState.fase === 'bienvenida' && (
          <BienvenidaSection onContinuar={() => irAFase('seleccion-tipo')} />
        )}

        {/* Fase 2: Selección de tipo */}
        {tiradaState.fase === 'seleccion-tipo' && (
          <SeleccionTipoSection 
            tipoTirada={tiradaState.tipoTirada}
            consultaEnVivo={tiradaState.consultaEnVivo}
            onSeleccionarTipo={seleccionarTipoTirada}
            onToggleConsulta={toggleConsultaEnVivo}
            onContinuar={() => irAFase('seleccion-tema')}
          />
        )}

        {/* Fase 3: Selección de tema */}
        {tiradaState.fase === 'seleccion-tema' && (
          <SeleccionTemaSection 
            temaSeleccionado={tiradaState.temaSeleccionado}
            consultaEnVivo={tiradaState.consultaEnVivo}
            tipoTirada={tiradaState.tipoTirada}
            onSeleccionarTema={seleccionarTema}
            onIniciarBarajado={iniciarBarajado}
            onSolicitarConsulta={solicitarConsultaEnVivo}
          />
        )}

        {/* Fase 4: Barajando */}
        {tiradaState.fase === 'barajando' && (
          <BarajandoSection />
        )}

        {/* Fase 5: Selección de cartas */}
        {tiradaState.fase === 'seleccion-cartas' && (
          <SeleccionCartasSection 
            tipoTirada={tiradaState.tipoTirada}
            cartasSeleccionadas={tiradaState.cartasSeleccionadas}
            cartasDisponibles={cartasDisponibles}
            onSeleccionarCarta={seleccionarCarta}
          />
        )}

        {/* Fase 6: Revelación */}
        {tiradaState.fase === 'revelacion' && (
          <RevelacionSection 
            carta={tiradaState.cartasSeleccionadas[tiradaState.cartaActual]}
            cartaActual={tiradaState.cartaActual}
            totalCartas={tiradaState.cartasSeleccionadas.length}
            tipoTirada={tiradaState.tipoTirada}
            onSiguiente={siguienteCarta}
          />
        )}

        {/* Fase 7: Resumen */}
        {tiradaState.fase === 'resumen' && (
          <ResumenSection 
            cartasSeleccionadas={tiradaState.cartasSeleccionadas}
            temaSeleccionado={tiradaState.temaSeleccionado}
            tipoTirada={tiradaState.tipoTirada}
            generandoPDF={generandoPDF}
            onExportarPDF={exportarPDF}
            onNuevaTirada={nuevaTirada}
            onSolicitarConsulta={solicitarConsultaEnVivo}
          />
        )}
      </div>
    </div>
  );
};

// Componente de Bienvenida
const BienvenidaSection = ({ onContinuar }) => {
  return (
    <div className="seccion-bienvenida">
      <div className="bienvenida-hero">
        <div className="hero-icono">
          <Sparkles size={48} />
        </div>
        <h2>Bienvenido a tu Consulta Angelical</h2>
        <p>Los ángeles están listos para compartir su sabiduría contigo. Toma un momento para centrarte y formular tu pregunta en tu corazón.</p>
      </div>
      
      <div className="bienvenida-preparacion">
        <h3>Preparación para tu Tirada</h3>
        <div className="preparacion-grid">
          <div className="preparacion-item">
            <div className="item-icono">🧘‍♀️</div>
            <h4>Centra tu Mente</h4>
            <p>Respira profundamente y libera cualquier tensión o preocupación</p>
          </div>
          <div className="preparacion-item">
            <div className="item-icono">💭</div>
            <h4>Formula tu Pregunta</h4>
            <p>Piensa claramente en lo que deseas saber o el área donde necesitas guía</p>
          </div>
          <div className="preparacion-item">
            <div className="item-icono">🙏</div>
            <h4>Abre tu Corazón</h4>
            <p>Mantente receptivo a los mensajes que los ángeles tienen para ti</p>
          </div>
        </div>
      </div>

      <button className="btn-continuar" onClick={onContinuar}>
        <ChevronRight size={20} />
        Comenzar mi Tirada
      </button>
    </div>
  );
};

// Componente de Selección de Tipo
const SeleccionTipoSection = ({ tipoTirada, consultaEnVivo, onSeleccionarTipo, onToggleConsulta, onContinuar }) => {
  return (
    <div className="seccion-seleccion-tipo">
      <div className="seccion-header">
        <div className="header-icono">
          <BookOpen size={32} />
        </div>
        <h2>Elige el tipo de tirada</h2>
        <p>Selecciona el número de cartas según la profundidad de guía que buscas</p>
      </div>

      <div className="tipos-grid">
        {Object.entries(tiposDeCartas).map(([numero, tipo]) => (
          <div
            key={numero}
            className={`tipo-card ${tipoTirada === parseInt(numero) ? 'seleccionado' : ''}`}
            onClick={() => onSeleccionarTipo(parseInt(numero))}
          >
            <div className="card-icono">{tipo.icono}</div>
            <h3>{tipo.nombre}</h3>
            <p>{tipo.descripcion}</p>
            <div className="card-badge">{numero} cartas</div>
          </div>
        ))}
        
        <div
          className={`tipo-card consulta-vivo ${consultaEnVivo ? 'seleccionado' : ''}`}
          onClick={onToggleConsulta}
        >
          <div className="card-icono">👩‍💻</div>
          <h3>Consulta en Vivo</h3>
          <p>Sesión personalizada con un angelólogo certificado</p>
          <div className="card-badge">En vivo</div>
        </div>
      </div>

      <button className="btn-continuar" onClick={onContinuar}>
        <ChevronRight size={20} />
        Continuar
      </button>
    </div>
  );
};

// Componente de Selección de Tema
const SeleccionTemaSection = ({ temaSeleccionado, consultaEnVivo, tipoTirada, onSeleccionarTema, onIniciarBarajado, onSolicitarConsulta }) => {
  return (
    <div className="seccion-seleccion-tema">
      <div className="seccion-header">
        <div className="header-icono">
          <Target size={32} />
        </div>
        <h2>Elige el tema de tu consulta</h2>
        <p>Selecciona el área de tu vida sobre la que deseas recibir guía angelical</p>
      </div>

      <div className="temas-grid">
        {temasConsulta.map((tema) => (
          <div
            key={tema.id}
            className={`tema-card ${temaSeleccionado?.id === tema.id ? 'seleccionado' : ''}`}
            onClick={() => onSeleccionarTema(tema)}
          >
            <div className="card-icono">{tema.icono}</div>
            <h3>{tema.nombre}</h3>
            <p>{tema.descripcion}</p>
          </div>
        ))}
      </div>

      {temaSeleccionado && (
        <div className="tema-acciones">
          <button 
            className="btn-iniciar-tirada"
            onClick={consultaEnVivo ? onSolicitarConsulta : onIniciarBarajado}
          >
            {consultaEnVivo ? (
              <>
                <Users size={20} />
                Solicitar Consulta en Vivo
              </>
            ) : (
              <>
                <Shuffle size={20} />
                Comenzar Tirada de {tipoTirada} Cartas
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// Componente de Barajando
const BarajandoSection = () => {
  return (
    <div className="seccion-barajando">
      <div className="barajando-animacion">
        <div className="estrella-rotando">
          <Sparkles size={64} />
        </div>
        <h2>Los Ángeles están barajando las cartas...</h2>
        <p>Mantén tu pregunta en el corazón mientras las energías angelicales seleccionan las cartas perfectas para ti.</p>
        
        <div className="progreso-barajado">
          <div className="barra-progreso">
            <div className="progreso-fill"></div>
          </div>
          <p>Conectando con la energía angelical...</p>
        </div>
      </div>
    </div>
  );
};

// Componente de Selección de Cartas
const SeleccionCartasSection = ({ tipoTirada, cartasSeleccionadas, cartasDisponibles, onSeleccionarCarta }) => {
  return (
    <div className="seccion-seleccion-cartas">
      <div className="seccion-header">
        <h2>Selecciona {tipoTirada} cartas</h2>
        <p>Deja que tu intuición te guíe hacia las cartas que los ángeles han preparado para ti</p>
        <div className="contador-cartas">
          {cartasSeleccionadas.length} de {tipoTirada} cartas seleccionadas
        </div>
      </div>

      <div className="mazo-cartas">
        {cartasDisponibles.slice(0, 21).map((carta, index) => (
          <div
            key={carta.id}
            className={`carta-mazo ${cartasSeleccionadas.find(c => c.id === carta.id) ? 'seleccionada' : ''}`}
            onClick={() => onSeleccionarCarta(carta)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="carta-reverso">
              <div className="reverso-patron">✨</div>
            </div>
          </div>
        ))}
      </div>

      {cartasSeleccionadas.length === tipoTirada && (
        <div className="mensaje-completado">
          <Sparkles size={24} />
          ¡Perfecto! Preparando la revelación de tus cartas...
        </div>
      )}
    </div>
  );
};

// Componente de Revelación
const RevelacionSection = ({ carta, cartaActual, totalCartas, tipoTirada, onSiguiente }) => {
  const posicion = tiposDeCartas[tipoTirada]?.posiciones?.[cartaActual] || `Carta ${cartaActual + 1}`;

  return (
    <div className="seccion-revelacion">
      <div className="carta-revelada">
        <div className="carta-header">
          <h2>{carta.nombre}</h2>
          <p className="carta-posicion">{posicion}</p>
          <div className="carta-progreso">
            Carta {cartaActual + 1} de {totalCartas}
          </div>
        </div>

        <div className="carta-contenido">
          <div className="carta-imagen">
            <img src={carta.imagen} alt={carta.nombre} />
            <div className="imagen-overlay">
              <div className="energia-badge">{carta.energia}</div>
            </div>
          </div>

          <div className="carta-info">
            <div className="carta-propiedades">
              <div className="propiedad">
                <span className="label">Color:</span>
                <span className="valor">{carta.color}</span>
              </div>
              <div className="propiedad">
                <span className="label">Cristal:</span>
                <span className="valor">{carta.cristal}</span>
              </div>
              <div className="propiedad">
                <span className="label">Elemento:</span>
                <span className="valor">{carta.elemento}</span>
              </div>
            </div>

            <div className="carta-mensaje">
              <h3>Mensaje Angelical</h3>
              <p>{carta.mensaje}</p>
            </div>

            <div className="carta-afirmacion">
              <h4>Afirmación</h4>
              <p>"{carta.afirmacion}"</p>
            </div>
          </div>
        </div>

        <button className="btn-siguiente" onClick={onSiguiente}>
          {cartaActual < totalCartas - 1 ? (
            <>
              <ChevronRight size={20} />
              Siguiente Carta
            </>
          ) : (
            <>
              <Eye size={20} />
              Ver Resumen de Tirada
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Componente de Resumen
const ResumenSection = ({ cartasSeleccionadas, temaSeleccionado, tipoTirada, generandoPDF, onExportarPDF, onNuevaTirada, onSolicitarConsulta }) => {
  return (
    <div className="seccion-resumen">
      <div className="resumen-header">
        <h2>Resumen de tu Tirada Angelical</h2>
        <div className="resumen-meta">
          <p><strong>Tipo de Tirada:</strong> {tiposDeCartas[tipoTirada]?.nombre}</p>
          <p><strong>Tema de Consulta:</strong> {temaSeleccionado?.nombre}</p>
          <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="cartas-resumen">
        {cartasSeleccionadas.map((carta, index) => (
          <div key={index} className="carta-resumen-item">
            <div className="carta-mini">
              <img src={carta.imagen} alt={carta.nombre} />
            </div>
            <div className="carta-resumen-info">
              <h3>{carta.nombre}</h3>
              <p className="posicion">{tiposDeCartas[tipoTirada]?.posiciones?.[index] || `Carta ${index + 1}`}</p>
              <p className="energia">{carta.energia}</p>
              <p className="mensaje-corto">{carta.mensaje.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>

      <div className="resumen-acciones">
        <button 
          className="btn-exportar-pdf"
          onClick={onExportarPDF}
          disabled={generandoPDF}
        >
          {generandoPDF ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Generando PDF...
            </>
          ) : (
            <>
              <Download size={20} />
              Descargar PDF
            </>
          )}
        </button>

        <button className="btn-consulta-vivo" onClick={onSolicitarConsulta}>
          <Users size={20} />
          Solicitar Lectura en Vivo
        </button>

        <button className="btn-nueva-tirada" onClick={onNuevaTirada}>
          <RotateCcw size={20} />
          Nueva Tirada
        </button>
      </div>
    </div>
  );
};

// Componente principal con Provider
const TiradaAngelicalConProvider = ({ onVolver }) => {
  return (
    <TiradaProvider>
      <TiradaAngelical onVolver={onVolver} />
    </TiradaProvider>
  );
};

export default TiradaAngelicalConProvider;

