import React, { useState } from 'react';
import './AcademiaAngelical.css';
import { BookOpen, Award, User, Star, ChevronRight, CheckCircle } from 'lucide-react';

const cursos = [
  {
    id: 1,
    titulo: 'Introducción al Mundo Angélico',
    descripcion: 'Descubre quiénes son los ángeles, su jerarquía y cómo se comunican con nosotros. Un punto de partida esencial.',
    nivel: 'Principiante',
    modulos: 5,
    duracion: '4 semanas',
    imagen: '/assets/academia/introduccion.jpg',
    contenido: [
      'Módulo 1: ¿Qué son los Ángeles?',
      'Módulo 2: Jerarquías Angelicales',
      'Módulo 3: Cómo Escuchar a tus Ángeles',
      'Módulo 4: Oraciones y Decretos Angelicales',
      'Módulo 5: Creando tu Espacio Sagrado'
    ]
  },
  {
    id: 2,
    titulo: 'Conectando con tu Ángel Guardián',
    descripcion: 'Aprende a establecer una conexión profunda y personal con tu ángel guardián para recibir guía y apoyo diario.',
    nivel: 'Principiante',
    modulos: 4,
    duracion: '3 semanas',
    imagen: '/assets/academia/guardian.jpg',
    contenido: [
      'Módulo 1: Identificando a tu Ángel Guardián',
      'Módulo 2: Meditaciones para la Conexión',
      'Módulo 3: Señales y Sincronicidades',
      'Módulo 4: Peticiones y Agradecimientos'
    ]
  },
  {
    id: 3,
    titulo: 'Arcángeles y sus Funciones',
    descripcion: 'Explora a los Arcángeles más influyentes, sus atributos, colores y cómo invocarlos para diferentes propósitos en tu vida.',
    nivel: 'Intermedio',
    modulos: 7,
    duracion: '6 semanas',
    imagen: '/assets/academia/arcangeles.jpg',
    contenido: [
      'Módulo 1: Arcángel Miguel (Protección)',
      'Módulo 2: Arcángel Rafael (Sanación)',
      'Módulo 3: Arcángel Gabriel (Comunicación)',
      'Módulo 4: Arcángel Uriel (Sabiduría)',
      'Módulo 5: Arcángel Chamuel (Amor)',
      'Módulo 6: Arcángel Jofiel (Belleza)',
      'Módulo 7: Otros Arcángeles Importantes'
    ]
  },
  {
    id: 4,
    titulo: 'Terapia Angélica: Sanación y Liberación',
    descripcion: 'Un curso avanzado para aprender técnicas de sanación energética con la ayuda de los ángeles, tanto para ti como para otros.',
    nivel: 'Avanzado',
    modulos: 6,
    duracion: '8 semanas',
    imagen: '/assets/academia/terapia.jpg',
    contenido: [
      'Módulo 1: Principios de la Sanación Angélica',
      'Módulo 2: Limpieza de Chakras con Ángeles',
      'Módulo 3: Corte de Lazos Energéticos',
      'Módulo 4: Sanación de Linaje Familiar',
      'Módulo 5: Protección y Sellado Energético',
      'Módulo 6: Ética y Práctica Profesional'
    ]
  },
  {
    id: 5,
    titulo: 'Desarrollo de la Clarividencia Angélica',
    descripcion: 'Potencia tus dones psíquicos y aprende a ver, sentir y escuchar a los ángeles de forma más clara y consciente.',
    nivel: 'Avanzado',
    modulos: 5,
    duracion: '7 semanas',
    imagen: '/assets/academia/clarividencia.jpg',
    contenido: [
      'Módulo 1: Activación del Tercer Ojo',
      'Módulo 2: Meditación para la Clarividencia',
      'Módulo 3: Interpretación de Símbolos y Visiones',
      'Módulo 4: Protección Psíquica',
      'Módulo 5: Práctica y Desarrollo Continuo'
    ]
  }
];

const AcademiaAngelical = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const handleSeleccionarCurso = (curso) => {
    setCursoSeleccionado(curso);
  };

  const handleCerrarDetalle = () => {
    setCursoSeleccionado(null);
  };

  return (
    <div className="academia-angelical">
      <h2 className="titulo-seccion"><BookOpen /> Academia Angélica</h2>
      <p className="subtitulo-seccion">Expande tu conocimiento y conexión con el reino angelical.</p>

      <div className="lista-cursos">
        {cursos.map((curso) => (
          <div 
            key={curso.id} 
            className="card-curso"
            onClick={() => handleSeleccionarCurso(curso)}
          >
            <img src={curso.imagen} alt={curso.titulo} className="imagen-curso" />
            <div className="info-curso">
              <h3>{curso.titulo}</h3>
              <p className="descripcion-corta">{curso.descripcion}</p>
              <div className="meta-info">
                <span className="nivel"><Award size={16} /> {curso.nivel}</span>
                <span className="modulos"><User size={16} /> {curso.modulos} Módulos</span>
                <span className="duracion"><Star size={16} /> {curso.duracion}</span>
              </div>
              <button className="btn-ver-mas">Ver Contenido <ChevronRight size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {cursoSeleccionado && (
        <div className="modal-curso-detalle">
          <div className="modal-contenido">
            <button className="btn-cerrar-modal" onClick={handleCerrarDetalle}>&times;</button>
            <div className="modal-header">
              <img src={cursoSeleccionado.imagen} alt={cursoSeleccionado.titulo} className="imagen-modal" />
              <h2>{cursoSeleccionado.titulo}</h2>
              <div className="meta-info-modal">
                <span className="nivel"><Award size={18} /> {cursoSeleccionado.nivel}</span>
                <span className="modulos"><User size={18} /> {cursoSeleccionado.modulos} Módulos</span>
                <span className="duracion"><Star size={18} /> {cursoSeleccionado.duracion}</span>
              </div>
            </div>
            <p className="descripcion-larga">{cursoSeleccionado.descripcion}</p>
            
            <div className="contenido-curso-seccion">
              <h4>Contenido del Curso:</h4>
              <ul>
                {cursoSeleccionado.contenido.map((modulo, index) => (
                  <li key={index}><CheckCircle size={16} /> {modulo}</li>
                ))}
              </ul>
            </div>

            <button className="btn-inscribirse">Inscribirse Ahora</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademiaAngelical;
