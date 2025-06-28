import React, { useState, useEffect } from 'react';
import './MensajeDelDia.css';
import { MessageSquare, RefreshCw, Share2, Heart, Star } from 'lucide-react';

const mensajesAngelicales = [
  {
    id: 1,
    titulo: 'Confía en el Proceso Divino',
    mensaje: 'Hoy, los ángeles te recuerdan que confíes en el plan divino para tu vida. Aunque no veas el camino completo, cada paso te acerca a tu propósito. Suelta el control y permite que la sabiduría celestial te guíe.',
    arcangel: 'Arcángel Chamuel',
    color: '#FFC0CB' // Rosa
  },
  {
    id: 2,
    titulo: 'Recibe la Sanación',
    mensaje: 'El Arcángel Rafael te envuelve con su luz esmeralda, trayendo sanación a tu cuerpo, mente y espíritu. Permítete recibir esta energía restauradora y libera cualquier dolor o preocupación. Eres digno de bienestar.',
    arcangel: 'Arcángel Rafael',
    color: '#90EE90' // Verde claro
  },
  {
    id: 3,
    titulo: 'Activa tu Coraje',
    mensaje: 'El Arcángel Miguel está a tu lado, infundiéndote valentía para enfrentar cualquier desafío. No temas, su espada de luz disipa las sombras y te protege. Levántate con fuerza y defiende tu verdad.',
    arcangel: 'Arcángel Miguel',
    color: '#ADD8E6' // Azul claro
  },
  {
    id: 4,
    titulo: 'La Abundancia te Espera',
    mensaje: 'Uriel, el Arcángel de la abundancia, te recuerda que eres un ser ilimitado. Abre tus manos y tu corazón para recibir todas las bendiciones que el universo tiene para ti. La prosperidad fluye hacia ti sin esfuerzo.',
    arcangel: 'Arcángel Uriel',
    color: '#FFD700' // Dorado
  },
  {
    id: 5,
    titulo: 'Expresa tu Verdad',
    mensaje: 'Gabriel, el mensajero divino, te impulsa a comunicar tu verdad con amor y claridad. Tus palabras tienen poder. Habla desde el corazón y permite que tu voz sea un faro de inspiración para otros.',
    arcangel: 'Arcángel Gabriel',
    color: '#FFFFFF' // Blanco
  },
  {
    id: 6,
    titulo: 'Libera y Perdona',
    mensaje: 'Zadquiel, el Arcángel de la transmutación, te invita a liberar viejas cargas y perdonar. La llama violeta purifica tu ser, transformando el dolor en paz. Al perdonar, te liberas a ti mismo.',
    arcangel: 'Arcángel Zadquiel',
    color: '#EE82EE' // Violeta
  }
];

const MensajeDelDia = () => {
  const [mensajeActual, setMensajeActual] = useState(null);
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('mensajesFavoritos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    generarNuevoMensaje();
  }, []);

  useEffect(() => {
    localStorage.setItem('mensajesFavoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const generarNuevoMensaje = () => {
    const randomIndex = Math.floor(Math.random() * mensajesAngelicales.length);
    setMensajeActual(mensajesAngelicales[randomIndex]);
  };

  const toggleFavorito = () => {
    if (!mensajeActual) return;
    const isFavorito = favoritos.some(fav => fav.id === mensajeActual.id);
    if (isFavorito) {
      setFavoritos(favoritos.filter(fav => fav.id !== mensajeActual.id));
    } else {
      setFavoritos([...favoritos, mensajeActual]);
    }
  };

  const isMensajeFavorito = mensajeActual ? favoritos.some(fav => fav.id === mensajeActual.id) : false;

  const handleShare = () => {
    if (navigator.share && mensajeActual) {
      navigator.share({
        title: `Mensaje Angelical: ${mensajeActual.titulo}`,
        text: `Un mensaje inspirador del Arcángel ${mensajeActual.arcangel} para ti hoy: "${mensajeActual.mensaje}" #PlataformaAngelica #MensajeDelDia`,
        url: window.location.href,
      }).catch((error) => console.log('Error compartiendo', error));
    } else {
      alert('La función de compartir no está disponible en tu navegador.');
    }
  };

  return (
    <div className="mensaje-del-dia">
      <h2 className="titulo-seccion"><MessageSquare /> Mensaje del Día</h2>
      <p className="subtitulo-seccion">Recibe una guía angelical personalizada para tu jornada.</p>

      <div className="card-mensaje-dia">
        {mensajeActual ? (
          <>
            <div className="card-header" style={{ backgroundColor: mensajeActual.color }}>
              <Star className="icono-arcangel" />
              <h3>{mensajeActual.titulo}</h3>
            </div>
            <div className="card-body">
              <p className="mensaje-texto">{mensajeActual.mensaje}</p>
              <p className="arcangel-firma">~ {mensajeActual.arcangel}</p>
            </div>
            <div className="card-acciones">
              <button 
                className={`btn-accion ${isMensajeFavorito ? 'favorito' : ''}`}
                onClick={toggleFavorito}
              >
                <Heart size={20} fill={isMensajeFavorito ? 'currentColor' : 'none'} />
                {isMensajeFavorito ? 'En Favoritos' : 'Añadir a Favoritos'}
              </button>
              <button className="btn-accion" onClick={handleShare}>
                <Share2 size={20} />
                Compartir
              </button>
              <button className="btn-accion" onClick={generarNuevoMensaje}>
                <RefreshCw size={20} />
                Nuevo Mensaje
              </button>
            </div>
          </>
        ) : (
          <p>Cargando tu mensaje angelical...</p>
        )}
      </div>

      {favoritos.length > 0 && (
        <div className="seccion-favoritos">
          <h3><Heart /> Tus Mensajes Favoritos</h3>
          <div className="lista-favoritos">
            {favoritos.map(fav => (
              <div key={fav.id} className="card-favorito">
                <div className="card-header-fav" style={{ backgroundColor: fav.color }}>
                  <h4>{fav.titulo}</h4>
                </div>
                <p className="mensaje-texto-fav">{fav.mensaje}</p>
                <p className="arcangel-firma-fav">~ {fav.arcangel}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MensajeDelDia;
