import React from 'react';

const MensajeDelDia = () => {
  // Sistema de mensajes diarios con rotación automática
  const mensajesAngelicales = [
    { mensaje: "Tu luz interior brilla más fuerte cada día. Los ángeles amplifican tu radiancia espiritual.", arcangel: "Arcángel Miguel", energia: "Protección y Fuerza" },
    { mensaje: "Encuentra la belleza en cada momento. Los ángeles te invitan a celebrar la alegría que existe en tu vida.", arcangel: "Arcángel Gabriel", energia: "Comunicación Divina" },
    { mensaje: "La sanación fluye a través de ti como un río de luz dorada. Permite que tu corazón se abra a nuevas posibilidades.", arcangel: "Arcángel Rafael", energia: "Sanación y Renovación" },
    { mensaje: "Tu sabiduría interior es un faro que guía a otros hacia la luz. Confía en tu intuición angelical.", arcangel: "Arcángel Uriel", energia: "Sabiduría y Claridad" },
    { mensaje: "El amor incondicional fluye desde tu corazón hacia todo lo que te rodea. Eres un canal de amor divino.", arcangel: "Arcángel Chamuel", energia: "Amor Incondicional" },
    { mensaje: "La creatividad divina se manifiesta a través de tus acciones. Cada paso que das crea belleza en el mundo.", arcangel: "Arcángel Jofiel", energia: "Belleza y Creatividad" },
    { mensaje: "La justicia divina trabaja a tu favor. Confía en que el universo conspira para tu mayor bien.", arcangel: "Arcángel Raguel", energia: "Justicia Divina" },
    { mensaje: "La abundancia del universo fluye hacia ti en formas inesperadas. Abre tu corazón para recibirla.", arcangel: "Arcángel Ariel", energia: "Abundancia Natural" },
    { mensaje: "Tu conexión con lo divino se fortalece cada día. Eres un puente entre el cielo y la tierra.", arcangel: "Arcángel Metatrón", energia: "Conexión Divina" },
    { mensaje: "La compasión que muestras hacia otros regresa a ti multiplicada. Eres un instrumento de misericordia divina.", arcangel: "Arcángel Zadkiel", energia: "Compasión y Perdón" },
    { mensaje: "Tu intuición femenina es un regalo sagrado. Honra la sabiduría que fluye desde tu alma.", arcangel: "Arcángel Haniel", energia: "Intuición Femenina" },
    { mensaje: "Los misterios del universo se revelan gradualmente ante ti. Tu alma está lista para recibir conocimiento sagrado.", arcangel: "Arcángel Raziel", energia: "Misterios Divinos" },
    { mensaje: "Tus oraciones son escuchadas y respondidas de maneras perfectas. Mantén la fe en el plan divino.", arcangel: "Arcángel Sandalfón", energia: "Oraciones Elevadas" },
    { mensaje: "Los sueños que tienes contienen mensajes angelicales. Presta atención a las señales que recibes durante el descanso.", arcangel: "Arcángel Jeremiel", energia: "Sueños Proféticos" },
    { mensaje: "Cada final es un nuevo comienzo disfrazado. Los ángeles te guían a través de todas las transiciones.", arcangel: "Arcángel Azrael", energia: "Transformación" },
    { mensaje: "Tu coraje interior es inquebrantable. Enfrentas cada desafío con la fuerza de mil ángeles a tu lado.", arcangel: "Arcángel Camael", energia: "Coraje Divino" },
    { mensaje: "La paciencia que cultivas te lleva a la maestría espiritual. Cada momento de espera es una oportunidad de crecimiento.", arcangel: "Arcángel Cassiel", energia: "Paciencia Celestial" },
    { mensaje: "Las bendiciones llueven sobre tu vida como pétalos de flores celestiales. Reconoce la gracia que te rodea.", arcangel: "Arcángel Barachiel", energia: "Bendiciones Divinas" },
    { mensaje: "Tu devoción espiritual es un faro de luz en el mundo. Inspiras a otros a buscar su propia conexión divina.", arcangel: "Arcángel Selaphiel", energia: "Devoción Sagrada" },
    { mensaje: "La esperanza que mantienes en tu corazón ilumina el camino para otros. Eres un portador de luz divina.", arcangel: "Arcángel Remiel", energia: "Esperanza Eterna" },
    { mensaje: "Tu conexión con la naturaleza te revela secretos antiguos. Los elementos te susurran sabiduría ancestral.", arcangel: "Arcángel Muriel", energia: "Sabiduría Natural" },
    { mensaje: "La belleza que creas en el mundo es un reflejo de tu alma divina. Cada acto creativo es una oración.", arcangel: "Arcángel Iofiel", energia: "Belleza Creativa" },
    { mensaje: "Tu propósito de vida se revela a través de las pasiones que encienden tu corazón. Sigue lo que te inspira.", arcangel: "Arcángel Nathaniel", energia: "Propósito Divino" },
    { mensaje: "Los milagros son eventos naturales cuando vives alineado con tu verdad espiritual. Espera lo extraordinario.", arcangel: "Arcángel Amitiel", energia: "Milagros Cotidianos" },
    { mensaje: "Tu fuerza espiritual crece con cada acto de bondad que realizas. Eres más poderoso de lo que imaginas.", arcangel: "Arcángel Uzziel", energia: "Fuerza Espiritual" },
    { mensaje: "El amor que irradias transforma todo lo que tocas. Eres un alquimista del corazón.", arcangel: "Arcángel Anael", energia: "Alquimia del Amor" },
    { mensaje: "La prosperidad fluye hacia ti cuando vives en gratitud y generosidad. Eres un imán para la abundancia.", arcangel: "Arcángel Sachiel", energia: "Prosperidad Divina" },
    { mensaje: "Los secretos del cosmos se revelan a través de tu meditación profunda. Tu alma conoce verdades eternas.", arcangel: "Arcángel Raziel", energia: "Conocimiento Cósmico" },
    { mensaje: "Tu presencia angelical bendice a todos los que te rodean. Eres un regalo del cielo en la tierra.", arcangel: "Arcángel Miguel", energia: "Presencia Divina" },
    { mensaje: "La música de las esferas resuena en tu corazón. Escucha la sinfonía celestial que guía tu camino.", arcangel: "Arcángel Gabriel", energia: "Armonía Celestial" },
    { mensaje: "Cada respiración que tomas es un acto sagrado de conexión con lo divino. Respira conscientemente.", arcangel: "Arcángel Rafael", energia: "Respiración Sagrada" }
  ];

  const obtenerMensajeDelDia = () => {
    const hoy = new Date();
    const inicioAño = new Date(hoy.getFullYear(), 0, 1);
    const diaDelAño = Math.floor((hoy - inicioAño) / (24 * 60 * 60 * 1000));
    const indiceMensaje = diaDelAño % mensajesAngelicales.length;
    
    const opcionesFecha = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return {
      fecha: hoy.toLocaleDateString('es-ES', opcionesFecha),
      ...mensajesAngelicales[indiceMensaje]
    };
  };

  const mensajeDelDia = obtenerMensajeDelDia();

  const containerStyle = {
    position: 'relative',
    height: '450px',
    borderRadius: '30px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 25%, #9370db 50%, #ba55d3 75%, #6a0dad 100%)',
    boxShadow: '0 25px 80px rgba(106, 13, 173, 0.6), 0 15px 40px rgba(138, 43, 226, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    margin: '20px 0'
  };

  const angelBackgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundImage: 'url(/angel-mensaje.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(1.4) contrast(1.2) saturate(1.1) hue-rotate(15deg)',
    opacity: 0.6
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(106, 13, 173, 0.8) 0%, rgba(138, 43, 226, 0.6) 25%, rgba(147, 112, 219, 0.4) 50%, rgba(186, 85, 211, 0.6) 75%, rgba(106, 13, 173, 0.8) 100%)',
    backdropFilter: 'blur(2px)',
    zIndex: 2
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 4,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    margin: '20px',
    borderRadius: '25px',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.4)'
  };

  const fechaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '25px'
  };

  const fechaTextoStyle = {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '1.4rem',
    fontWeight: 700,
    fontFamily: 'Playfair Display, serif',
    textTransform: 'capitalize',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
    letterSpacing: '1px'
  };

  const mensajeTextoStyle = {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '30px 0'
  };

  const comillaStyle = {
    position: 'absolute',
    fontSize: '5rem',
    fontFamily: 'Playfair Display, serif',
    fontWeight: 900,
    color: 'rgba(255, 215, 0, 0.9)',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.6)'
  };

  const textoStyle = {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '1.6rem',
    lineHeight: 1.8,
    fontWeight: 500,
    fontStyle: 'italic',
    fontFamily: 'Inter, sans-serif',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.2)',
    padding: '30px 50px',
    margin: 0,
    position: 'relative',
    zIndex: 1
  };

  const arcangelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '25px',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const arcangelNombreStyle = {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '1.5rem',
    fontWeight: 800,
    fontFamily: 'Playfair Display, serif',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
    letterSpacing: '1px'
  };

  const energiaStyle = {
    color: 'rgba(255, 215, 0, 0.95)',
    fontSize: '1.1rem',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
  };

  const botonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95) 0%, rgba(255, 193, 7, 0.9) 50%, rgba(255, 215, 0, 0.95) 100%)',
    color: 'rgba(106, 13, 173, 0.9)',
    border: 'none',
    borderRadius: '30px',
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 700,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3 style={{ 
        color: '#6a0dad', 
        fontSize: '1.8rem', 
        fontWeight: 700, 
        fontFamily: 'Playfair Display, serif',
        marginBottom: '20px',
        textAlign: 'left'
      }}>
        Mensaje del Día
      </h3>
      
      <div style={containerStyle}>
        {/* Fondo del ángel */}
        <div style={angelBackgroundStyle}></div>
        
        {/* Overlay */}
        <div style={overlayStyle}></div>
        
        {/* Efectos de partículas */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none'
        }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${15 + i * 15}%`,
                left: `${20 + i * 15}%`,
                width: '6px',
                height: '6px',
                background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 255, 255, 0.8) 100%)',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
                animation: `particula-float-${i} 6s ease-in-out infinite`
              }}
            />
          ))}
        </div>
        
        {/* Contenido */}
        <div style={contentStyle}>
          {/* Fecha */}
          <div style={fechaStyle}>
            <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}>✨</span>
            <span style={fechaTextoStyle}>{mensajeDelDia.fecha}</span>
          </div>
          
          {/* Mensaje */}
          <div style={mensajeTextoStyle}>
            <div style={{ ...comillaStyle, top: '-30px', left: '-20px' }}>"</div>
            <p style={textoStyle}>{mensajeDelDia.mensaje}</p>
            <div style={{ ...comillaStyle, bottom: '-50px', right: '-20px' }}>"</div>
          </div>
          
          {/* Arcángel */}
          <div style={arcangelStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={arcangelNombreStyle}>- {mensajeDelDia.arcangel}</span>
              <span style={energiaStyle}>{mensajeDelDia.energia}</span>
            </div>
            <button style={botonStyle}>
              <span style={{ fontSize: '1.4rem' }}>🧘‍♀️</span>
              <span>Meditar</span>
            </button>
          </div>
        </div>
        
        {/* Bordes decorativos */}
        {[
          { top: '20px', left: '20px', borderRight: 'none', borderBottom: 'none', borderRadius: '15px 0 0 0' },
          { top: '20px', right: '20px', borderLeft: 'none', borderBottom: 'none', borderRadius: '0 15px 0 0' },
          { bottom: '20px', left: '20px', borderRight: 'none', borderTop: 'none', borderRadius: '0 0 0 15px' },
          { bottom: '20px', right: '20px', borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 15px 0' }
        ].map((corner, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...corner,
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 215, 0, 0.8)',
              zIndex: 5,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes particula-float-0 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
        @keyframes particula-float-1 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(1.3); opacity: 1; }
        }
        @keyframes particula-float-2 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-25px) scale(1.4); opacity: 1; }
        }
        @keyframes particula-float-3 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-18px) scale(1.2); opacity: 1; }
        }
        @keyframes particula-float-4 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-22px) scale(1.6); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MensajeDelDia;

