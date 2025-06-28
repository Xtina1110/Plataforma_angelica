import React, { useState, useEffect, useRef } from 'react';
import './TiradaAngelical.css';
import { Star, ChevronLeft, ChevronRight, RefreshCw, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';

// Datos de las cartas angelicales
const cartas = [
  { 
    id: 1, 
    titulo: 'Arcángel Miguel', 
    mensaje: 'Protección y valentía. Enfrenta tus miedos con la espada de la verdad.',
    descripcion: 'Miguel te protege y te da la fuerza para superar cualquier obstáculo. Su energía azul te rodea de valor y determinación.',
    consejo: 'Confía en tu poder interior. No hay nada que no puedas superar con fe y coraje.'
  },
  { 
    id: 2, 
    titulo: 'Arcángel Gabriel', 
    mensaje: 'Comunicación y claridad. Recibe mensajes divinos y expresa tu verdad.',
    descripcion: 'Gabriel te ayuda a comunicarte con claridad y recibir mensajes del cielo. Su luz blanca ilumina tu camino.',
    consejo: 'Escucha tu intuición. Los ángeles te hablan a través de señales y sincronías.'
  },
  { 
    id: 3, 
    titulo: 'Arcángel Rafael', 
    mensaje: 'Sanación y bienestar. Permite que la energía divina restaure tu cuerpo y alma.',
    descripcion: 'Rafael trae sanación a todos los niveles: físico, emocional y espiritual. Su energía verde te restaura.',
    consejo: 'Permítete sanar. Libera lo que ya no te sirve y abraza la renovación completa.'
  },
  { 
    id: 4, 
    titulo: 'Arcángel Uriel', 
    mensaje: 'Iluminación y sabiduría. La luz del conocimiento te guía en tu camino.',
    descripcion: 'Uriel te trae sabiduría divina y claridad mental. Su llama dorada ilumina las respuestas que buscas.',
    consejo: 'Busca el conocimiento. La sabiduría que necesitas ya está dentro de ti, solo debes acceder a ella.'
  },
  { 
    id: 5, 
    titulo: 'Arcángel Chamuel', 
    mensaje: 'Amor y relaciones. Abre tu corazón para dar y recibir amor incondicional.',
    descripcion: 'Chamuel te ayuda en temas del corazón y las relaciones. Su energía rosa sana heridas emocionales.',
    consejo: 'Ama sin condiciones. El amor verdadero comienza por el amor propio y se expande hacia otros.'
  },
  { 
    id: 6, 
    titulo: 'Arcángel Jofiel', 
    mensaje: 'Belleza y creatividad. Encuentra la inspiración en todo lo que te rodea.',
    descripcion: 'Jofiel despierta tu creatividad y te ayuda a ver la belleza en todas las cosas. Su energía amarilla inspira.',
    consejo: 'Crea con pasión. Tu creatividad es un regalo divino que debes compartir con el mundo.'
  },
  { 
    id: 7, 
    titulo: 'Arcángel Zadquiel', 
    mensaje: 'Perdón y transmutación. Libera el pasado y abraza la libertad espiritual.',
    descripcion: 'Zadquiel te ayuda a perdonar y transmutar energías negativas en luz. Su llama violeta purifica.',
    consejo: 'Perdona y libérate. El perdón es la llave que abre las puertas de tu libertad espiritual.'
  },
  { 
    id: 8, 
    titulo: 'Arcángel Raziel', 
    mensaje: 'Misterios y magia divina. Desvela los secretos del universo y tu propio poder.',
    descripcion: 'Raziel te revela conocimientos esotéricos y despierta tu poder espiritual. Su energía arcoíris te transforma.',
    consejo: 'Confía en tu magia. Eres un ser poderoso capaz de manifestar milagros en tu vida.'
  },
  { 
    id: 9, 
    titulo: 'Arcángel Metatrón', 
    mensaje: 'Ascensión y propósito. Alinea tu vida con tu misión divina y evoluciona.',
    descripcion: 'Metatrón te guía hacia tu propósito superior y acelera tu evolución espiritual. Su geometría sagrada te eleva.',
    consejo: 'Vive tu propósito. Has venido a este mundo con una misión especial que solo tú puedes cumplir.'
  }
];

const tiposTirada = [
  { id: 'una_carta', nombre: 'Una Carta', descripcion: 'Mensaje directo del día', cartas: 1 },
  { id: 'tres_cartas', nombre: 'Tres Cartas', descripcion: 'Pasado, Presente, Futuro', cartas: 3 },
  { id: 'cruz_angelical', nombre: 'Cruz Angélica', descripcion: 'Lectura completa de 5 cartas', cartas: 5 }
];

const temasTirada = [
  { id: 'general', nombre: 'Consulta General', descripcion: 'Mensaje general para tu vida' },
  { id: 'amor', nombre: 'Amor y Relaciones', descripcion: 'Guía en temas del corazón' },
  { id: 'trabajo', nombre: 'Trabajo y Carrera', descripcion: 'Orientación profesional' },
  { id: 'salud', nombre: 'Salud y Bienestar', descripcion: 'Sanación y equilibrio' },
  { id: 'espiritual', nombre: 'Crecimiento Espiritual', descripcion: 'Evolución del alma' },
  { id: 'familia', nombre: 'Familia', descripcion: 'Armonía familiar' }
];

const TiradaAngelical = () => {
  const [fase, setFase] = useState('bienvenida');
  const [tipoTirada, setTipoTirada] = useState(null);
  const [temaTirada, setTemaTirada] = useState(null);
  const [cartasMazo, setCartasMazo] = useState([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [cartasReveladas, setCartasReveladas] = useState([]);
  const [progresoBarajado, setProgresoBarajado] = useState(0);
  const [audioActivo, setAudioActivo] = useState(true);
  const [musicaFondo, setMusicaFondo] = useState(null);

  // Efectos de sonido
  const shuffleAudio = useRef(null);
  const selectAudio = useRef(null);
  const revealAudio = useRef(null);

  useEffect(() => {
    // Inicializar audios
    if (typeof Audio !== 'undefined') {
      shuffleAudio.current = new Audio('/assets/audio/shuffle.mp3');
      selectAudio.current = new Audio('/assets/audio/select.mp3');
      revealAudio.current = new Audio('/assets/audio/reveal.mp3');
      
      const music = new Audio('/assets/audio/angelic_432hz_loop.mp3');
      music.loop = true;
      music.volume = 0.1;
      setMusicaFondo(music);
    }
  }, []);

  const reproducirSonido = (audio) => {
    if (audioActivo && audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Error reproduciendo audio:', e));
    }
  };

  const toggleAudio = () => {
    setAudioActivo(!audioActivo);
    if (musicaFondo) {
      if (audioActivo) {
        musicaFondo.pause();
      } else {
        musicaFondo.play().catch(e => console.log('Error reproduciendo música:', e));
      }
    }
  };

  const iniciarTirada = () => {
    if (musicaFondo && audioActivo) {
      musicaFondo.play().catch(e => console.log('Error reproduciendo música:', e));
    }
    setFase('seleccion_tipo');
  };

  const seleccionarTipo = (tipo) => {
    setTipoTirada(tipo);
    setFase('seleccion_tema');
  };

  const seleccionarTema = (tema) => {
    setTemaTirada(tema);
    setFase('barajando');
    barajarCartas();
  };

  const barajarCartas = () => {
    reproducirSonido(shuffleAudio.current);
    
    // Simular barajado con progreso
    let progreso = 0;
    const intervalo = setInterval(() => {
      progreso += 10;
      setProgresoBarajado(progreso);
      
      if (progreso >= 100) {
        clearInterval(intervalo);
        // Mezclar cartas aleatoriamente
        const cartasMezcladas = [...cartas].sort(() => Math.random() - 0.5);
        setCartasMazo(cartasMezcladas);
        setFase('seleccion_cartas');
      }
    }, 200);
  };

  const seleccionarCarta = (carta) => {
    if (cartasSeleccionadas.length < tipoTirada.cartas) {
      reproducirSonido(selectAudio.current);
      setCartasSeleccionadas([...cartasSeleccionadas, carta]);
      
      if (cartasSeleccionadas.length + 1 === tipoTirada.cartas) {
        setTimeout(() => {
          setFase('revelacion');
          revelarCartas();
        }, 1000);
      }
    }
  };

  const revelarCartas = () => {
    reproducirSonido(revealAudio.current);
    cartasSeleccionadas.forEach((carta, index) => {
      setTimeout(() => {
        setCartasReveladas(prev => [...prev, carta]);
      }, index * 1000);
    });
  };

  const reiniciarTirada = () => {
    setFase('bienvenida');
    setTipoTirada(null);
    setTemaTirada(null);
    setCartasMazo([]);
    setCartasSeleccionadas([]);
    setCartasReveladas([]);
    setProgresoBarajado(0);
    if (musicaFondo) {
      musicaFondo.pause();
      musicaFondo.currentTime = 0;
    }
  };

  const renderBienvenida = () => (
    <div className="tirada-bienvenida">
      <div className="bienvenida-header">
        <Star className="estrella-central" size={48} />
        <h2>Tirada Angelical</h2>
        <p>Conecta con la sabiduría de los ángeles</p>
      </div>
      
      <div className="bienvenida-contenido">
        <div className="mensaje-bienvenida">
          <h3>Bienvenido a tu consulta angelical</h3>
          <p>Los ángeles están aquí para guiarte con amor y sabiduría. Tómate un momento para centrarte, respira profundamente y permite que tu intuición te guíe hacia las cartas que tienen el mensaje perfecto para ti.</p>
        </div>
        
        <div className="preparacion">
          <h4>Preparación:</h4>
          <ul>
            <li>Encuentra un lugar tranquilo</li>
            <li>Respira profundamente tres veces</li>
            <li>Formula tu pregunta mentalmente</li>
            <li>Confía en tu intuición</li>
          </ul>
        </div>
      </div>
      
      <div className="bienvenida-acciones">
        <button className="btn-comenzar" onClick={iniciarTirada}>
          <Sparkles size={20} />
          Comenzar Tirada
        </button>
        
        <button className="btn-audio" onClick={toggleAudio}>
          {audioActivo ? <Volume2 size={20} /> : <VolumeX size={20} />}
          {audioActivo ? 'Silenciar' : 'Activar'} Audio
        </button>
      </div>
    </div>
  );

  const renderSeleccionTipo = () => (
    <div className="seleccion-tipo">
      <div className="header-seccion">
        <button className="btn-volver" onClick={() => setFase('bienvenida')}>
          <ChevronLeft size={20} />
          Volver
        </button>
        <h3>Selecciona el tipo de tirada</h3>
      </div>
      
      <div className="tipos-grid">
        {tiposTirada.map(tipo => (
          <div 
            key={tipo.id} 
            className="tipo-card"
            onClick={() => seleccionarTipo(tipo)}
          >
            <div className="tipo-header">
              <h4>{tipo.nombre}</h4>
              <span className="num-cartas">{tipo.cartas} carta{tipo.cartas > 1 ? 's' : ''}</span>
            </div>
            <p>{tipo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSeleccionTema = () => (
    <div className="seleccion-tema">
      <div className="header-seccion">
        <button className="btn-volver" onClick={() => setFase('seleccion_tipo')}>
          <ChevronLeft size={20} />
          Volver
        </button>
        <h3>¿Sobre qué quieres consultar?</h3>
        <p>Tipo seleccionado: <strong>{tipoTirada.nombre}</strong></p>
      </div>
      
      <div className="temas-grid">
        {temasTirada.map(tema => (
          <div 
            key={tema.id} 
            className="tema-card"
            onClick={() => seleccionarTema(tema)}
          >
            <h4>{tema.nombre}</h4>
            <p>{tema.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBarajando = () => (
    <div className="barajando">
      <div className="barajando-contenido">
        <Star className="estrella-barajando" size={64} />
        <h3>Barajando las cartas...</h3>
        <p>Los ángeles están preparando tu mensaje</p>
        
        <div className="progreso-barajado">
          <div className="barra-progreso">
            <div 
              className="progreso-fill"
              style={{ width: `${progresoBarajado}%` }}
            ></div>
          </div>
          <span>{progresoBarajado}%</span>
        </div>
        
        <div className="cartas-volando">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`carta-volando carta-${i}`}></div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSeleccionCartas = () => (
    <div className="seleccion-cartas">
      <div className="header-seleccion">
        <h3>Selecciona {tipoTirada.cartas} carta{tipoTirada.cartas > 1 ? 's' : ''}</h3>
        <p>Tema: <strong>{temaTirada.nombre}</strong></p>
        <div className="contador-cartas">
          Cartas seleccionadas: {cartasSeleccionadas.length}/{tipoTirada.cartas}
        </div>
      </div>
      
      <div className="mazo-cartas">
        {cartasMazo.slice(0, 9).map((carta, index) => (
          <div 
            key={`${carta.id}-${index}`}
            className={`carta-mazo ${cartasSeleccionadas.includes(carta) ? 'seleccionada' : ''}`}
            onClick={() => seleccionarCarta(carta)}
          >
            <div className="carta-reverso">
              <img src="/assets/cartas/carta-reverso.png" alt="Reverso de carta" />
            </div>
          </div>
        ))}
      </div>
      
      {cartasSeleccionadas.length === tipoTirada.cartas && (
        <div className="mensaje-completado">
          <p>¡Perfecto! Preparando tu lectura angelical...</p>
        </div>
      )}
    </div>
  );

  const renderRevelacion = () => (
    <div className="revelacion">
      <div className="header-revelacion">
        <h3>Tu Mensaje Angelical</h3>
        <p><strong>{tipoTirada.nombre}</strong> - {temaTirada.nombre}</p>
      </div>
      
      <div className="cartas-reveladas">
        {cartasReveladas.map((carta, index) => (
          <div key={carta.id} className="carta-revelada">
            <div className="carta-imagen">
              <img src={`/assets/cartas/carta${carta.id}.png`} alt={carta.titulo} />
            </div>
            <div className="carta-info">
              <h4>{carta.titulo}</h4>
              <p className="mensaje-principal">{carta.mensaje}</p>
              <p className="descripcion">{carta.descripcion}</p>
              <div className="consejo">
                <strong>Consejo angelical:</strong>
                <p>{carta.consejo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="acciones-revelacion">
        <button className="btn-nueva-tirada" onClick={reiniciarTirada}>
          <RefreshCw size={20} />
          Nueva Tirada
        </button>
      </div>
    </div>
  );

  return (
    <div className="tirada-angelical">
      {fase === 'bienvenida' && renderBienvenida()}
      {fase === 'seleccion_tipo' && renderSeleccionTipo()}
      {fase === 'seleccion_tema' && renderSeleccionTema()}
      {fase === 'barajando' && renderBarajando()}
      {fase === 'seleccion_cartas' && renderSeleccionCartas()}
      {fase === 'revelacion' && renderRevelacion()}
    </div>
  );
};

export default TiradaAngelical;
