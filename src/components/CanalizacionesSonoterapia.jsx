import React, { useState, useRef, useEffect } from 'react';
import './CanalizacionesSonoterapia.css';
import { Play, Pause, Volume2, VolumeX, FastForward, Rewind, Heart, MessageSquare, Music } from 'lucide-react';

const canalizaciones = [
  {
    id: 1,
    titulo: 'Mensaje del Arcángel Miguel: Protección Divina',
    descripcion: 'Una canalización para invocar la protección y el coraje del Arcángel Miguel. Ideal para momentos de incertidumbre o cuando necesitas fuerza.',
    audio: '/assets/audio/canalizacion_miguel.mp3',
    duracion: '15:30',
    imagen: '/assets/canalizaciones/miguel.jpg'
  },
  {
    id: 2,
    titulo: 'Sonoterapia: Armonización con Cuencos Tibetanos',
    descripcion: 'Sesión de sonoterapia con cuencos tibetanos para equilibrar tus chakras y relajar tu mente. Perfecta para meditar o antes de dormir.',
    audio: '/assets/audio/sonoterapia_cuencos.mp3',
    duracion: '20:00',
    imagen: '/assets/canalizaciones/cuencos.jpg'
  },
  {
    id: 3,
    titulo: 'Canalización: Conexión con tu Ángel Guardián',
    descripcion: 'Aprende a sentir la presencia de tu ángel guardián y recibe mensajes personales de amor y guía. Una experiencia profunda y reconfortante.',
    audio: '/assets/audio/canalizacion_guardian.mp3',
    duracion: '18:00',
    imagen: '/assets/canalizaciones/guardian.jpg'
  },
  {
    id: 4,
    titulo: 'Sonoterapia: Frecuencia 528Hz para la Sanación',
    descripcion: 'Música con la frecuencia del amor y la reparación del ADN. Ayuda a liberar bloqueos y promover la sanación a nivel celular.',
    audio: '/assets/audio/sonoterapia_528hz.mp3',
    duracion: '25:00',
    imagen: '/assets/canalizaciones/528hz.jpg'
  },
  {
    id: 5,
    titulo: 'Mensaje del Arcángel Rafael: Sanación Emocional',
    descripcion: 'Una guía para liberar cargas emocionales y sanar heridas del pasado con la ayuda del Arcángel Rafael. Enfócate en el perdón y la compasión.',
    audio: '/assets/audio/canalizacion_rafael.mp3',
    duracion: '17:00',
    imagen: '/assets/canalizaciones/rafael.jpg'
  },
  {
    id: 6,
    titulo: 'Sonoterapia: Relajación Profunda con Ondas Alpha',
    descripcion: 'Sesión diseñada para inducir un estado de relajación profunda, ideal para reducir el estrés y mejorar la calidad del sueño.',
    audio: '/assets/audio/sonoterapia_alpha.mp3',
    duracion: '30:00',
    imagen: '/assets/canalizaciones/alpha.jpg'
  },
];

const CanalizacionesSonoterapia = () => {
  const [audioActual, setAudioActual] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playAudio = (canalizacion) => {
    if (audioActual && audioActual.id === canalizacion.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.src = canalizacion.audio;
      audioRef.current.play();
      setIsPlaying(true);
      setAudioActual(canalizacion);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="canalizaciones-sonoterapia">
      <h2 className="titulo-seccion"><MessageSquare /> Canalizaciones y Sonoterapia</h2>
      <p className="subtitulo-seccion">Conecta con mensajes divinos y frecuencias de sanación.</p>

      <div className="lista-canalizaciones">
        {canalizaciones.map((item) => (
          <div key={item.id} className="card-canalizacion">
            <img src={item.imagen} alt={item.titulo} className="imagen-canalizacion" />
            <div className="info-canalizacion">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
              <div className="duracion">Duración: {item.duracion}</div>
              <button 
                className={`btn-play-card ${audioActual?.id === item.id && isPlaying ? 'playing' : ''}`}
                onClick={() => playAudio(item)}
              >
                {audioActual?.id === item.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {audioActual?.id === item.id && isPlaying ? 'Pausar' : 'Escuchar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {audioActual && (
        <div className="reproductor-flotante">
          <div className="info-reproductor">
            <Music size={20} />
            <span>Reproduciendo: {audioActual.titulo}</span>
          </div>
          <div className="controles-reproductor">
            <button onClick={togglePlayPause} className="btn-control">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <input 
              type="range" 
              min="0" 
              max={duration} 
              value={currentTime} 
              onChange={handleSeek}
              className="progreso-audio"
            />
            <span className="tiempo-audio">{formatTime(currentTime)} / {formatTime(duration)}</span>
            <Volume2 size={20} />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volumen-audio"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CanalizacionesSonoterapia;
