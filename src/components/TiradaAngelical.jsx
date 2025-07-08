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

// Datos de configuración - ELIMINADO tiposDeCartas global para evitar conflictos

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
  },
  {
    id: 7,
    nombre: 'Arcángel Raguel',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Azul Celeste',
    cristal: 'Aguamarina',
    elemento: 'Aire',
    mensaje: 'Raguel trae justicia y equilibrio a tu vida. Las situaciones injustas se resolverán a tu favor. Mantén la fe en que la verdad siempre prevalece.',
    afirmacion: 'Confío en la justicia divina y en el equilibrio universal',
    energia: 'Justicia y Equilibrio'
  },
  {
    id: 8,
    nombre: 'Arcángel Ariel',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    color: 'Verde Bosque',
    cristal: 'Malaquita',
    elemento: 'Tierra',
    mensaje: 'Ariel te conecta con la naturaleza y la abundancia terrenal. Es momento de honrar tu conexión con la Madre Tierra y recibir sus bendiciones.',
    afirmacion: 'Estoy en armonía con la naturaleza y recibo su abundancia',
    energia: 'Naturaleza y Abundancia'
  },
  {
    id: 9,
    nombre: 'Arcángel Metatrón',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Violeta Intenso',
    cristal: 'Amatista',
    elemento: 'Éter',
    mensaje: 'Metatrón te ayuda a acceder a los registros akáshicos y la sabiduría universal. Tu propósito de vida se está revelando claramente.',
    afirmacion: 'Accedo a la sabiduría universal y comprendo mi propósito',
    energia: 'Sabiduría Universal'
  },
  {
    id: 10,
    nombre: 'Arcángel Zadkiel',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Violeta Suave',
    cristal: 'Fluorita',
    elemento: 'Fuego',
    mensaje: 'Zadkiel trae perdón y transmutación. Es tiempo de liberar el pasado y transformar las energías negativas en luz pura.',
    afirmacion: 'Perdono y libero, transformando todo en amor',
    energia: 'Perdón y Transmutación'
  },
  {
    id: 11,
    nombre: 'Arcángel Haniel',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Plata Lunar',
    cristal: 'Piedra Luna',
    elemento: 'Agua',
    mensaje: 'Haniel te conecta con los ciclos lunares y tu intuición femenina. Tu sensibilidad es un don que debes honrar y desarrollar.',
    afirmacion: 'Honro mi intuición y fluyo con los ciclos naturales',
    energia: 'Intuición y Ciclos'
  },
  {
    id: 12,
    nombre: 'Arcángel Raziel',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    color: 'Arcoíris',
    cristal: 'Ópalo',
    elemento: 'Éter',
    mensaje: 'Raziel revela los misterios divinos y los secretos del universo. Tu comprensión espiritual está expandiéndose rápidamente.',
    afirmacion: 'Comprendo los misterios divinos y expando mi conciencia',
    energia: 'Misterios Divinos'
  },
  {
    id: 13,
    nombre: 'Arcángel Sandalfón',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Turquesa',
    cristal: 'Turquesa',
    elemento: 'Tierra',
    mensaje: 'Sandalfón lleva tus oraciones al cielo y trae las respuestas de vuelta. Tus plegarias han sido escuchadas y están siendo respondidas.',
    afirmacion: 'Mis oraciones son escuchadas y respondidas con amor',
    energia: 'Oraciones y Respuestas'
  },
  {
    id: 14,
    nombre: 'Arcángel Jeremiel',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Púrpura Real',
    cristal: 'Sugilita',
    elemento: 'Aire',
    mensaje: 'Jeremiel te ayuda a revisar tu vida y hacer cambios positivos. Es momento de evaluar tu progreso y ajustar tu rumbo.',
    afirmacion: 'Reviso mi vida con amor y hago cambios positivos',
    energia: 'Revisión y Cambio'
  },
  {
    id: 15,
    nombre: 'Arcángel Azrael',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Blanco Cremoso',
    cristal: 'Calcita',
    elemento: 'Aire',
    mensaje: 'Azrael te ayuda en los procesos de transición y transformación. Los finales son nuevos comienzos disfrazados.',
    afirmacion: 'Abrazo los cambios como oportunidades de crecimiento',
    energia: 'Transición y Transformación'
  },
  {
    id: 16,
    nombre: 'Arcángel Camael',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    color: 'Rosa Coral',
    cristal: 'Rodocrosita',
    elemento: 'Fuego',
    mensaje: 'Camael fortalece tu autoestima y confianza personal. Es momento de reconocer tu valor y brillar con tu luz única.',
    afirmacion: 'Reconozco mi valor y brillo con confianza',
    energia: 'Autoestima y Confianza'
  },
  {
    id: 17,
    nombre: 'Arcángel Cassiel',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Gris Plateado',
    cristal: 'Hematita',
    elemento: 'Tierra',
    mensaje: 'Cassiel te enseña la paciencia y la perseverancia. Los frutos de tu trabajo se manifestarán en el momento perfecto.',
    afirmacion: 'Tengo paciencia y persevero con fe en el timing divino',
    energia: 'Paciencia y Perseverancia'
  },
  {
    id: 18,
    nombre: 'Arcángel Barachiel',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Dorado Suave',
    cristal: 'Citrino Claro',
    elemento: 'Fuego',
    mensaje: 'Barachiel trae bendiciones y buena fortuna. Las oportunidades están llegando a tu vida de formas inesperadas.',
    afirmacion: 'Recibo las bendiciones divinas con gratitud',
    energia: 'Bendiciones y Fortuna'
  },
  {
    id: 19,
    nombre: 'Arcángel Selaphiel',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Lavanda',
    cristal: 'Lepidolita',
    elemento: 'Aire',
    mensaje: 'Selaphiel te inspira en la oración y la meditación. Tu conexión espiritual se está profundizando y fortaleciendo.',
    afirmacion: 'Mi conexión espiritual se fortalece cada día',
    energia: 'Oración y Meditación'
  },
  {
    id: 20,
    nombre: 'Arcángel Remiel',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    color: 'Amarillo Brillante',
    cristal: 'Ámbar',
    elemento: 'Fuego',
    mensaje: 'Remiel trae esperanza y renovación. Después de la tormenta siempre llega la calma y la luz del sol.',
    afirmacion: 'Mantengo la esperanza y confío en la renovación',
    energia: 'Esperanza y Renovación'
  },
  {
    id: 21,
    nombre: 'Arcángel Muriel',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Verde Menta',
    cristal: 'Prehnita',
    elemento: 'Tierra',
    mensaje: 'Muriel te conecta con la sanación emocional y la paz interior. Es momento de sanar las heridas del corazón.',
    afirmacion: 'Sano mis emociones y encuentro paz interior',
    energia: 'Sanación Emocional'
  },
  {
    id: 22,
    nombre: 'Arcángel Iofiel',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Naranja Suave',
    cristal: 'Cornalina',
    elemento: 'Fuego',
    mensaje: 'Iofiel despierta tu creatividad y pasión por la vida. Es momento de expresar tu arte y creatividad únicos.',
    afirmacion: 'Expreso mi creatividad con pasión y alegría',
    energia: 'Creatividad y Pasión'
  },
  {
    id: 23,
    nombre: 'Arcángel Nathaniel',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Rojo Rubí',
    cristal: 'Granate',
    elemento: 'Fuego',
    mensaje: 'Nathaniel enciende el fuego sagrado en tu interior. Tu propósito espiritual está llamando y es momento de responder.',
    afirmacion: 'Respondo al llamado de mi propósito sagrado',
    energia: 'Fuego Sagrado'
  },
  {
    id: 24,
    nombre: 'Arcángel Amitiel',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    color: 'Índigo Profundo',
    cristal: 'Sodalita',
    elemento: 'Agua',
    mensaje: 'Amitiel te ayuda a desarrollar tu verdad interior y autenticidad. Es momento de ser completamente tú mismo.',
    afirmacion: 'Vivo en mi verdad y expreso mi autenticidad',
    energia: 'Verdad y Autenticidad'
  },
  {
    id: 25,
    nombre: 'Arcángel Uzziel',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    color: 'Cobre Brillante',
    cristal: 'Pirita',
    elemento: 'Tierra',
    mensaje: 'Uzziel fortalece tu determinación y fuerza de voluntad. Tienes el poder de manifestar todos tus sueños.',
    afirmacion: 'Tengo la fuerza y determinación para lograr mis sueños',
    energia: 'Determinación y Fuerza'
  },
  {
    id: 26,
    nombre: 'Arcángel Anael',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    color: 'Verde Jade',
    cristal: 'Jade',
    elemento: 'Tierra',
    mensaje: 'Anael trae armonía y equilibrio a todas las áreas de tu vida. La paz que buscas está dentro de ti.',
    afirmacion: 'Vivo en armonía y equilibrio perfecto',
    energia: 'Armonía y Equilibrio'
  },
  {
    id: 27,
    nombre: 'Arcángel Sachiel',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    color: 'Azul Zafiro',
    cristal: 'Zafiro',
    elemento: 'Agua',
    mensaje: 'Sachiel trae prosperidad y abundancia en todas sus formas. El universo está conspirando para tu éxito y bienestar.',
    afirmacion: 'Recibo la abundancia del universo con gratitud',
    energia: 'Prosperidad y Abundancia'
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

  const toggleAudio = () => {
    setAudioReproduciendo(!audioReproduciendo);
  };

  return (
    <div className="tirada-angelical-container">
      {/* Header Barra Superior - CORREGIDO */}
      <div className="tirada-hero-header">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-main-content">
            <div className="hero-icon">
              <Heart className="w-6 h-6" />
            </div>
            <div className="hero-text">
              <h1 className="hero-title">Apertura Angelical</h1>
              <p className="hero-description">Conecta con la sabiduría celestial a través de tus angeles</p>
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="btn-audio-hero" onClick={toggleAudio}>
              {audioReproduciendo ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {audioReproduciendo ? 'Silenciar' : 'Audio'}
            </button>
            
            <button
              onClick={onVolver}
              className="btn-volver-hero"
            >
              <ArrowLeft className="w-4 h-4" /> 
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="tirada-main-content">
        {renderizarContenido()}
      </div>
    </div>
  );

  function renderizarContenido() {
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
      tipoTirada: null,
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

  return (
    <div className="tirada-contenido">
      {/* Fase 1: Bienvenida */}
      {tiradaState.fase === 'bienvenida' && (
        <BienvenidaSection onContinuar={() => irAFase('seleccion-consolidada')} />
      )}

      {/* Fase 2: Selección Consolidada (Tipo + Tema) */}
      {tiradaState.fase === 'seleccion-consolidada' && (
        <SeleccionConsolidadaSection 
          tipoTirada={tiradaState.tipoTirada}
          temaSeleccionado={tiradaState.temaSeleccionado}
          onSeleccionarTipo={seleccionarTipoTirada}
          onSeleccionarTema={seleccionarTema}
          onContinuar={iniciarBarajado}
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
  );
  }
};

// Componente de Bienvenida - CORREGIDO
const BienvenidaSection = ({ onContinuar }) => {
  return (
    <div className="seccion-bienvenida">
      <div className="bienvenida-preparacion">
        <h3 className="titulo-dashboard">Preparación para tu Tirada</h3>
        <p className="descripcion-preparacion">Los ángeles están listos para compartir su sabiduría contigo. Toma un momento para centrarte y formular tu pregunta en tu corazón.</p>
        
        <div className="preparacion-grid">
          <div className="preparacion-item-card">
            <div className="card-header-cinta" style={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)' }}>
              <div className="card-icon-white">
                <Heart size={20} color="white" />
              </div>
              <span className="card-status">Paso 1</span>
            </div>
            <div className="card-content">
              <h4>Centra tu Mente</h4>
              <p>Respira profundamente y libera cualquier tensión o preocupación</p>
            </div>
          </div>
          <div className="preparacion-item-card">
            <div className="card-header-cinta" style={{ background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)' }}>
              <div className="card-icon-white">
                <Target size={20} color="white" />
              </div>
              <span className="card-status">Paso 2</span>
            </div>
            <div className="card-content">
              <h4>Formula tu Pregunta</h4>
              <p>Piensa claramente en lo que deseas saber o el área donde necesitas guía</p>
            </div>
          </div>
          <div className="preparacion-item-card">
            <div className="card-header-cinta" style={{ background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)' }}>
              <div className="card-icon-white">
                <Sparkles size={20} color="white" />
              </div>
              <span className="card-status">Paso 3</span>
            </div>
            <div className="card-content">
              <h4>Abre tu Corazón</h4>
              <p>Mantente receptivo a los mensajes que los ángeles tienen para ti</p>
            </div>
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

// Componente de Selección Consolidada (Tipo + Tema)
const SeleccionConsolidadaSection = ({ tipoTirada, temaSeleccionado, onSeleccionarTipo, onSeleccionarTema, onContinuar }) => {
  const tiposDeCartas = {
    3: { nombre: 'Pasado, Presente, Futuro', descripcion: 'Visión completa de tu situación temporal' },
    6: { nombre: 'Cruz Angelical', descripcion: 'Análisis profundo y detallado de tu camino' },
    9: { nombre: 'Tirada Maestra', descripcion: 'Revelación completa de tu destino angelical' },
    'vivo': { nombre: 'Consulta en Vivo', descripcion: 'Sesión personalizada con angelólogo certificado' }
  };

  const temasConsulta = [
    { id: 'amor', nombre: 'Amor y Relaciones', descripcion: 'Asuntos del corazón y vínculos', color: '#e91e63' },
    { id: 'trabajo', nombre: 'Trabajo y Carrera', descripcion: 'Desarrollo profesional y laboral', color: '#4caf50' },
    { id: 'salud', nombre: 'Salud y Bienestar', descripcion: 'Equilibrio físico y emocional', color: '#ff9800' },
    { id: 'dinero', nombre: 'Dinero y Abundancia', descripcion: 'Prosperidad y recursos', color: '#ffc107' },
    { id: 'familia', nombre: 'Familia y Hogar', descripcion: 'Relaciones familiares y hogar', color: '#9c27b0' },
    { id: 'espiritual', nombre: 'Crecimiento Espiritual', descripcion: 'Evolución y propósito de vida', color: '#673ab7' }
  ];

  return (
    <div className="seccion-seleccion-consolidada">
      <div className="seleccion-container">
        {/* Columna Izquierda - Tipo de Tirada */}
        <div className="columna-seleccion">
          <h3 className="titulo-dashboard">Elige el tipo de tirada</h3>
          <p className="descripcion-preparacion">Selecciona el número de cartas según la profundidad de guía que buscas</p>
          
          <div className="tipos-grid-consolidada">
            {Object.entries(tiposDeCartas).map(([tipo, info]) => (
              <div
                key={tipo}
                className={`tipo-card-consolidada ${tipoTirada === tipo ? 'seleccionado' : ''}`}
                onClick={() => onSeleccionarTipo(tipo)}
              >
                <div className="card-header-cinta" style={{ 
                  background: tipo === 'vivo' 
                    ? 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' 
                    : 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)' 
                }}>
                  <div className="card-icon-white">
                    {tipo === 'vivo' ? <Users size={20} color="white" /> : <Star size={20} color="white" />}
                  </div>
                  <span className="card-status">
                    {tipo === 'vivo' ? 'En Vivo' : `${tipo} Cartas`}
                  </span>
                </div>
                <div className="card-content">
                  <h4>{info.nombre}</h4>
                  <p>{info.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha - Tema de Consulta */}
        <div className="columna-seleccion">
          <h3 className="titulo-dashboard">Elige el tema de tu consulta</h3>
          <p className="descripcion-preparacion">Selecciona el área de tu vida sobre la que deseas recibir guía angelical</p>
          
          <div className="temas-grid-consolidada">
            {temasConsulta.map((tema) => (
              <div
                key={tema.id}
                className={`tema-card-consolidada ${temaSeleccionado === tema.id ? 'seleccionado' : ''}`}
                onClick={() => onSeleccionarTema(tema.id)}
              >
                <div className="card-header-cinta" style={{ background: `linear-gradient(135deg, ${tema.color} 0%, ${tema.color}dd 100%)` }}>
                  <div className="card-icon-white">
                    {tema.id === 'amor' && <Heart size={20} color="white" />}
                    {tema.id === 'trabajo' && <Target size={20} color="white" />}
                    {tema.id === 'salud' && <Heart size={20} color="white" />}
                    {tema.id === 'dinero' && <Star size={20} color="white" />}
                    {tema.id === 'familia' && <Heart size={20} color="white" />}
                    {tema.id === 'espiritual' && <Sparkles size={20} color="white" />}
                  </div>
                  <span className="card-status">Disponible</span>
                </div>
                <div className="card-content">
                  <h4>{tema.nombre}</h4>
                  <p>{tema.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {tipoTirada && temaSeleccionado && (
        <div className="resumen-seleccion">
          <div className="resumen-contenido">
            <h4>Tu selección:</h4>
            <p><strong>Tipo:</strong> {tiposDeCartas[tipoTirada]?.nombre}</p>
            <p><strong>Tema:</strong> {temasConsulta.find(t => t.id === temaSeleccionado)?.nombre}</p>
          </div>
          <button className="btn-continuar" onClick={onContinuar}>
            <ChevronRight size={20} />
            {tipoTirada === 'vivo' ? 'Solicitar Consulta' : 'Continuar con la Tirada'}
          </button>
        </div>
      )}
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
        {cartasDisponibles.slice(0, 27).map((carta, index) => (
          <div
            key={carta.id}
            className={`carta-mazo ${cartasSeleccionadas.find(c => c.id === carta.id) ? 'seleccionada' : ''}`}
            onClick={() => onSeleccionarCarta(carta)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="carta-reverso">
              <img src="/dorso.jpg" alt="Dorso de carta angelical" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px'}} />
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
            <img src="/dorso.jpg" alt="Dorso de carta angelical" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px'}} />
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
              <img src="/dorso.jpg" alt="Dorso de carta angelical" style={{width: '80px', height: '120px', objectFit: 'cover', borderRadius: '8px'}} />
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

