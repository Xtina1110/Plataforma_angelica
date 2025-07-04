import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cartasAngelicas, temasConsulta, tiposDeCartas } from '../data/cartasAngelicas';
import { ArrowLeft, Download, Users, Loader2 } from 'lucide-react'; // Added Loader2 for spinner
import { generatePDF } from '../utils/pdfGenerator';

const TiradaAngelical = ({ onVolver }) => {
  const [fase, setFase] = useState('bienvenida');
  const [tipoTirada, setTipoTirada] = useState(3);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [cartasDisponibles, setCartasDisponibles] = useState([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [cartaActual, setCartaActual] = useState(0);
  const [mostrandoCarta, setMostrandoCarta] = useState(false);
  const [tiradaCompleta, setTiradaCompleta] = useState(false);
  const [generandoPDF, setGenerandoPDF] = useState(false);
  const [consultaEnVivo, setConsultaEnVivo] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  // Inicializar cartas disponibles
  useEffect(() => {
    const cartasBarajadas = [...cartasAngelicas].sort(() => Math.random() - 0.5);
    setCartasDisponibles(cartasBarajadas);
  }, []);

  // Reproducir sonido angelical
  const reproducirSonido = (tipo) => {
    console.log(`Reproduciendo sonido: ${tipo}`);
  };

  // Iniciar barajado
  const iniciarBarajado = () => {
    setFase('barajando');
    reproducirSonido('barajado');
    setTimeout(() => {
      setFase('seleccion-cartas');
    }, 3000);
  };

  // Seleccionar carta
  const seleccionarCarta = (carta) => {
    if (cartasSeleccionadas.length < tipoTirada) {
      const nuevasCartas = [...cartasSeleccionadas, carta];
      setCartasSeleccionadas(nuevasCartas);
      reproducirSonido('seleccion');
      if (nuevasCartas.length === tipoTirada) {
        setTimeout(() => {
          setFase('revelacion');
          setCartaActual(0);
          setMostrandoCarta(true);
        }, 1000);
      }
    }
  };

  // Revelar siguiente carta
  const siguienteCarta = () => {
    if (cartaActual < cartasSeleccionadas.length - 1) {
      setCartaActual(cartaActual + 1);
      setMostrandoCarta(true);
      reproducirSonido('revelacion');
    } else {
      setTiradaCompleta(true);
    }
  };

  // Nueva tirada
  const nuevaTirada = () => {
    setFase('bienvenida');
    setTipoTirada(3);
    setTemaSeleccionado(null);
    setCartasSeleccionadas([]);
    setCartaActual(0);
    setMostrandoCarta(false);
    setTiradaCompleta(false);
    setConsultaEnVivo(false);
    setPdfError(null);
    const cartasBarajadas = [...cartasAngelicas].sort(() => Math.random() - 0.5);
    setCartasDisponibles(cartasBarajadas);
  };

  // Validar datos para PDF
  const validarDatosPDF = () => {
    if (!temaSeleccionado) return false;
    if (cartasSeleccionadas.length !== tipoTirada) return false;
    for (const carta of cartasSeleccionadas) {
      if (!carta.nombre || !carta.imagen || !carta.mensaje) return false;
      // Simple URL check for image (can be more robust)
      if (typeof carta.imagen !== 'string' || !carta.imagen.startsWith('http')) {
          console.warn(`Imagen inválida para la carta ${carta.nombre}: ${carta.imagen}`);
          // Allow generation with placeholder, but log it
      }
    }
    return true;
  };

  // Exportar a PDF
  const exportarPDF = async () => {
    setPdfError(null);
    if (!validarDatosPDF()) {
      setPdfError('Faltan datos para generar el PDF. Asegúrate de completar la tirada.');
      alert('Faltan datos para generar el PDF. Asegúrate de completar la tirada.');
      return;
    }
    setGenerandoPDF(true);
    try {
      const readingData = {
        tipoTirada: tiposDeCartas[tipoTirada]?.nombre || `Tirada de ${tipoTirada} cartas`,
        tema: temaSeleccionado?.nombre || 'Sin tema específico',
        cartas: cartasSeleccionadas.map(carta => ({
          ...carta,
          // Ensure image URL is valid or use placeholder
          imagen: (typeof carta.imagen === 'string' && carta.imagen.startsWith('http')) 
                    ? carta.imagen 
                    : '/placeholder-card-image.png' // Placeholder image path
        })),
        fecha: new Date().toISOString(),
        consultaEnVivo: consultaEnVivo
      };
      
      const pdfBlob = await generatePDF(readingData); // generatePDF is now async
      
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tirada-angelical-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      setPdfError('Hubo un error al generar el PDF. Por favor intenta nuevamente.');
      alert('Hubo un error al generar el PDF. Por favor intenta nuevamente.');
    } finally {
      setGenerandoPDF(false);
    }
  };

  // Solicitar consulta en vivo
  const solicitarConsultaEnVivo = () => {
    alert('Tu solicitud de Consulta en Vivo ha sido recibida. Un angelólogo se pondrá en contacto contigo pronto.');
  };

  const puedeGenerarPDF = tiradaCompleta && validarDatosPDF();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onVolver}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Volver al Dashboard
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                🃏 Tirada Angelical
              </h1>
              <p className="text-gray-600">Conecta con la sabiduría celestial a través de las cartas angelicales</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Fase 1: Bienvenida */}
          {fase === 'bienvenida' && (
            <motion.div
              key="bienvenida"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* ... (contenido de bienvenida sin cambios) ... */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">⭐</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Bienvenido a tu Consulta Angelical
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Los ángeles están listos para compartir su sabiduría contigo. 
                  Toma un momento para centrarte y formular tu pregunta en tu corazón.
                </p>
              </div>

              <button
                onClick={() => setFase('seleccion-tipo')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {/* Fase 2: Selección de tipo de tirada */}
          {fase === 'seleccion-tipo' && (
            <motion.div
              key="seleccion-tipo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* ... (contenido de selección de tipo sin cambios) ... */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔮</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Elige el tipo de tirada
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Selecciona el número de cartas según la profundidad de guía que buscas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {Object.entries(tiposDeCartas).map(([numero, tipo]) => (
                  <motion.div
                    key={numero}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      tipoTirada === parseInt(numero)
                        ? `border-purple-500 bg-gradient-to-r ${tipo.color} text-white shadow-lg`
                        : 'border-gray-200 bg-white/80 hover:border-purple-300'
                    }`}
                    onClick={() => setTipoTirada(parseInt(numero))}
                  >
                    <div className="text-4xl mb-4">{tipo.icono}</div>
                    <h3 className="text-xl font-bold mb-2">{tipo.nombre}</h3>
                    <p className={`text-sm ${tipoTirada === parseInt(numero) ? 'text-white/90' : 'text-gray-600'}`}>
                      {tipo.descripcion}
                    </p>
                  </motion.div>
                ))}
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    consultaEnVivo
                      ? 'border-purple-500 bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                      : 'border-gray-200 bg-white/80 hover:border-purple-300'
                  }`}
                  onClick={() => setConsultaEnVivo(!consultaEnVivo)}
                >
                  <div className="text-4xl mb-4">👩‍💻</div>
                  <h3 className="text-xl font-bold mb-2">Consulta en Vivo</h3>
                  <p className={`text-sm ${consultaEnVivo ? 'text-white/90' : 'text-gray-600'}`}>
                    Sesión personalizada con un angelólogo certificado
                  </p>
                </motion.div>
              </div>

              <button
                onClick={() => setFase('seleccion-tema')}
                className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {/* Fase 3: Selección de tema */}
          {fase === 'seleccion-tema' && (
            <motion.div
              key="seleccion-tema"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* ... (contenido de selección de tema sin cambios) ... */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">❓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Elige el tema de tu consulta
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Selecciona el área de tu vida sobre la que deseas recibir guía angelical
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {temasConsulta.map((tema) => (
                  <motion.div
                    key={tema.id}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      temaSeleccionado?.id === tema.id
                        ? `border-purple-500 bg-gradient-to-r ${tema.color} text-white shadow-lg`
                        : 'border-gray-200 bg-white/80 hover:border-purple-300'
                    }`}
                    onClick={() => setTemaSeleccionado(tema)}
                  >
                    <div className="text-4xl mb-4">{tema.icono}</div>
                    <h3 className="text-lg font-bold mb-2">{tema.nombre}</h3>
                    <p className={`text-sm ${temaSeleccionado?.id === tema.id ? 'text-white/90' : 'text-gray-600'}`}>
                      {tema.descripcion}
                    </p>
                  </motion.div>
                ))}
              </div>

              {temaSeleccionado && (
                <button
                  onClick={consultaEnVivo ? solicitarConsultaEnVivo : iniciarBarajado}
                  className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {consultaEnVivo ? 'Solicitar Consulta en Vivo' : `Comenzar Tirada de ${tipoTirada} Cartas`}
                </button>
              )}
            </motion.div>
          )}

          {/* Fase 4: Barajado */}
          {fase === 'barajando' && (
            <motion.div
              key="barajando"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* ... (contenido de barajado sin cambios) ... */}
              <div className="mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <span className="text-4xl">⭐</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Los Ángeles están barajando las cartas...
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Mantén tu pregunta en el corazón mientras las energías angelicales 
                  seleccionan las cartas perfectas para ti.
                </p>
              </div>
            </motion.div>
          )}

          {/* Fase 5: Selección de cartas */}
          {fase === 'seleccion-cartas' && (
            <motion.div
              key="seleccion-cartas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* ... (contenido de selección de cartas sin cambios) ... */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Selecciona {tipoTirada} cartas
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                  Deja que tu intuición te guíe hacia las cartas que los ángeles han preparado para ti
                </p>
                <div className="text-lg font-medium text-purple-600">
                  {cartasSeleccionadas.length} de {tipoTirada} cartas seleccionadas
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {cartasDisponibles.slice(0, 27).map((carta, index) => (
                  <motion.div
                    key={carta.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className={`aspect-[2/3] rounded-xl cursor-pointer transition-all duration-300 ${
                      cartasSeleccionadas.find(c => c.id === carta.id)
                        ? 'ring-4 ring-purple-500 scale-105 shadow-xl'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => seleccionarCarta(carta)}
                  >
                    <img
                      src="/images/cartas/carta-reverso.png"
                      alt="Reverso de carta angelical"
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fase 6: Revelación de cartas */}
          {fase === 'revelacion' && mostrandoCarta && cartasSeleccionadas[cartaActual] && (
            <motion.div
              key={`carta-${cartaActual}`}
              initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              transition={{ duration: 0.8 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {cartasSeleccionadas[cartaActual].nombre}
              </h2>
              <p className="text-gray-500 mb-1">Carta {cartaActual + 1} de {tipoTirada}</p>
              <p className="text-lg font-semibold text-purple-700 mb-6">
                {cartasSeleccionadas[cartaActual].posicion || `Mensaje para ti`}
              </p>
              
              <div className="aspect-[2/3] max-w-xs mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl ring-2 ring-purple-300">
                <img 
                  src={cartasSeleccionadas[cartaActual].imagen} 
                  alt={cartasSeleccionadas[cartaActual].nombre} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="/placeholder-card-image.png"; }} // Placeholder on error
                />
              </div>

              <div className="space-y-1 mb-6 text-left max-w-md mx-auto">
                <p><strong className="text-purple-600">Color:</strong> {cartasSeleccionadas[cartaActual].color}</p>
                <p><strong className="text-purple-600">Cristal:</strong> {cartasSeleccionadas[cartaActual].cristal}</p>
                <p><strong className="text-purple-600">Elemento:</strong> {cartasSeleccionadas[cartaActual].elemento}</p>
              </div>
              
              <div className="text-gray-700 leading-relaxed mb-8 text-left max-w-md mx-auto" dangerouslySetInnerHTML={{ __html: cartasSeleccionadas[cartaActual].mensaje.replace(/\n/g, '<br />') }}></div>
              
              <p className="text-purple-700 font-semibold italic mb-8 text-left max-w-md mx-auto">
                Afirmación: "{cartasSeleccionadas[cartaActual].afirmacion}"
              </p>

              <button
                onClick={siguienteCarta}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {cartaActual < cartasSeleccionadas.length - 1 ? 'Siguiente Carta' : 'Ver Resumen de Tirada'}
              </button>
            </motion.div>
          )}

          {/* Fase 7: Tirada Completa / Resumen */}
          {tiradaCompleta && (
            <motion.div
              key="tirada-completa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                Resumen de tu Tirada Angelical
              </h2>
              <p className="text-center text-gray-600 mb-2"><strong>Tipo de Tirada:</strong> {tiposDeCartas[tipoTirada]?.nombre || `Tirada de ${tipoTirada} cartas`}</p>
              <p className="text-center text-gray-600 mb-8"><strong>Tema de Consulta:</strong> {temaSeleccionado?.nombre || 'Sin tema específico'}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {cartasSeleccionadas.map((carta, index) => (
                  <div key={index} className="bg-purple-50/50 p-6 rounded-2xl shadow-lg ring-1 ring-purple-200">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{carta.nombre}</h3>
                    <p className="text-sm text-gray-500 mb-3">{carta.posicion || `Carta ${index + 1}`}</p>
                    <div className="aspect-[2/3] w-full mb-4 rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={carta.imagen} 
                        alt={carta.nombre} 
                        className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src="/placeholder-card-image.png"; }}                     />
                    </div>
                    <p className="text-xs text-gray-600 mb-1"><strong>Color:</strong> {carta.color}</p>
                    <p className="text-xs text-gray-600 mb-1"><strong>Cristal:</strong> {carta.cristal}</p>
                    <p className="text-xs text-gray-600 mb-3"><strong>Elemento:</strong> {carta.elemento}</p>
                    <p className="text-sm text-gray-700 leading-tight line-clamp-3 mb-2" title={carta.mensaje.replace(/<[^>]+>/g, 
'')}>{carta.mensaje.replace(/<[^>]+>/g, 
'')}</p>
                    <p className="text-sm text-purple-600 italic">Afirmación: "{carta.afirmacion}"</p>
                  </div>
                ))}
              </div>

              {pdfError && (
                <div className="text-center text-red-600 mb-4 p-3 bg-red-100 rounded-lg">
                  {pdfError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <button
                  onClick={exportarPDF}
                  disabled={generandoPDF || !puedeGenerarPDF}
                  className={`flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg ${
                    (generandoPDF || !puedeGenerarPDF) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {generandoPDF ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Generando PDF...</>
                  ) : (
                    <><Download className="w-5 h-5" /> Descargar PDF de la Tirada</>
                  )}
                </button>
                
                {(tipoTirada === 3 || tipoTirada === 6 || tipoTirada === 9) && (
                    <button
                        onClick={solicitarConsultaEnVivo}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        <Users className="w-5 h-5" /> Solicitar Lectura en Vivo
                    </button>
                )}

                <button
                  onClick={nuevaTirada}
                  className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Nueva Tirada
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TiradaAngelical;

