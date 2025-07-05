import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Download, Volume2, Heart, Shield, Star, Target, Sun, MessageCircle } from 'lucide-react';

const CanalizacionesAngelicales = ({ onVolver }) => {
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [audioReproduciendo, setAudioReproduciendo] = useState(false);
  const [mostrandoMensaje, setMostrandoMensaje] = useState(false);

  const temas = [
    {
      id: 'proposito-vida',
      nombre: 'Propósito de Vida',
      icono: <Target className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-600',
      descripcion: 'Descubre tu misión divina en esta encarnación',
      mensaje: `Querido ser de luz,

Tu propósito en esta vida trasciende lo que tu mente humana puede comprender. Has venido a este plano terrenal con una misión específica: ser un faro de luz para otros que aún caminan en la oscuridad.

Tu alma eligió las experiencias que has vivido, tanto las gozosas como las desafiantes, porque cada una de ellas te ha moldeado para convertirte en el instrumento divino que eres hoy. No hay coincidencias en tu camino.

El Arcángel Miguel te susurra: "Tu propósito se revela cuando sigues los impulsos de tu corazón, no los miedos de tu mente. Cada acto de amor, cada palabra de aliento, cada momento de compasión que ofreces, está cumpliendo tu misión divina."

Confía en el proceso. Tu propósito no es algo que debes encontrar afuera, sino algo que debes recordar desde adentro. Está escrito en las fibras de tu ser, en cada latido de tu corazón.

Hoy, permítete ser guiado por la intuición. Los ángeles te mostrarán señales claras del siguiente paso en tu camino. Mantén tu corazón abierto y tu mente receptiva.

Con amor infinito,
Tus Ángeles Guardianes`,
      afirmacion: "Soy un instrumento divino de luz y amor, cumpliendo mi propósito sagrado en cada momento."
    },
    {
      id: 'amor-propio',
      nombre: 'Amor Propio',
      icono: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-600',
      descripcion: 'Sana tu relación contigo mismo con amor divino',
      mensaje: `Amado hijo/a de la luz,

El amor propio no es egoísmo, es reconocimiento de tu naturaleza divina. Eres una extensión del Creador, una chispa de luz divina encarnada en forma humana. ¿Cómo podrías no amarte?

La Arcángel Chamuel te envuelve en su luz rosa y te recuerda: "El amor que buscas en otros ya vive en ti. Eres completo, eres perfecto tal como eres en este momento. Tus imperfecciones humanas son simplemente oportunidades para crecer en compasión hacia ti mismo."

Perdónate por los errores del pasado. Cada experiencia te ha enseñado algo valioso. Honra tu cuerpo como el templo sagrado que es. Nutre tu mente con pensamientos amorosos. Alimenta tu alma con momentos de silencio y conexión.

Cuando te mires al espejo, ve más allá de la forma física. Mira a los ojos del alma que te habita. Esa alma es pura, es amor, es luz. Esa eres tú en tu esencia más verdadera.

Hoy, comprométete a hablarte con la misma gentileza con la que le hablarías a un niño pequeño. Eres digno de amor, especialmente del tuyo propio.

Con ternura infinita,
Los Ángeles del Amor`,
      afirmacion: "Me amo y me acepto completamente. Soy digno de todo el amor del universo."
    },
    {
      id: 'proteccion-espiritual',
      nombre: 'Protección Espiritual',
      icono: <Shield className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      descripcion: 'Fortalece tu escudo energético angelical',
      mensaje: `Guerrero de la luz,

Estás rodeado por legiones de ángeles protectores que velan por tu seguridad en todos los planos de existencia. El Arcángel Miguel, con su espada de luz azul, corta todas las cuerdas energéticas que no te sirven y sella tu aura con protección divina.

Tu campo energético es sagrado. Tienes el poder y el derecho divino de decidir qué energías permites en tu espacio. Cuando sientes pesadez, negatividad o drenaje energético, es momento de invocar tu protección angelical.

Visualiza una burbuja de luz dorada que te rodea completamente. Esta luz es impenetrable para cualquier energía que no sea de amor puro. Dentro de esta burbuja, solo puede existir paz, amor y armonía.

Los ángeles te recuerdan: "No eres víctima de las energías externas. Eres un ser soberano con el poder de crear tu propia realidad energética. Usa tu discernimiento espiritual para alejarte de situaciones y personas que drenan tu luz."

Confía en tu intuición. Cuando algo no se siente bien, es porque no está alineado con tu bien mayor. Los ángeles siempre te guían hacia lo que es mejor para tu alma.

Con protección eterna,
La Legión de Miguel`,
      afirmacion: "Estoy protegido por la luz divina. Solo el amor puede tocar mi ser."
    },
    {
      id: 'confianza',
      nombre: 'Confianza',
      icono: <Star className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-600',
      descripcion: 'Desarrolla fe inquebrantable en ti y en lo divino',
      mensaje: `Ser valiente y luminoso,

La confianza verdadera no viene de saber que todo saldrá como esperas, sino de saber que todo saldrá como debe ser para tu mayor bien. El universo conspira a tu favor, siempre.

El Arcángel Jofiel ilumina tu mente con sabiduría dorada y te susurra: "Cada desafío que enfrentas es una oportunidad disfrazada. Cada 'no' que recibes te redirige hacia un 'sí' aún más grande. Cada puerta que se cierra te guía hacia la puerta correcta."

Tu alma es infinitamente sabia. Ha navegado por muchas experiencias y siempre ha encontrado el camino. Confía en esa sabiduría interna. Confía en los impulsos de tu corazón. Confía en las señales que el universo te envía.

Cuando sientes miedo, recuerda que el miedo es solo la ausencia de amor. Llena ese espacio con amor hacia ti mismo, amor hacia el proceso, amor hacia lo desconocido que se aproxima.

Eres más fuerte de lo que crees, más sabio de lo que imaginas, y más amado de lo que puedes comprender. Los ángeles caminan contigo en cada paso.

Con fe inquebrantable,
Los Ángeles de la Sabiduría`,
      afirmacion: "Confío en mi sabiduría interna y en el plan divino para mi vida."
    },
    {
      id: 'mision-alma',
      nombre: 'Misión del Alma',
      icono: <Sun className="w-8 h-8" />,
      color: 'from-amber-500 to-yellow-600',
      descripcion: 'Conecta con el plan sagrado de tu alma',
      mensaje: `Alma antigua y sabia,

Tu alma eligió venir a la Tierra en este momento específico de la historia porque tiene algo único que ofrecer. No eres un accidente cósmico; eres una respuesta divina a una necesidad del mundo.

La Arcángel Uriel te ilumina con la llama dorada de la sabiduría y te revela: "Tu misión no es grandiosa en términos humanos, sino en términos del corazón. Cada sonrisa que compartes, cada mano que extiendes, cada momento de presencia amorosa que ofreces, está sanando el mundo."

Tu alma vino aquí para experimentar el amor en forma física, para recordar su divinidad a través de la humanidad, y para ayudar a otros a recordar la suya. Eres un sanador, aunque no lo sepas. Eres un maestro, aunque no enseñes formalmente. Eres un ángel en forma humana.

Las experiencias difíciles que has vivido no fueron castigos, sino entrenamientos. Te han dado la compasión, la sabiduría y la fortaleza necesarias para cumplir tu misión. Cada cicatriz es una medalla de honor espiritual.

Escucha los susurros de tu alma. Te está guiando hacia las personas que necesitan tu luz, hacia las situaciones que requieren tu presencia, hacia el servicio que solo tú puedes ofrecer.

Con propósito divino,
El Consejo de Almas`,
      afirmacion: "Mi alma tiene una misión sagrada y estoy cumpliendo mi propósito divino."
    },
    {
      id: 'mensaje-dia',
      nombre: 'Mensaje del Día',
      icono: <MessageCircle className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-600',
      descripcion: 'Recibe la guía angelical para hoy',
      mensaje: `Querido ser de luz,

Hoy es un día especial porque tú estás en él. Los ángeles han preparado sincronicidades hermosas para ti. Mantén tus ojos abiertos a las señales, tu corazón receptivo a los milagros, y tu mente dispuesta a ver la magia en lo ordinario.

El mensaje de hoy viene del Arcángel Gabriel: "La comunicación divina fluye a través de ti hoy. Tus palabras tienen poder sanador. Úsalas para elevar, para consolar, para inspirar. Alguien necesita escuchar exactamente lo que tú tienes que decir."

Presta atención a los números repetidos, a las canciones que escuchas, a las conversaciones que captan tu atención, a los pensamientos que llegan de la nada. Todo es comunicación angelical.

Hoy es un día para soltar el control y fluir con la corriente divina. Confía en que estás exactamente donde necesitas estar, haciendo exactamente lo que necesitas hacer, siendo exactamente quien necesitas ser.

Si sientes pesadez, respira profundo y recuerda: eres amado más allá de toda medida. Si sientes alegría, compártela generosamente. Si sientes paz, irrádiala a tu alrededor.

Los ángeles te acompañan en cada momento de este día bendito.

Con amor presente,
Tus Guías Angelicales`,
      afirmacion: "Estoy abierto a recibir toda la guía y el amor que los ángeles tienen para mí hoy."
    }
  ];

  const seleccionarTema = (tema) => {
    setTemaSeleccionado(tema);
    setMostrandoMensaje(true);
    setAudioReproduciendo(false);
  };

  const toggleAudio = () => {
    setAudioReproduciendo(!audioReproduciendo);
  };

  const descargarPDF = () => {
    // Simular descarga de PDF
    alert(`Descargando PDF: "${temaSeleccionado.nombre}"\n\nEn producción, esto generaría un PDF con el mensaje canalizado.`);
  };

  const volverASeleccion = () => {
    setTemaSeleccionado(null);
    setMostrandoMensaje(false);
    setAudioReproduciendo(false);
  };

  return (
    <div className="min-h-screen spiritual-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={mostrandoMensaje ? volverASeleccion : onVolver}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> 
            {mostrandoMensaje ? 'Volver a Temas' : 'Volver al Dashboard'}
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!mostrandoMensaje ? (
          // Pantalla de selección de temas
          <motion.main
            key="seleccion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-6 py-12"
          >
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold title-spiritual mb-4" style={{ fontFamily: 'serif' }}>
                👼 Canalizaciones Angelicales
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'serif' }}>
                Recibe mensajes personalizados de tus ángeles guardianes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {temas.map((tema, index) => (
                <motion.div
                  key={tema.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="card-angelic overflow-hidden cursor-pointer border-2 border-[#D4AF37] bg-white"
                  onClick={() => seleccionarTema(tema)}
                >
                  <div className={`bg-gradient-to-br ${tema.color} text-white p-6 flex items-center justify-center`}>
                    {tema.icono}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'serif' }}>
                      {tema.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'serif' }}>
                      {tema.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="card-angelic p-8 max-w-2xl mx-auto border-2 border-[#D4AF37]">
                <h4 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
                  ¿Cómo funcionan las Canalizaciones?
                </h4>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  Cada mensaje ha sido canalizado directamente desde los reinos angelicales. 
                  Selecciona el tema que más resuene con tu corazón en este momento y permite 
                  que los ángeles te guíen con su sabiduría divina.
                </p>
              </div>
            </motion.div>
          </motion.main>
        ) : (
          // Pantalla del mensaje canalizado
          <motion.main
            key="mensaje"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto px-6 py-12"
          >
            <div className="text-center mb-8">
              <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${temaSeleccionado.color} rounded-full flex items-center justify-center mb-6`}>
                {temaSeleccionado.icono}
              </div>
              <h1 className="text-3xl font-bold title-spiritual mb-2" style={{ fontFamily: 'serif' }}>
                {temaSeleccionado.nombre}
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'serif' }}>
                {temaSeleccionado.descripcion}
              </p>
            </div>

            <div className="card-angelic p-8 mb-8 border-2 border-[#D4AF37]">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: 'serif', fontSize: '1.1rem', lineHeight: '1.8' }}
                >
                  {temaSeleccionado.mensaje}
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-[#D4AF37]/10 to-[#E6C55A]/10 rounded-xl border border-[#D4AF37]/30">
                <h4 className="font-bold text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>
                  Afirmación Angelical:
                </h4>
                <p 
                  className="text-gray-700 italic font-medium"
                  style={{ fontFamily: 'serif', fontSize: '1.1rem' }}
                >
                  "{temaSeleccionado.afirmacion}"
                </p>
              </div>
            </div>

            {/* Controles de audio y descarga */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={toggleAudio}
                className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
              >
                {audioReproduciendo ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {audioReproduciendo ? 'Pausar Audio' : 'Escuchar Audio Canalizado'}
              </button>

              <button
                onClick={descargarPDF}
                className="flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C55A] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#C19B26] hover:to-[#D4AF37] transition-all duration-300 shadow-lg"
              >
                <Download className="w-5 h-5" />
                Descargar PDF del Mensaje
              </button>
            </div>

            {audioReproduciendo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 card-angelic p-6 text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Volume2 className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700 font-medium">Reproduciendo mensaje canalizado...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 30, ease: "linear" }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Audio canalizado de {temaSeleccionado.nombre}
                </p>
              </motion.div>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CanalizacionesAngelicales;

