import React, { useState, useEffect, useContext, createContext } from 'react';
import './AcademiaAngelical.css';
import { 
  BookOpen, Award, User, Star, ChevronRight, CheckCircle, Play, Clock, Users, 
  Filter, Search, Grid, List, MoreHorizontal, ShoppingCart, Heart, Eye,
  ChevronDown, ChevronUp, Maximize2, X, Plus, Minus, DollarSign,
  Calendar, TrendingUp, Crown, Gift, Zap, Target, BookmarkPlus
} from 'lucide-react';

// Context para el carrito de compras
const CartContext = createContext();

// Provider del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (course) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === course.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === course.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Datos expandidos de cursos y clases
const cursosData = [
  {
    id: 1,
    titulo: 'Introducción al Mundo Angélico',
    descripcion: 'Descubre quiénes son los ángeles, su jerarquía y cómo se comunican con nosotros.',
    descripcionCompleta: 'Un curso completo que te introducirá al fascinante mundo de los ángeles. Aprenderás sobre las diferentes jerarquías angelicales, cómo reconocer su presencia en tu vida, y las formas más efectivas de comunicarte con ellos. Este curso incluye meditaciones guiadas, ejercicios prácticos y técnicas de conexión que han sido probadas por miles de estudiantes.',
    nivel: 'Principiante',
    duracion: '4 semanas',
    lecciones: 12,
    estudiantes: 245,
    precio: 89,
    precioOriginal: 129,
    instructor: 'Juan Carlos Ávila',
    instructorBio: 'Maestro espiritual con más de 15 años de experiencia en comunicación angelical.',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    categoria: 'Fundamentos',
    rating: 4.8,
    reviews: 156,
    tipo: 'paid',
    estado: 'available',
    fechaCreacion: '2024-01-15',
    fechaActualizacion: '2024-03-10',
    idioma: 'Español',
    certificado: true,
    accesoDePorVida: true,
    contenido: [
      {
        modulo: 'Módulo 1: ¿Qué son los Ángeles?',
        lecciones: ['Historia de los ángeles', 'Tipos de seres angelicales', 'Su papel en nuestras vidas'],
        duracion: '45 min'
      },
      {
        modulo: 'Módulo 2: Jerarquías Angelicales',
        lecciones: ['Serafines y Querubines', 'Arcángeles principales', 'Ángeles guardianes'],
        duracion: '60 min'
      },
      {
        modulo: 'Módulo 3: Cómo Escuchar a tus Ángeles',
        lecciones: ['Señales y sincronicidades', 'Meditación angelical', 'Interpretación de mensajes'],
        duracion: '75 min'
      },
      {
        modulo: 'Módulo 4: Oraciones y Decretos Angelicales',
        lecciones: ['Oraciones de protección', 'Decretos de abundancia', 'Rituales de conexión'],
        duracion: '50 min'
      }
    ],
    requisitos: ['Mente abierta', 'Deseo de crecimiento espiritual', 'Tiempo para práctica diaria'],
    objetivos: [
      'Comprender la naturaleza de los ángeles',
      'Establecer comunicación angelical',
      'Reconocer señales divinas',
      'Aplicar enseñanzas en la vida diaria'
    ],
    destacado: true,
    nuevo: false,
    masVendido: true,
    tags: ['ángeles', 'espiritualidad', 'principiantes', 'comunicación']
  },
  {
    id: 2,
    titulo: 'Conectando con tu Ángel Guardián',
    descripcion: 'Aprende a establecer una conexión profunda y personal con tu ángel guardián.',
    descripcionCompleta: 'Este curso te enseñará técnicas específicas para conectar con tu ángel guardián personal. A través de meditaciones dirigidas, ejercicios de visualización y prácticas diarias, desarrollarás una relación íntima y constante con tu guía celestial.',
    nivel: 'Principiante',
    duracion: '3 semanas',
    lecciones: 9,
    estudiantes: 189,
    precio: 69,
    precioOriginal: 99,
    instructor: 'María Elena Luz',
    instructorBio: 'Canalizadora certificada con don natural para la comunicación angelical.',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    categoria: 'Conexión',
    rating: 4.9,
    reviews: 98,
    tipo: 'paid',
    estado: 'available',
    fechaCreacion: '2024-02-01',
    fechaActualizacion: '2024-03-15',
    idioma: 'Español',
    certificado: true,
    accesoDePorVida: true,
    contenido: [
      {
        modulo: 'Módulo 1: Identificando a tu Ángel Guardián',
        lecciones: ['Características únicas', 'Nombres angelicales', 'Energía personal'],
        duracion: '40 min'
      },
      {
        modulo: 'Módulo 2: Meditaciones para la Conexión',
        lecciones: ['Meditación básica', 'Visualización guiada', 'Respiración angelical'],
        duracion: '55 min'
      },
      {
        modulo: 'Módulo 3: Señales y Sincronicidades',
        lecciones: ['Números angelicales', 'Señales en la naturaleza', 'Sueños proféticos'],
        duracion: '45 min'
      }
    ],
    requisitos: ['Curso de Introducción (recomendado)', 'Espacio tranquilo para meditar'],
    objetivos: [
      'Identificar a tu ángel guardián',
      'Establecer comunicación directa',
      'Recibir guía personalizada',
      'Mantener conexión constante'
    ],
    destacado: false,
    nuevo: true,
    masVendido: false,
    tags: ['ángel guardián', 'meditación', 'conexión personal', 'guía']
  },
  {
    id: 3,
    titulo: 'Arcángeles: Maestros de Luz',
    descripcion: 'Conoce a los principales arcángeles y cómo invocar su ayuda.',
    descripcionCompleta: 'Un curso avanzado sobre los siete arcángeles principales y sus especialidades. Aprenderás las invocaciones específicas, los colores asociados, los días de la semana más propicios para cada uno, y cómo trabajar con su energía para diferentes propósitos.',
    nivel: 'Intermedio',
    duracion: '6 semanas',
    lecciones: 18,
    estudiantes: 156,
    precio: 129,
    precioOriginal: 179,
    instructor: 'Juan Carlos Ávila',
    instructorBio: 'Maestro espiritual con más de 15 años de experiencia en comunicación angelical.',
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    categoria: 'Arcángeles',
    rating: 4.7,
    reviews: 87,
    tipo: 'paid',
    estado: 'available',
    fechaCreacion: '2024-01-20',
    fechaActualizacion: '2024-03-05',
    idioma: 'Español',
    certificado: true,
    accesoDePorVida: true,
    contenido: [
      {
        modulo: 'Módulo 1: Arcángel Miguel - Protección',
        lecciones: ['Historia y atributos', 'Invocaciones de protección', 'Rituales de limpieza'],
        duracion: '70 min'
      },
      {
        modulo: 'Módulo 2: Arcángel Gabriel - Comunicación',
        lecciones: ['Mensajero divino', 'Claridad en comunicación', 'Inspiración creativa'],
        duracion: '65 min'
      },
      {
        modulo: 'Módulo 3: Arcángel Rafael - Sanación',
        lecciones: ['Sanación física', 'Sanación emocional', 'Técnicas de canalización'],
        duracion: '80 min'
      },
      {
        modulo: 'Módulo 4: Arcángel Uriel - Sabiduría',
        lecciones: ['Iluminación mental', 'Toma de decisiones', 'Transformación personal'],
        duracion: '60 min'
      }
    ],
    requisitos: ['Curso de Introducción completado', 'Experiencia básica en meditación'],
    objetivos: [
      'Conocer a los 7 arcángeles principales',
      'Dominar invocaciones específicas',
      'Trabajar con energías angelicales',
      'Aplicar enseñanzas en situaciones específicas'
    ],
    destacado: true,
    nuevo: false,
    masVendido: true,
    tags: ['arcángeles', 'invocaciones', 'intermedio', 'especialización']
  },
  {
    id: 4,
    titulo: 'Sanación Angelical Avanzada',
    descripcion: 'Técnicas avanzadas de sanación con la ayuda de los ángeles.',
    descripcionCompleta: 'Curso profesional para aquellos que desean convertirse en sanadores angelicales certificados. Incluye técnicas avanzadas de canalización, sanación a distancia, trabajo con cristales angelicales y protocolos de sanación grupal.',
    nivel: 'Avanzado',
    duracion: '8 semanas',
    lecciones: 24,
    estudiantes: 89,
    precio: 199,
    precioOriginal: 299,
    instructor: 'Ana Cristina Paz',
    instructorBio: 'Sanadora angelical certificada con más de 20 años de experiencia.',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    categoria: 'Sanación',
    rating: 4.9,
    reviews: 45,
    tipo: 'paid',
    estado: 'available',
    fechaCreacion: '2024-01-10',
    fechaActualizacion: '2024-02-28',
    idioma: 'Español',
    certificado: true,
    accesoDePorVida: true,
    contenido: [
      {
        modulo: 'Módulo 1: Fundamentos de la Sanación Angelical',
        lecciones: ['Principios básicos', 'Ética del sanador', 'Preparación energética'],
        duracion: '90 min'
      },
      {
        modulo: 'Módulo 2: Técnicas de Canalización',
        lecciones: ['Apertura de canales', 'Protección energética', 'Mantenimiento de la conexión'],
        duracion: '85 min'
      },
      {
        modulo: 'Módulo 3: Sanación a Distancia',
        lecciones: ['Conexión remota', 'Envío de energía', 'Verificación de resultados'],
        duracion: '75 min'
      },
      {
        modulo: 'Módulo 4: Certificación Práctica',
        lecciones: ['Casos prácticos', 'Evaluación final', 'Certificación profesional'],
        duracion: '120 min'
      }
    ],
    requisitos: ['Cursos previos completados', 'Experiencia en sanación energética', 'Compromiso ético'],
    objetivos: [
      'Dominar técnicas avanzadas de sanación',
      'Obtener certificación profesional',
      'Establecer práctica de sanación',
      'Ayudar a otros en su proceso de sanación'
    ],
    destacado: false,
    nuevo: false,
    masVendido: false,
    tags: ['sanación', 'avanzado', 'certificación', 'profesional']
  },
  {
    id: 5,
    titulo: 'Manifestación con Ángeles',
    descripcion: 'Aprende a manifestar tus deseos con la ayuda angelical.',
    descripcionCompleta: 'Curso gratuito introductorio sobre las técnicas básicas de manifestación con ayuda angelical. Perfecto para comenzar tu camino en la co-creación consciente.',
    nivel: 'Principiante',
    duracion: '2 semanas',
    lecciones: 6,
    estudiantes: 567,
    precio: 0,
    precioOriginal: 0,
    instructor: 'Luz Marina Santos',
    instructorBio: 'Especialista en manifestación consciente y ley de atracción angelical.',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    categoria: 'Manifestación',
    rating: 4.6,
    reviews: 234,
    tipo: 'free',
    estado: 'available',
    fechaCreacion: '2024-03-01',
    fechaActualizacion: '2024-03-20',
    idioma: 'Español',
    certificado: false,
    accesoDePorVida: true,
    contenido: [
      {
        modulo: 'Módulo 1: Fundamentos de la Manifestación',
        lecciones: ['Ley de atracción', 'Vibración y frecuencia', 'Intención clara'],
        duracion: '30 min'
      },
      {
        modulo: 'Módulo 2: Técnicas Angelicales',
        lecciones: ['Decretos de abundancia', 'Visualización asistida', 'Gratitud angelical'],
        duracion: '35 min'
      }
    ],
    requisitos: ['Ninguno'],
    objetivos: [
      'Comprender la manifestación',
      'Aplicar técnicas básicas',
      'Trabajar con ángeles de abundancia'
    ],
    destacado: false,
    nuevo: true,
    masVendido: false,
    tags: ['manifestación', 'gratuito', 'abundancia', 'ley de atracción']
  },
  {
    id: 6,
    titulo: 'Numerología Angelical',
    descripcion: 'Descifra los mensajes de los ángeles a través de los números.',
    descripcionCompleta: 'Curso próximo a lanzarse sobre la interpretación de números angelicales y su significado en tu vida diaria.',
    nivel: 'Intermedio',
    duracion: '5 semanas',
    lecciones: 15,
    estudiantes: 0,
    precio: 99,
    precioOriginal: 149,
    instructor: 'Carlos Numerólogo',
    instructorBio: 'Experto en numerología sagrada y comunicación angelical.',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    categoria: 'Numerología',
    rating: 0,
    reviews: 0,
    tipo: 'paid',
    estado: 'upcoming',
    fechaCreacion: '2024-04-01',
    fechaActualizacion: '2024-04-01',
    idioma: 'Español',
    certificado: true,
    accesoDePorVida: true,
    contenido: [],
    requisitos: ['Conocimientos básicos de numerología'],
    objetivos: [
      'Interpretar números angelicales',
      'Recibir mensajes numéricos',
      'Aplicar numerología en la vida diaria'
    ],
    destacado: false,
    nuevo: true,
    masVendido: false,
    tags: ['numerología', 'números angelicales', 'próximamente']
  }
];

// Componente principal
const AcademiaAngelical = () => {
  // Estados principales
  const [cursos, setCursos] = useState(cursosData);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [vistaActual, setVistaActual] = useState('grid'); // grid, list, carousel
  const [modalExpandido, setModalExpandido] = useState(false);
  
  // Estados de filtros y búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [filtroTipo, setFiltroTipo] = useState('Todos'); // free, paid, todos
  const [filtroEstado, setFiltroEstado] = useState('Todos'); // available, upcoming, todos
  const [ordenarPor, setOrdenarPor] = useState('destacados'); // destacados, recientes, rating, precio, estudiantes
  
  // Estados de UI
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [cargando, setCargando] = useState(false);

  // Hook del carrito
  const { addToCart, getTotalItems } = useCart();

  // Opciones de filtros
  const categorias = ['Todas', ...new Set(cursosData.map(curso => curso.categoria))];
  const niveles = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
  const tipos = ['Todos', 'Gratuitos', 'De Pago'];
  const estados = ['Todos', 'Disponibles', 'Próximamente'];

  // Función de filtrado y búsqueda
  useEffect(() => {
    let cursosFiltrados = [...cursosData];

    // Búsqueda por texto
    if (busqueda) {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.instructor.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.tags.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (filtroCategoria !== 'Todas') {
      cursosFiltrados = cursosFiltrados.filter(curso => curso.categoria === filtroCategoria);
    }

    // Filtro por nivel
    if (filtroNivel !== 'Todos') {
      cursosFiltrados = cursosFiltrados.filter(curso => curso.nivel === filtroNivel);
    }

    // Filtro por tipo (gratuito/pago)
    if (filtroTipo !== 'Todos') {
      const tipoFiltro = filtroTipo === 'Gratuitos' ? 'free' : 'paid';
      cursosFiltrados = cursosFiltrados.filter(curso => curso.tipo === tipoFiltro);
    }

    // Filtro por estado
    if (filtroEstado !== 'Todos') {
      const estadoFiltro = filtroEstado === 'Disponibles' ? 'available' : 'upcoming';
      cursosFiltrados = cursosFiltrados.filter(curso => curso.estado === estadoFiltro);
    }

    // Ordenamiento
    switch (ordenarPor) {
      case 'recientes':
        cursosFiltrados.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
        break;
      case 'rating':
        cursosFiltrados.sort((a, b) => b.rating - a.rating);
        break;
      case 'precio':
        cursosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'estudiantes':
        cursosFiltrados.sort((a, b) => b.estudiantes - a.estudiantes);
        break;
      case 'destacados':
      default:
        cursosFiltrados.sort((a, b) => {
          if (a.destacado && !b.destacado) return -1;
          if (!a.destacado && b.destacado) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setCursos(cursosFiltrados);
  }, [busqueda, filtroCategoria, filtroNivel, filtroTipo, filtroEstado, ordenarPor]);

  // Función para renderizar estrellas
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

  // Función para obtener el icono del tipo de curso
  const getTipoIcon = (tipo) => {
    return tipo === 'free' ? <Gift size={16} /> : <DollarSign size={16} />;
  };

  // Función para obtener el icono del estado
  const getEstadoIcon = (estado) => {
    return estado === 'upcoming' ? <Calendar size={16} /> : <CheckCircle size={16} />;
  };

  // Función para manejar la expansión del modal
  const expandirModal = () => {
    setModalExpandido(true);
  };

  const cerrarModalExpandido = () => {
    setModalExpandido(false);
  };

  return (
    <div className="academia-angelical-completa">
      {/* Header con carrito */}
      <div className="academia-header">
        <div className="header-content">
          <h1>Academia Angélica</h1>
          <p>Transforma tu vida a través del conocimiento angelical</p>
        </div>
        <div className="header-actions">
          <CartButton />
        </div>
      </div>

      {/* Barra de búsqueda principal */}
      <div className="busqueda-principal">
        <div className="busqueda-container">
          <Search size={24} />
          <input
            type="text"
            placeholder="Buscar cursos, instructores, temas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="busqueda-input"
          />
          <button 
            className="filtros-toggle"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <Filter size={20} />
            Filtros
            {mostrarFiltros ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Panel de filtros expandible */}
      {mostrarFiltros && (
        <div className="panel-filtros">
          <div className="filtros-grid">
            <div className="filtro-grupo">
              <label>Categoría</label>
              <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-grupo">
              <label>Nivel</label>
              <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
                {niveles.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-grupo">
              <label>Tipo</label>
              <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-grupo">
              <label>Estado</label>
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
            
            <div className="filtro-grupo">
              <label>Ordenar por</label>
              <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
                <option value="destacados">Destacados</option>
                <option value="recientes">Más recientes</option>
                <option value="rating">Mejor valorados</option>
                <option value="precio">Precio</option>
                <option value="estudiantes">Más populares</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Controles de vista y resultados */}
      <div className="controles-vista">
        <div className="resultados-info">
          <span>{cursos.length} curso{cursos.length !== 1 ? 's' : ''} encontrado{cursos.length !== 1 ? 's' : ''}</span>
        </div>
        
        <div className="vista-controles">
          <button 
            className={`vista-btn ${vistaActual === 'grid' ? 'active' : ''}`}
            onClick={() => setVistaActual('grid')}
          >
            <Grid size={20} />
            Grid
          </button>
          <button 
            className={`vista-btn ${vistaActual === 'list' ? 'active' : ''}`}
            onClick={() => setVistaActual('list')}
          >
            <List size={20} />
            Lista
          </button>
          <button 
            className={`vista-btn ${vistaActual === 'carousel' ? 'active' : ''}`}
            onClick={() => setVistaActual('carousel')}
          >
            <MoreHorizontal size={20} />
            Carrusel
          </button>
        </div>
      </div>

      {/* Secciones especiales */}
      <CursosDestacados cursos={cursos.filter(c => c.destacado)} />
      <CursosGratuitos cursos={cursos.filter(c => c.tipo === 'free')} />
      <CursosProximos cursos={cursos.filter(c => c.estado === 'upcoming')} />

      {/* Lista principal de cursos */}
      <div className="cursos-principales">
        <h2>Todos los Cursos</h2>
        <div className={`cursos-container vista-${vistaActual}`}>
          {cursos.map(curso => (
            <CursoCard 
              key={curso.id} 
              curso={curso} 
              vista={vistaActual}
              onSelect={setCursoSeleccionado}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Modal de detalle del curso */}
      {cursoSeleccionado && (
        <CursoModal 
          curso={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
          onExpand={expandirModal}
          expandido={modalExpandido}
          onCloseExpanded={cerrarModalExpandido}
        />
      )}

      {/* Carrito flotante */}
      <CartSidebar />
    </div>
  );
};

// Componente del botón del carrito
const CartButton = () => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <button 
      className="cart-button"
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </button>
  );
};

// Componente de cursos destacados
const CursosDestacados = ({ cursos }) => {
  if (cursos.length === 0) return null;

  return (
    <section className="seccion-especial">
      <h2><Crown size={24} /> Cursos Destacados</h2>
      <div className="cursos-destacados-grid">
        {cursos.slice(0, 3).map(curso => (
          <CursoCardDestacado key={curso.id} curso={curso} />
        ))}
      </div>
    </section>
  );
};

// Componente de cursos gratuitos
const CursosGratuitos = ({ cursos }) => {
  if (cursos.length === 0) return null;

  return (
    <section className="seccion-especial">
      <h2><Gift size={24} /> Cursos Gratuitos</h2>
      <div className="cursos-gratuitos-grid">
        {cursos.map(curso => (
          <CursoCardGratuito key={curso.id} curso={curso} />
        ))}
      </div>
    </section>
  );
};

// Componente de cursos próximos
const CursosProximos = ({ cursos }) => {
  if (cursos.length === 0) return null;

  return (
    <section className="seccion-especial">
      <h2><Calendar size={24} /> Próximamente</h2>
      <div className="cursos-proximos-grid">
        {cursos.map(curso => (
          <CursoCardProximo key={curso.id} curso={curso} />
        ))}
      </div>
    </section>
  );
};

// Componente de tarjeta de curso
const CursoCard = ({ curso, vista, onSelect, onAddToCart }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          fill={i < rating ? "#ffd700" : "none"} 
          color={i < rating ? "#ffd700" : "#ddd"} 
        />
      );
    }
    return stars;
  };

  return (
    <div className={`curso-card curso-card-${vista}`}>
      <div className="curso-imagen">
        <img src={curso.imagen} alt={curso.titulo} />
        <div className="curso-badges">
          {curso.nuevo && <span className="badge nuevo">Nuevo</span>}
          {curso.masVendido && <span className="badge mas-vendido">Más Vendido</span>}
          {curso.tipo === 'free' && <span className="badge gratuito">Gratis</span>}
          {curso.estado === 'upcoming' && <span className="badge proximo">Próximamente</span>}
        </div>
        <div className="curso-overlay">
          <button className="btn-preview" onClick={() => onSelect(curso)}>
            <Eye size={20} />
            Ver Detalles
          </button>
        </div>
      </div>
      
      <div className="curso-contenido">
        <div className="curso-meta">
          <span className="categoria">{curso.categoria}</span>
          <span className="nivel">{curso.nivel}</span>
        </div>
        
        <h3>{curso.titulo}</h3>
        <p className="instructor">Por {curso.instructor}</p>
        <p className="descripcion">{curso.descripcion}</p>
        
        <div className="curso-stats">
          <div className="rating">
            {renderStars(curso.rating)}
            <span>({curso.rating})</span>
          </div>
          <div className="estudiantes">
            <Users size={14} />
            <span>{curso.estudiantes}</span>
          </div>
          <div className="duracion">
            <Clock size={14} />
            <span>{curso.duracion}</span>
          </div>
        </div>
        
        <div className="curso-footer">
          <div className="precio-container">
            {curso.precio > 0 ? (
              <>
                <span className="precio">€{curso.precio}</span>
                {curso.precioOriginal > curso.precio && (
                  <span className="precio-original">€{curso.precioOriginal}</span>
                )}
              </>
            ) : (
              <span className="precio gratuito">Gratis</span>
            )}
          </div>
          
          <div className="acciones">
            <button 
              className="btn-favorito"
              title="Añadir a favoritos"
            >
              <Heart size={18} />
            </button>
            {curso.estado === 'available' && (
              <button 
                className="btn-carrito"
                onClick={() => onAddToCart(curso)}
                title="Añadir al carrito"
              >
                <ShoppingCart size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta destacada
const CursoCardDestacado = ({ curso }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="curso-destacado">
      <div className="destacado-imagen">
        <img src={curso.imagen} alt={curso.titulo} />
        <div className="destacado-badge">
          <Crown size={16} />
          Destacado
        </div>
      </div>
      <div className="destacado-info">
        <h3>{curso.titulo}</h3>
        <p>{curso.descripcion}</p>
        <div className="destacado-meta">
          <span className="precio">€{curso.precio}</span>
          <button 
            className="btn-destacado"
            onClick={() => addToCart(curso)}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta gratuita
const CursoCardGratuito = ({ curso }) => {
  return (
    <div className="curso-gratuito">
      <img src={curso.imagen} alt={curso.titulo} />
      <div className="gratuito-info">
        <h4>{curso.titulo}</h4>
        <p>{curso.instructor}</p>
        <div className="gratuito-stats">
          <span><Users size={14} /> {curso.estudiantes}</span>
          <span><Clock size={14} /> {curso.duracion}</span>
        </div>
        <button className="btn-gratuito">
          <Gift size={16} />
          Acceder Gratis
        </button>
      </div>
    </div>
  );
};

// Componente de tarjeta próxima
const CursoCardProximo = ({ curso }) => {
  return (
    <div className="curso-proximo">
      <img src={curso.imagen} alt={curso.titulo} />
      <div className="proximo-info">
        <h4>{curso.titulo}</h4>
        <p>{curso.instructor}</p>
        <div className="proximo-meta">
          <span className="precio">€{curso.precio}</span>
          <span className="fecha">Próximamente</span>
        </div>
        <button className="btn-notificar">
          <BookmarkPlus size={16} />
          Notificarme
        </button>
      </div>
    </div>
  );
};

// Componente del modal del curso
const CursoModal = ({ curso, onClose, onExpand, expandido, onCloseExpanded }) => {
  const { addToCart } = useCart();
  
  if (expandido) {
    return (
      <div className="modal-expandido">
        <div className="modal-expandido-header">
          <h2>{curso.titulo}</h2>
          <button className="btn-cerrar-expandido" onClick={onCloseExpanded}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-expandido-contenido">
          <CursoDetalleCompleto curso={curso} />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="btn-expandir" onClick={onExpand}>
            <Maximize2 size={20} />
          </button>
          <button className="btn-cerrar" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <CursoDetalleResumido curso={curso} onAddToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

// Componente de detalle resumido del curso
const CursoDetalleResumido = ({ curso, onAddToCart }) => {
  return (
    <div className="curso-detalle-resumido">
      <div className="detalle-header">
        <img src={curso.imagen} alt={curso.titulo} />
        <div className="detalle-info">
          <h2>{curso.titulo}</h2>
          <p className="instructor">Por {curso.instructor}</p>
          <div className="detalle-meta">
            <span className="categoria">{curso.categoria}</span>
            <span className="nivel">{curso.nivel}</span>
            <div className="rating">
              <Star size={16} fill="#ffd700" color="#ffd700" />
              <span>{curso.rating} ({curso.reviews} reseñas)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="detalle-contenido">
        <p>{curso.descripcionCompleta}</p>
        
        <div className="detalle-stats">
          <div className="stat">
            <Clock size={20} />
            <span>{curso.duracion}</span>
          </div>
          <div className="stat">
            <BookOpen size={20} />
            <span>{curso.lecciones} lecciones</span>
          </div>
          <div className="stat">
            <Users size={20} />
            <span>{curso.estudiantes} estudiantes</span>
          </div>
        </div>
        
        <div className="detalle-footer">
          <div className="precio-detalle">
            <span className="precio">€{curso.precio}</span>
            {curso.precioOriginal > curso.precio && (
              <span className="precio-original">€{curso.precioOriginal}</span>
            )}
          </div>
          <button 
            className="btn-añadir-carrito"
            onClick={() => onAddToCart(curso)}
          >
            <ShoppingCart size={20} />
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de detalle completo del curso
const CursoDetalleCompleto = ({ curso }) => {
  return (
    <div className="curso-detalle-completo">
      <div className="detalle-completo-grid">
        <div className="detalle-principal">
          <img src={curso.imagen} alt={curso.titulo} />
          <h1>{curso.titulo}</h1>
          <p className="descripcion-completa">{curso.descripcionCompleta}</p>
          
          <div className="contenido-curso">
            <h3>Contenido del Curso</h3>
            {curso.contenido.map((modulo, index) => (
              <div key={index} className="modulo">
                <h4>{modulo.modulo}</h4>
                <ul>
                  {modulo.lecciones.map((leccion, i) => (
                    <li key={i}>{leccion}</li>
                  ))}
                </ul>
                <span className="duracion-modulo">{modulo.duracion}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="detalle-sidebar">
          <div className="instructor-info">
            <h3>Instructor</h3>
            <h4>{curso.instructor}</h4>
            <p>{curso.instructorBio}</p>
          </div>
          
          <div className="curso-info">
            <h3>Información del Curso</h3>
            <ul>
              <li><strong>Nivel:</strong> {curso.nivel}</li>
              <li><strong>Duración:</strong> {curso.duracion}</li>
              <li><strong>Lecciones:</strong> {curso.lecciones}</li>
              <li><strong>Idioma:</strong> {curso.idioma}</li>
              <li><strong>Certificado:</strong> {curso.certificado ? 'Sí' : 'No'}</li>
              <li><strong>Acceso:</strong> {curso.accesoDePorVida ? 'De por vida' : 'Limitado'}</li>
            </ul>
          </div>
          
          <div className="requisitos">
            <h3>Requisitos</h3>
            <ul>
              {curso.requisitos.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="objetivos">
            <h3>Objetivos</h3>
            <ul>
              {curso.objetivos.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente del carrito lateral
const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Carrito de Compras</h3>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={48} />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imagen} alt={item.titulo} />
                    <div className="item-info">
                      <h4>{item.titulo}</h4>
                      <p>{item.instructor}</p>
                      <div className="item-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="item-precio">
                      <span>€{item.precio * item.quantity}</span>
                      <button onClick={() => removeFromCart(item.id)}>
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: €{getTotalPrice()}</strong>
                </div>
                <div className="cart-actions">
                  <button className="btn-limpiar" onClick={clearCart}>
                    Limpiar Carrito
                  </button>
                  <button className="btn-checkout">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal con Provider
const AcademiaAngelicalConProvider = () => {
  return (
    <CartProvider>
      <AcademiaAngelical />
    </CartProvider>
  );
};

export default AcademiaAngelicalConProvider;

