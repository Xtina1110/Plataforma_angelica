import React, { useState, useEffect } from 'react';
import './AcademiaAngelical.css';
import { BookOpen, Award, User, Star, ChevronRight, CheckCircle, Play, Clock, Users, Filter, Search } from 'lucide-react';

const cursosData = [
  {
    id: 1,
    titulo: 'Introducción al Mundo Angélico',
    descripcion: 'Descubre quiénes son los ángeles, su jerarquía y cómo se comunican con nosotros. Un punto de partida esencial para tu camino espiritual.',
    nivel: 'Principiante',
    duracion: '4 semanas',
    lecciones: 12,
    estudiantes: 245,
    precio: 89,
    instructor: 'Juan Carlos Ávila',
    imagen: '/assets/academia/curso-introduccion.jpg',
    categoria: 'Fundamentos',
    rating: 4.8,
    contenido: [
      'Módulo 1: ¿Qué son los Ángeles?',
      'Módulo 2: Jerarquías Angelicales',
      'Módulo 3: Cómo Escuchar a tus Ángeles',
      'Módulo 4: Oraciones y Decretos Angelicales'
    ],
    destacado: true
  },
  {
    id: 2,
    titulo: 'Conectando con tu Ángel Guardián',
    descripcion: 'Aprende a establecer una conexión profunda y personal con tu ángel guardián para recibir guía y apoyo diario.',
    nivel: 'Principiante',
    duracion: '3 semanas',
    lecciones: 9,
    estudiantes: 189,
    precio: 69,
    instructor: 'María Elena Luz',
    imagen: '/assets/academia/curso-guardian.jpg',
    categoria: 'Conexión',
    rating: 4.9,
    contenido: [
      'Módulo 1: Identificando a tu Ángel Guardián',
      'Módulo 2: Meditaciones para la Conexión',
      'Módulo 3: Señales y Sincronicidades'
    ],
    destacado: false
  },
  {
    id: 3,
    titulo: 'Arcángeles: Maestros de Luz',
    descripcion: 'Conoce a los principales arcángeles, sus funciones específicas y cómo invocar su ayuda en diferentes aspectos de tu vida.',
    nivel: 'Intermedio',
    duracion: '6 semanas',
    lecciones: 18,
    estudiantes: 156,
    precio: 129,
    instructor: 'Juan Carlos Ávila',
    imagen: '/assets/academia/curso-arcangeles.jpg',
    categoria: 'Arcángeles',
    rating: 4.7,
    contenido: [
      'Módulo 1: Arcángel Miguel - Protección',
      'Módulo 2: Arcángel Gabriel - Comunicación',
      'Módulo 3: Arcángel Rafael - Sanación',
      'Módulo 4: Arcángel Uriel - Sabiduría'
    ],
    destacado: true
  },
  {
    id: 4,
    titulo: 'Sanación Angelical Avanzada',
    descripcion: 'Técnicas avanzadas de sanación con la ayuda de los ángeles. Aprende a canalizar energía angelical para sanar a otros.',
    nivel: 'Avanzado',
    duracion: '8 semanas',
    lecciones: 24,
    estudiantes: 89,
    precio: 199,
    instructor: 'Ana Cristina Paz',
    imagen: '/assets/academia/curso-sanacion.jpg',
    categoria: 'Sanación',
    rating: 4.9,
    contenido: [
      'Módulo 1: Fundamentos de la Sanación Angelical',
      'Módulo 2: Técnicas de Canalización',
      'Módulo 3: Sanación a Distancia',
      'Módulo 4: Certificación Práctica'
    ],
    destacado: false
  }
];

const categorias = ['Todas', 'Fundamentos', 'Conexión', 'Arcángeles', 'Sanación'];
const niveles = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];

const AcademiaAngelical = () => {
  const [cursos, setCursos] = useState(cursosData);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [vistaActual, setVistaActual] = useState('grid'); // grid, list

  // Filtrar cursos
  useEffect(() => {
    let cursosFiltrados = cursosData;

    if (filtroCategoria !== 'Todas') {
      cursosFiltrados = cursosFiltrados.filter(curso => curso.categoria === filtroCategoria);
    }

    if (filtroNivel !== 'Todos') {
      cursosFiltrados = cursosFiltrados.filter(curso => curso.nivel === filtroNivel);
    }

    if (busqueda) {
      cursosFiltrados = cursosFiltrados.filter(curso => 
        curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setCursos(cursosFiltrados);
  }, [filtroCategoria, filtroNivel, busqueda]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#ffd700" color="#ffd700" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="#ffd700" color="#ffd700" style={{clipPath: 'inset(0 50% 0 0)'}} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#ddd" />);
    }

    return stars;
  };

  return (
    <div className="academia-angelical-kalvi">
      {/* Hero Section */}
      <div className="academia-hero">
        <div className="hero-content">
          <h1>Academia Angélica</h1>
          <p>Transforma tu vida a través del conocimiento angelical. Aprende de maestros experimentados y conecta con tu propósito divino.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="number">500+</span>
              <span className="label">Estudiantes</span>
            </div>
            <div className="stat">
              <span className="number">15+</span>
              <span className="label">Cursos</span>
            </div>
            <div className="stat">
              <span className="number">4.8</span>
              <span className="label">Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/academia/hero-academia.jpg" alt="Academia Angélica" />
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="filtros-section">
        <div className="filtros-container">
          <div className="busqueda-box">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Buscar cursos..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          <div className="filtros-group">
            <div className="filtro-item">
              <label>Categoría:</label>
              <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-item">
              <label>Nivel:</label>
              <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
                {niveles.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cursos Destacados */}
      <div className="cursos-destacados">
        <h2>Cursos Destacados</h2>
        <div className="destacados-grid">
          {cursosData.filter(curso => curso.destacado).map(curso => (
            <div key={curso.id} className="curso-destacado-card">
              <div className="curso-imagen">
                <img src={curso.imagen} alt={curso.titulo} />
                <div className="curso-overlay">
                  <button className="btn-preview">
                    <Play size={24} />
                    Vista Previa
                  </button>
                </div>
              </div>
              <div className="curso-info">
                <div className="curso-meta">
                  <span className="categoria">{curso.categoria}</span>
                  <span className="nivel nivel-{curso.nivel.toLowerCase()}">{curso.nivel}</span>
                </div>
                <h3>{curso.titulo}</h3>
                <p>{curso.descripcion}</p>
                <div className="curso-stats">
                  <div className="rating">
                    {renderStars(curso.rating)}
                    <span>({curso.rating})</span>
                  </div>
                  <div className="estudiantes">
                    <Users size={16} />
                    <span>{curso.estudiantes} estudiantes</span>
                  </div>
                </div>
                <div className="curso-footer">
                  <div className="precio">€{curso.precio}</div>
                  <button 
                    className="btn-ver-curso"
                    onClick={() => setCursoSeleccionado(curso)}
                  >
                    Ver Curso
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Todos los Cursos */}
      <div className="todos-cursos">
        <div className="section-header">
          <h2>Todos los Cursos ({cursos.length})</h2>
          <div className="vista-toggle">
            <button 
              className={vistaActual === 'grid' ? 'active' : ''}
              onClick={() => setVistaActual('grid')}
            >
              Grid
            </button>
            <button 
              className={vistaActual === 'list' ? 'active' : ''}
              onClick={() => setVistaActual('list')}
            >
              Lista
            </button>
          </div>
        </div>

        <div className={`cursos-grid ${vistaActual}`}>
          {cursos.map(curso => (
            <div key={curso.id} className="curso-card">
              <div className="curso-imagen">
                <img src={curso.imagen} alt={curso.titulo} />
                <div className="curso-badges">
                  <span className="badge-nivel">{curso.nivel}</span>
                  {curso.destacado && <span className="badge-destacado">Destacado</span>}
                </div>
              </div>
              <div className="curso-contenido">
                <div className="curso-header">
                  <h3>{curso.titulo}</h3>
                  <div className="instructor">Por {curso.instructor}</div>
                </div>
                <p className="descripcion">{curso.descripcion}</p>
                <div className="curso-detalles">
                  <div className="detalle">
                    <Clock size={16} />
                    <span>{curso.duracion}</span>
                  </div>
                  <div className="detalle">
                    <BookOpen size={16} />
                    <span>{curso.lecciones} lecciones</span>
                  </div>
                  <div className="detalle">
                    <Users size={16} />
                    <span>{curso.estudiantes} estudiantes</span>
                  </div>
                </div>
                <div className="curso-rating">
                  {renderStars(curso.rating)}
                  <span className="rating-text">({curso.rating})</span>
                </div>
                <div className="curso-actions">
                  <div className="precio">€{curso.precio}</div>
                  <button 
                    className="btn-inscribirse"
                    onClick={() => setCursoSeleccionado(curso)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalle del Curso */}
      {cursoSeleccionado && (
        <div className="modal-overlay" onClick={() => setCursoSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setCursoSeleccionado(null)}
            >
              &times;
            </button>
            
            <div className="modal-header">
              <img src={cursoSeleccionado.imagen} alt={cursoSeleccionado.titulo} />
              <div className="modal-info">
                <h2>{cursoSeleccionado.titulo}</h2>
                <p className="instructor">Instructor: {cursoSeleccionado.instructor}</p>
                <div className="modal-meta">
                  <span className="categoria">{cursoSeleccionado.categoria}</span>
                  <span className="nivel">{cursoSeleccionado.nivel}</span>
                  <div className="rating">
                    {renderStars(cursoSeleccionado.rating)}
                    <span>({cursoSeleccionado.rating})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="descripcion-completa">
                <h3>Descripción del Curso</h3>
                <p>{cursoSeleccionado.descripcion}</p>
              </div>

              <div className="curso-estadisticas">
                <div className="stat">
                  <Clock size={20} />
                  <span>{cursoSeleccionado.duracion}</span>
                </div>
                <div className="stat">
                  <BookOpen size={20} />
                  <span>{cursoSeleccionado.lecciones} lecciones</span>
                </div>
                <div className="stat">
                  <Users size={20} />
                  <span>{cursoSeleccionado.estudiantes} estudiantes</span>
                </div>
              </div>

              <div className="contenido-curso">
                <h3>Contenido del Curso</h3>
                <ul>
                  {cursoSeleccionado.contenido.map((modulo, index) => (
                    <li key={index}>
                      <CheckCircle size={16} />
                      {modulo}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <div className="precio-final">
                  <span className="precio">€{cursoSeleccionado.precio}</span>
                  <span className="precio-info">Acceso de por vida</span>
                </div>
                <button className="btn-inscribirse-modal">
                  Inscribirse Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademiaAngelical;
