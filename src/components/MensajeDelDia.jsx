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
    { mensaje: "La justicia divina trabaja a tu favor. Confía en que el universo conspira para tu mayor bien.", arcangel: "Arcángel Raguel", energia: "Justicia Divina" }
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
      
      <div style={{
        background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 25%, #9370db 50%, #ba55d3 75%, #6a0dad 100%)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        boxShadow: '0 10px 30px rgba(106, 13, 173, 0.3)',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Fecha */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>✨</span>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}>
            {mensajeDelDia.fecha}
          </span>
        </div>
        
        {/* Mensaje */}
        <div style={{
          textAlign: 'center',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0'
        }}>
          <p style={{
            fontSize: '1.4rem',
            lineHeight: 1.6,
            fontStyle: 'italic',
            margin: 0,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            "{mensajeDelDia.mensaje}"
          </p>
        </div>
        
        {/* Arcángel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '5px'
            }}>
              - {mensajeDelDia.arcangel}
            </div>
            <div style={{
              fontSize: '1rem',
              color: 'rgba(255, 215, 0, 0.9)',
              fontWeight: 500
            }}>
              {mensajeDelDia.energia}
            </div>
          </div>
          
          <button style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            color: '#6a0dad',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
            transition: 'transform 0.2s ease'
          }}>
            <span>🧘‍♀️</span>
            <span>Meditar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MensajeDelDia;

