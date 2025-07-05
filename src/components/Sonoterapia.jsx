import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Download, Star, Lock, ShoppingCart, AlertTriangle } from 'lucide-react';

// Función para validar URL de audio
const isValidAudioUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }
    // Verificar si es una URL de Dropbox con formato correcto
    if (url.includes("dropbox.com")) {
      return url.includes("?raw=1");
    }
    // If it's not a Dropbox URL, check for common audio extensions
    const validExtensions = [".mp3", ".m4a", ".wav", ".ogg"];
    return validExtensions.some(ext => parsedUrl.pathname.toLowerCase().endsWith(ext));
  } catch (e) {
    console.error("URL inválida:", url, e);
    return false;
  }
};

const Sonoterapia = ({ onVolver }) => {
  const [categoriaActiva, setCategoriaActiva] = useState('frecuencias');
  const [audioActual, setAudioActual] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [volumen, setVolumen] = useState(0.7);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [mostrarPremium, setMostrarPremium] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [audioError, setAudioError] = useState(null);
  const [cargandoAudio, setCargandoAudio] = useState(false);
  const audioRef = useRef(null);

  const categorias = {
    frecuencias: {
      titulo: "Frecuencias Sagradas",
      icono: "🎵",
      color: "from-purple-500 to-pink-500",
      audios: [
        {
          id: 1,
          titulo: "432Hz - Frecuencia del Amor",
          descripcion: "Armoniza el corazón y equilibra las emociones",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: false,
          precio: null,
          beneficios: ["Reduce estrés", "Equilibra emociones", "Armoniza chakras"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Ejemplo de URL válida
        },
        {
          id: 2,
          titulo: "528Hz - Frecuencia de la Sanación",
          descripcion: "Repara el ADN y sana a nivel celular",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Sanación celular", "Reparación ADN", "Transformación"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // Ejemplo de URL válida
        },
        {
          id: 3,
          titulo: "741Hz - Frecuencia de la Limpieza",
          descripcion: "Limpia toxinas y purifica el aura",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Limpieza energética", "Purificación", "Claridad mental"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        }
      ]
    },
    concentracion: {
      titulo: "Concentración y Estudio",
      icono: "🧠",
      color: "from-blue-500 to-cyan-500",
      audios: [
        {
          id: 4,
          titulo: "Focus Deep - Concentración Profunda",
          descripcion: "Ondas binaurales para máximo enfoque",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Concentración extrema", "Productividad", "Claridad mental"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        },
      ]
    },
    // ... (resto de categorías como estaban)
     relajacion: {
      titulo: "Relajación Profunda",
      icono: "🌊",
      color: "from-green-500 to-teal-500",
      audios: [
        {
          id: 7,
          titulo: "Ocean Dreams - Sueños del Océano",
          descripcion: "Sonidos del mar con frecuencias relajantes",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Relajación profunda", "Reducción ansiedad", "Paz interior"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
        },
      ]
    },
    meditacion: {
      titulo: "Meditación Guiada",
      icono: "🧘",
      color: "from-indigo-500 to-purple-500",
      audios: [
        {
          id: 9,
          titulo: "Chakra Alignment - Alineación de Chakras",
          descripcion: "Meditación guiada para equilibrar chakras",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Equilibrio energético", "Alineación chakras", "Armonía"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
        },
      ]
    },
    sanacion: {
      titulo: "Sanación Emocional",
      icono: "💖",
      color: "from-pink-500 to-red-500",
      audios: [
        {
          id: 11,
          titulo: "Heart Healing - Sanación del Corazón",
          descripcion: "Frecuencias para sanar heridas emocionales",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Sanación emocional", "Liberación de trauma", "Amor propio"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
        },
      ]
    },
    sueno: {
      titulo: "Sueño Reparador",
      icono: "😴",
      color: "from-blue-800 to-indigo-900",
      audios: [
        {
          id: 13,
          titulo: "Deep Sleep - Sueño Profundo",
          descripcion: "Ondas delta para un sueño reparador",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Sueño profundo", "Descanso total", "Regeneración"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        },
      ]
    },
    limpieza: {
      titulo: "Limpieza Energética",
      icono: "✨",
      color: "from-teal-500 to-green-500",
      audios: [
        {
          id: 15,
          titulo: "Aura Cleansing - Limpieza de Aura",
          descripcion: "Frecuencias para limpiar tu campo energético",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Limpieza áurica", "Protección energética", "Purificación"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
        },
      ]
    },
    chakras: {
      titulo: "Activación de Chakras",
      icono: "🌀",
      color: "from-purple-600 to-indigo-600",
      audios: [
        {
          id: 17,
          titulo: "Root Chakra - Chakra Raíz",
          descripcion: "Frecuencia 396Hz para el primer chakra",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Seguridad", "Estabilidad", "Conexión a tierra"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
        },
      ]
    },
    manifestacion: {
      titulo: "Manifestación y Abundancia",
      icono: "💫",
      color: "from-yellow-500 to-amber-500",
      audios: [
        {
          id: 19,
          titulo: "Abundance Code - Código de Abundancia",
          descripcion: "Frecuencias para atraer prosperidad",
          duracion: "3:00",
          duracionCompleta: "8:00:00",
          premium: true,
          precio: 5.99,
          beneficios: ["Atracción de abundancia", "Prosperidad", "Flujo financiero"],
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
        },
      ]
    }
  };

  const reproducirAudio = (audio) => {
    setAudioError(null);
    if (audioActual?.id === audio.id && reproduciendo) {
      pausarAudio();
      return;
    }

    if (audio.premium && !audio.comprado) {
      setMostrarPremium(true);
      setAudioActual(audio);
      return;
    }

    if (!isValidAudioUrl(audio.url)) {
      setAudioError("Audio no disponible temporalmente. La URL no es válida o no es accesible.");
      setAudioActual(audio);
      setReproduciendo(false);
      setProgreso(0);
      setTiempoActual(0);
      setDuracion(0);
      return;
    }

    if (timerInterval) clearInterval(timerInterval);

    setAudioActual(audio);
    setCargandoAudio(true);
    setReproduciendo(false);
    setTiempoActual(0);
    setProgreso(0);
    setDuracion(0); // Reset duration before loading new audio

    if (audioRef.current) {
      audioRef.current.src = audio.url;
      audioRef.current.volume = volumen;
      audioRef.current.load(); // Explicitly load the audio

      audioRef.current.play()
        .then(() => {
          // Playback started successfully
        })
        .catch(error => {
          console.error("Error al intentar reproducir audio:", error);
          setCargandoAudio(false);
          setAudioError("No se pudo reproducir el audio. Intenta nuevamente.");
        });
    }
  };

  const pausarAudio = () => {
    setReproduciendo(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (timerInterval) clearInterval(timerInterval);
  };

  const cambiarVolumen = (nuevoVolumen) => {
    setVolumen(nuevoVolumen);
    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen;
    }
  };

  const formatearTiempo = (segundos) => {
    if (isNaN(segundos) || !isFinite(segundos) || segundos < 0) {
      return "0:00";
    }
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const comprarPremium = (audio) => {
    alert(`¡Compraste ${audio.titulo} por $${audio.precio}! 🎉`);
    setMostrarPremium(false);
    const audioComprado = {...audio, comprado: true};
    // Update the audio in the main list to reflect purchase (simplified)
    const updatedCategorias = JSON.parse(JSON.stringify(categorias));
    const categoriaKey = Object.keys(updatedCategorias).find(key => 
        updatedCategorias[key].audios.some(a => a.id === audio.id)
    );
    if (categoriaKey) {
        const audioIndex = updatedCategorias[categoriaKey].audios.findIndex(a => a.id === audio.id);
        if (audioIndex !== -1) {
            updatedCategorias[categoriaKey].audios[audioIndex].comprado = true;
        }
    }
    // Note: This local update won't persist. In a real app, this would be a state update.
    setAudioActual(audioComprado);
    setTimeout(() => reproducirAudio(audioComprado), 500);
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handleLoadedMetadata = () => {
      const newDuracion = audioEl.duration;
      if (!isNaN(newDuracion) && isFinite(newDuracion)) {
        setDuracion(newDuracion);
        setCargandoAudio(false);
        setReproduciendo(true); // Autoplay if successfully loaded
        const interval = setInterval(() => {
          if (audioEl.paused || audioEl.ended) {
            clearInterval(interval);
            setReproduciendo(false);
            if(audioEl.ended) setProgreso(100);
            return;
          }
          setTiempoActual(audioEl.currentTime);
          setProgreso((audioEl.currentTime / audioEl.duration) * 100);
        }, 1000);
        setTimerInterval(interval);
      } else {
        setDuracion(0);
        setCargandoAudio(false);
        setAudioError("No se pudo cargar la duración del audio.");
      }
    };

    const handleError = (e) => {
      console.error("Error en elemento de audio:", e);
      setCargandoAudio(false);
      setAudioError("Error al cargar el audio. Verifica el formato o la URL.");
      setDuracion(0);
      setTiempoActual(0);
      setProgreso(0);
      setReproduciendo(false);
    };

    const handleCanPlay = () => {
        // If play() was called before metadata, it might have failed.
        // Try playing again if it's the current audio and not already playing.
        if (audioActual && audioEl.src === audioActual.url && !reproduciendo && !audioEl.paused) {
            audioEl.play().catch(handleError);
        }
    };

    audioEl.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioEl.addEventListener('error', handleError);
    audioEl.addEventListener('canplay', handleCanPlay);
    audioEl.addEventListener('ended', () => {
        setReproduciendo(false);
        setTiempoActual(duracion);
        setProgreso(100);
        if(timerInterval) clearInterval(timerInterval);
    });

    return () => {
      audioEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioEl.removeEventListener('error', handleError);
      audioEl.removeEventListener('canplay', handleCanPlay);
      audioEl.removeEventListener('ended', () => {});
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [audioActual, reproduciendo, duracion]); // Added reproduciendo and duracion to dependencies

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <audio ref={audioRef} />
      
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onVolver}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              ← Volver al Dashboard
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                🎵 Canalizaciones y Sonoterapia
              </h1>
              <p className="text-gray-600">Frecuencias sagradas para tu bienestar</p>
            </div>
            <div className="w-32"></div> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-4 justify-center mb-8 categoria-filtros overflow-x-auto pb-2">
          {Object.entries(categorias).map(([key, categoria]) => (
            <button
              key={key}
              onClick={() => setCategoriaActiva(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                categoriaActiva === key
                  ? `bg-gradient-to-r ${categoria.color} text-white shadow-lg scale-105`
                  : 'bg-white/70 text-gray-700 hover:bg-white/90 hover:scale-102'
              }`}
            >
              {categoria.icono} {categoria.titulo}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias[categoriaActiva].audios.map((audio) => (
            <div
              key={audio.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`h-3 bg-gradient-to-r ${categorias[categoriaActiva].color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{audio.titulo}</h3>
                  {audio.premium && !audio.comprado && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{audio.descripcion}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {audio.beneficios.map((beneficio, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                    >
                      {beneficio}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  {audio.premium && !audio.comprado ? (
                    <div className="flex flex-col items-start">
                      <span className="text-gray-500 text-xs">Muestra: {audio.duracion}</span>
                      <span className="text-gray-500 text-xs">Completo: {audio.duracionCompleta}</span>
                      <span className="text-2xl font-bold text-green-600 mt-2">${audio.precio} USD</span>
                    </div>
                  ) : (
                    <span className="text-green-600 font-semibold">✓ Gratis Completo</span>
                  )}

                  {audio.premium && !audio.comprado ? (
                    <button
                      onClick={() => comprarPremium(audio)}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <ShoppingCart className="inline-block mr-2" size={20} />Comprar Completo
                    </button>
                  ) : (
                    <button
                      onClick={() => reproducirAudio(audio)}
                      className={`bg-gradient-to-r ${audioActual?.id === audio.id && reproduciendo ? 'from-red-500 to-red-600' : 'from-purple-500 to-blue-600'} text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 ${!isValidAudioUrl(audio.url) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!isValidAudioUrl(audio.url)}
                    >
                      {audioActual?.id === audio.id && reproduciendo ? (
                        <Pause className="inline-block mr-2" size={20} />
                      ) : (
                        <Play className="inline-block mr-2" size={20} />
                      )}
                      {audioActual?.id === audio.id && reproduciendo ? 'Pausar' : 'Reproducir'}
                    </button>
                  )}
                </div>

                {audioError && audioActual?.id === audio.id && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <AlertTriangle className="inline-block mr-2" size={20} />
                    <span className="block sm:inline">{audioError}</span>
                  </div>
                )}

                {cargandoAudio && audioActual?.id === audio.id && (
                  <div className="text-center text-purple-600 mt-4">
                    Cargando audio...
                  </div>
                )}

                {audioActual?.id === audio.id && (
                  <div className="mt-6">
                    <div className="flex items-center gap-4">
                      <button onClick={() => reproducirAudio(audio)} className="text-purple-600 hover:text-purple-800">
                        {reproduciendo ? <Pause size={28} /> : <Play size={28} />}
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${progreso}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600 text-sm">
                        {formatearTiempo(tiempoActual)} / {formatearTiempo(duracion)}
                      </span>
                      <Volume2 size={20} className="text-gray-600" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volumen}
                        onChange={(e) => cambiarVolumen(parseFloat(e.target.value))}
                        className="w-24"
                      />
                      <button onClick={() => window.open(audio.url, '_blank')} className="text-purple-600 hover:text-purple-800">
                        <Download size={20} />
                      </button>
                    </div>
                    {audio.premium && !audio.comprado && (
                      <p className="text-center text-gray-500 text-sm mt-2">
                        Has escuchado {formatearTiempo(tiempoActual)} de {formatearTiempo(audio.duracion)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sonoterapia;


