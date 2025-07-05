import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cursosData, categorias, instructores } from '../data/cursosData';

const AcademiaAngelica = ({ onVolver, usuario }) => {
  const [cursos, setCursos] = useState(cursosData);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos los cursos');
  const [ordenamiento, setOrdenamiento] = useState('populares');
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [vistaActual, setVistaActual] = useState('listado'); // 'listado', 'curso', 'carrito'
  const [carrito, setCarrito] = useState([]);
  const [cursosComprados, setCursosComprados] = useState([5]); // Curso gratuito ya "comprado"

  // Filtrar cursos por categoría
  const cursosFiltrados = cursos.filter(curso => 
    categoriaSeleccionada === 'Todos los cursos' || curso.categoria === categoriaSeleccionada
  );

  // Ordenar cursos
  const cursosOrdenados = [...cursosFiltrados].sort((a, b) => {
    switch (ordenamiento) {
      case 'precio-menor':
        return a.precio - b.precio;
      case 'precio-mayor':
        return b.precio - a.precio;
      case 'calificacion':
        return b.calificacion - a.calificacion;
      case 'recientes':
        return new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
      default: // populares
        return b.estudiantes - a.estudiantes;
    }
  });

  const agregarAlCarrito = (curso) => {
    if (!carrito.find(item => item.id === curso.id) && !cursosComprados.includes(curso.id)) {
      setCarrito([...carrito, curso]);
    }
  };

  const eliminarDelCarrito = (cursoId) => {
    setCarrito(carrito.filter(item => item.id !== cursoId));
  };

  const comprarCurso = (cursoId) => {
    setCursosComprados([...cursosComprados, cursoId]);
    setCarrito(carrito.filter(item => item.id !== cursoId));
  };

  const verCurso = (curso) => {
    setCursoSeleccionado(curso);
    setVistaActual('curso');
  };

  const totalCarrito = carrito.reduce((total, curso) => total + curso.precio, 0);

  if (vistaActual === 'curso' && cursoSeleccionado) {
    return (
      <VistaCurso 
        curso={cursoSeleccionado}
        onVolver={() => setVistaActual('listado')}
        onAgregarCarrito={agregarAlCarrito}
        yaComprado={cursosComprados.includes(cursoSeleccionado.id)}
        onComprar={comprarCurso}
        usuario={usuario}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onVolver}
                className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
              >
                <span className="mr-2">←</span>
                Volver al Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Academia Angélica
              </h1>
            </div>
            
            {/* Carrito */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setVistaActual('carrito')}
                >
                  <span>🛒</span>
                  <span className="font-medium">{carrito.length}</span>
                  {carrito.length > 0 && (
                    <span className="text-sm text-purple-600">${totalCarrito.toFixed(2)}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {vistaActual === 'carrito' ? (
        <VistaCarrito 
          carrito={carrito}
          onEliminar={eliminarDelCarrito}
          onVolver={() => setVistaActual('listado')}
          onComprar={comprarCurso}
          total={totalCarrito}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filtros y ordenamiento */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Categorías */}
              <div className="flex flex-wrap gap-2">
                {categorias.map(categoria => (
                  <button
                    key={categoria}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoriaSeleccionada === categoria
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-purple-50 border'
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>

              {/* Ordenamiento */}
              <select
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="populares">Más populares</option>
                <option value="calificacion">Mejor calificados</option>
                <option value="precio-menor">Precio: menor a mayor</option>
                <option value="precio-mayor">Precio: mayor a menor</option>
                <option value="recientes">Más recientes</option>
              </select>
            </div>

            {/* Estadísticas */}
            <div className="mt-4 text-gray-600">
              <p>{cursosOrdenados.length} cursos encontrados</p>
            </div>
          </div>

          {/* Grid de cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cursosOrdenados.map(curso => (
              <TarjetaCurso
                key={curso.id}
                curso={curso}
                onVerCurso={verCurso}
                onAgregarCarrito={agregarAlCarrito}
                yaComprado={cursosComprados.includes(curso.id)}
                enCarrito={carrito.some(item => item.id === curso.id)}
              />
            ))}
          </div>

          {/* Sección de instructores destacados */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructores Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructores.map(instructor => (
                <div key={instructor.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                      {instructor.nombre.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-gray-800">{instructor.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-2">{instructor.especialidad}</p>
                    <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
                      <span>{instructor.cursos} cursos</span>
                      <span>{instructor.estudiantes.toLocaleString()} estudiantes</span>
                      <span>⭐ {instructor.calificacion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TarjetaCurso = ({ curso, onVerCurso, onAgregarCarrito, yaComprado, enCarrito }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Imagen del curso */}
      <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">📚</span>
        </div>
        {curso.es_bestseller && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
            Bestseller
          </div>
        )}
        {curso.precio === 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            Gratis
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Título y descripción */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-purple-600"
            onClick={() => onVerCurso(curso)}>
          {curso.titulo}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{curso.descripcion}</p>

        {/* Instructor */}
        <p className="text-xs text-gray-500 mb-2">Por {curso.instructor.nombre}</p>

        {/* Calificación y estadísticas */}
        <div className="flex items-center space-x-2 mb-3 text-xs text-gray-600">
          <span className="flex items-center">
            ⭐ {curso.calificacion}
          </span>
          <span>({curso.num_resenas})</span>
          <span>•</span>
          <span>{curso.estudiantes.toLocaleString()} estudiantes</span>
        </div>

        {/* Duración y módulos */}
        <div className="flex items-center space-x-2 mb-4 text-xs text-gray-500">
          <span>🕒 {curso.duracion}</span>
          <span>•</span>
          <span>📖 {curso.modulos} módulos</span>
          <span>•</span>
          <span>{curso.nivel}</span>
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div>
            {curso.precio === 0 ? (
              <span className="text-lg font-bold text-green-600">Gratis</span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-800">${curso.precio}</span>
                {curso.descuento_activo && curso.precioOriginal > curso.precio && (
                  <span className="text-sm text-gray-500 line-through">${curso.precioOriginal}</span>
                )}
              </div>
            )}
          </div>

          {yaComprado ? (
            <button
              onClick={() => onVerCurso(curso)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Acceder
            </button>
          ) : enCarrito ? (
            <button className="bg-gray-400 text-white px-4 py-2 rounded text-sm font-medium cursor-not-allowed">
              En carrito
            </button>
          ) : (
            <button
              onClick={() => onAgregarCarrito(curso)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              {curso.precio === 0 ? 'Inscribirse' : 'Agregar'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VistaCurso = ({ curso, onVolver, onAgregarCarrito, yaComprado, onComprar, usuario }) => {
  const [moduloExpandido, setModuloExpandido] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del curso */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={onVolver}
            className="flex items-center text-gray-300 hover:text-white mb-4 transition-colors"
          >
            <span className="mr-2">←</span>
            Volver a cursos
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{curso.titulo}</h1>
              <p className="text-xl text-gray-300 mb-4">{curso.descripcionLarga}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="flex items-center">
                  ⭐ {curso.calificacion}
                </span>
                <span>({curso.num_resenas} reseñas)</span>
                <span>{curso.estudiantes.toLocaleString()} estudiantes</span>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <span>Creado por {curso.instructor.nombre}</span>
                <span>•</span>
                <span>Última actualización: {new Date(curso.ultima_actualizacion).toLocaleDateString()}</span>
                <span>•</span>
                <span>{curso.idioma}</span>
              </div>
            </div>

            {/* Panel de compra */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 text-gray-800 sticky top-4">
                {/* Video preview */}
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">▶️</span>
                </div>

                {/* Precio */}
                <div className="mb-4">
                  {curso.precio === 0 ? (
                    <span className="text-2xl font-bold text-green-600">Gratis</span>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">${curso.precio}</span>
                      {curso.descuento_activo && curso.precioOriginal > curso.precio && (
                        <span className="text-lg text-gray-500 line-through">${curso.precioOriginal}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Botones de acción */}
                {yaComprado ? (
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                      Continuar aprendiendo
                    </button>
                    <p className="text-sm text-green-600 text-center">✓ Ya tienes acceso a este curso</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => curso.precio === 0 ? onComprar(curso.id) : onAgregarCarrito(curso)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      {curso.precio === 0 ? 'Inscribirse gratis' : 'Agregar al carrito'}
                    </button>
                    {curso.precio > 0 && (
                      <button
                        onClick={() => onComprar(curso.id)}
                        className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 rounded-lg font-medium transition-colors"
                      >
                        Comprar ahora
                      </button>
                    )}
                  </div>
                )}

                {/* Garantía */}
                {curso.garantia_dias > 0 && (
                  <p className="text-sm text-gray-600 text-center mt-3">
                    Garantía de devolución de {curso.garantia_dias} días
                  </p>
                )}

                {/* Incluye */}
                <div className="mt-6 space-y-2 text-sm">
                  <h4 className="font-semibold">Este curso incluye:</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>🕒 {curso.duracion} de video bajo demanda</p>
                    <p>📖 {curso.modulos} módulos</p>
                    {curso.acceso_de_por_vida && <p>♾️ Acceso de por vida</p>}
                    {curso.certificado && <p>🏆 Certificado de finalización</p>}
                    <p>📱 Acceso en móvil y TV</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del curso */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Lo que aprenderás */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Lo que aprenderás</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {curso.que_aprenderas.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido del curso */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Contenido del curso</h2>
              <p className="text-gray-600 mb-4">
                {curso.modulos} módulos • {curso.duracion} duración total
              </p>
              
              <div className="space-y-2">
                {curso.contenido.map((modulo, index) => (
                  <div key={index} className="border rounded-lg">
                    <button
                      onClick={() => setModuloExpandido(moduloExpandido === index ? null : index)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <div>
                        <span className="font-medium">Módulo {modulo.modulo}: {modulo.titulo}</span>
                        <span className="text-sm text-gray-500 ml-2">({modulo.duracion})</span>
                      </div>
                      <span className="text-gray-400">
                        {moduloExpandido === index ? '−' : '+'}
                      </span>
                    </button>
                    
                    {moduloExpandido === index && (
                      <div className="px-4 pb-3 border-t bg-gray-50">
                        <div className="space-y-2 pt-3">
                          {modulo.lecciones.map((leccion, leccionIndex) => (
                            <div key={leccionIndex} className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">
                                  {leccion.tipo === 'video' ? '▶️' : leccion.tipo === 'audio' ? '🎵' : '📝'}
                                </span>
                                <span>{leccion.titulo}</span>
                              </div>
                              <span className="text-gray-500">{leccion.duracion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requisitos */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Requisitos</h2>
              <ul className="space-y-2">
                {curso.requisitos.map((requisito, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span className="text-gray-700">{requisito}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Instructor</h3>
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  {curso.instructor.nombre.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">{curso.instructor.nombre}</h4>
                  <p className="text-sm text-gray-600 mb-2">{curso.instructor.descripcion}</p>
                  <p className="text-sm text-gray-700">{curso.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Temas</h3>
              <div className="flex flex-wrap gap-2">
                {curso.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VistaCarrito = ({ carrito, onEliminar, onVolver, onComprar, total }) => {
  const procesarCompra = () => {
    carrito.forEach(curso => onComprar(curso.id));
    alert('¡Compra realizada con éxito! Ahora tienes acceso a todos los cursos.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Carrito de compras</h1>
        <button
          onClick={onVolver}
          className="text-purple-600 hover:text-purple-800 transition-colors"
        >
          ← Seguir comprando
        </button>
      </div>

      {carrito.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🛒</span>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-6">Explora nuestros cursos y encuentra el perfecto para ti</p>
          <button
            onClick={onVolver}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Explorar cursos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de cursos */}
          <div className="lg:col-span-2 space-y-4">
            {carrito.map(curso => (
              <div key={curso.id} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{curso.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-2">Por {curso.instructor.nombre}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>⭐ {curso.calificacion}</span>
                      <span>•</span>
                      <span>{curso.duracion}</span>
                      <span>•</span>
                      <span>{curso.modulos} módulos</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">${curso.precio}</p>
                    <button
                      onClick={() => onEliminar(curso.id)}
                      className="text-red-500 hover:text-red-700 text-sm mt-2 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-4">
              <h3 className="text-lg font-bold mb-4">Resumen</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Descuentos:</span>
                  <span>-$0.00</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={procesarCompra}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors mb-4"
              >
                Proceder al pago
              </button>

              <div className="text-xs text-gray-500 text-center">
                <p>Garantía de devolución de 30 días</p>
                <p>Acceso de por vida</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademiaAngelica;

