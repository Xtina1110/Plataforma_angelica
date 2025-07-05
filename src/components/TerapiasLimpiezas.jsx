import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Star, Users, Shield, Sparkles, Heart } from 'lucide-react';

const TerapiasYLimpiezas = ({ onVolver }) => {
  const [categoriaActiva, setCategoriaActiva] = useState('terapias');
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [mostrarReserva, setMostrarReserva] = useState(false);

  // Base de datos de servicios
  const categorias = {
    terapias: {
      titulo: "Terapias Angelicales",
      icono: "✨",
      color: "from-purple-500 to-pink-500",
      descripcion: "Sesiones terapéuticas guiadas por ángeles para sanar cuerpo, mente y espíritu",
      servicios: [
        {
          id: 1,
          titulo: "Terapia de Sanación Angelical",
          descripcion: "Sesión personalizada donde los ángeles canalizan energía sanadora para equilibrar tus chakras y restaurar tu campo energético.",
          duracion: "60 minutos",
          precio: 89.99,
          beneficios: [
            "Limpieza energética completa",
            "Equilibrio de chakras",
            "Conexión con tu ángel guardián",
            "Mensajes canalizados para tu sanación"
          ],
          imagen: "/terapias/sanacion-angelical.jpg",
          terapeuta: "Luz María Ángel",
          estrellas: 5
        },
        {
          id: 2,
          titulo: "Terapia de Cristales y Ángeles",
          descripcion: "Combinación poderosa de la energía de los cristales y la guía angelical para desbloquear y sanar aspectos específicos de tu vida.",
          duracion: "75 minutos",
          precio: 109.99,
          beneficios: [
            "Selección personalizada de cristales",
            "Activación de códigos angelicales",
            "Limpieza de patrones limitantes",
            "Elevación de frecuencia vibratoria"
          ],
          imagen: "/terapias/cristales-angeles.jpg",
          terapeuta: "Gabriel Cristal",
          estrellas: 4.9
        },
        {
          id: 3,
          titulo: "Terapia de Regresión Angelical",
          descripcion: "Viaje guiado por los ángeles a vidas pasadas para sanar traumas y comprender tu misión de vida actual.",
          duracion: "90 minutos",
          precio: 129.99,
          beneficios: [
            "Sanación de traumas de vidas pasadas",
            "Comprensión de patrones kármicos",
            "Liberación de contratos energéticos",
            "Reconexión con tu propósito divino"
          ],
          imagen: "/terapias/regresion-angelical.jpg",
          terapeuta: "Rafael Memoria",
          estrellas: 4.8
        }
      ]
    },
    limpiezas: {
      titulo: "Limpiezas Energéticas",
      icono: "🔮",
      color: "from-blue-500 to-cyan-500",
      descripcion: "Rituales de purificación para espacios y personas, eliminando energías densas y restaurando armonía",
      servicios: [
        {
          id: 4,
          titulo: "Limpieza Energética Personal",
          descripcion: "Ritual completo de limpieza de tu campo energético, aura y chakras para eliminar bloqueos y energías negativas acumuladas.",
          duracion: "45 minutos",
          precio: 69.99,
          beneficios: [
            "Eliminación de energías negativas",
            "Protección energética",
            "Sellado del aura",
            "Elevación vibratoria"
          ],
          imagen: "/terapias/limpieza-personal.jpg",
          terapeuta: "Uriel Purificación",
          estrellas: 4.9
        },
        {
          id: 5,
          titulo: "Limpieza de Hogar o Negocio",
          descripcion: "Ritual angelical para purificar espacios, eliminar energías estancadas y crear un ambiente de prosperidad y armonía.",
          duracion: "120 minutos",
          precio: 149.99,
          beneficios: [
            "Eliminación de energías densas",
            "Armonización del espacio",
            "Activación de prosperidad",
            "Protección angelical permanente"
          ],
          imagen: "/terapias/limpieza-hogar.jpg",
          terapeuta: "Miguel Protector",
          estrellas: 5
        },
        {
          id: 6,
          titulo: "Limpieza de Objetos y Cristales",
          descripcion: "Purificación energética de objetos personales, joyas, cristales y herramientas espirituales para potenciar su energía.",
          duracion: "30 minutos",
          precio: 49.99,
          beneficios: [
            "Eliminación de memorias energéticas",
            "Programación angelical",
            "Potenciación de propiedades",
            "Conexión con energías superiores"
          ],
          imagen: "/terapias/limpieza-objetos.jpg",
          terapeuta: "Chamuel Pureza",
          estrellas: 4.7
        }
      ]
    },
    rituales: {
      titulo: "Rituales Angelicales",
      icono: "🕯️",
      color: "from-green-500 to-teal-500",
      descripcion: "Ceremonias sagradas guiadas por ángeles para manifestación, protección y transformación espiritual",
      servicios: [
        {
          id: 7,
          titulo: "Ritual de Abundancia Angelical",
          descripcion: "Poderoso ritual con los ángeles de la abundancia para abrir tus canales de prosperidad y manifestar riqueza en todas las áreas.",
          duracion: "60 minutos",
          precio: 99.99,
          beneficios: [
            "Activación de códigos de abundancia",
            "Eliminación de bloqueos financieros",
            "Conexión con ángeles de prosperidad",
            "Programación de metas materiales"
          ],
          imagen: "/terapias/ritual-abundancia.jpg",
          terapeuta: "Jofiel Prosperidad",
          estrellas: 4.9
        },
        {
          id: 8,
          titulo: "Ritual de Protección Arcangélica",
          descripcion: "Ritual sagrado con los 7 arcángeles para crear un escudo de protección divina contra energías negativas y ataques psíquicos.",
          duracion: "75 minutos",
          precio: 119.99,
          beneficios: [
            "Escudo energético permanente",
            "Corte de lazos energéticos negativos",
            "Protección del hogar y familia",
            "Conexión con arcángel Miguel"
          ],
          imagen: "/terapias/ritual-proteccion.jpg",
          terapeuta: "Miguel Escudo",
          estrellas: 5
        }
      ]
    }
  };

  // Función para reservar servicio
  const reservarServicio = (fecha, hora) => {
    alert(`¡Reserva confirmada para ${servicioSeleccionado.titulo} el ${fecha} a las ${hora}! Un angelólogo se pondrá en contacto contigo pronto.`);
    setMostrarReserva(false);
    setServicioSeleccionado(null);
  };

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
                ✨ Terapias y Limpiezas
              </h1>
              <p className="text-gray-600">Sanación angelical para tu cuerpo, mente y espíritu</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Navegación de categorías */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {Object.entries(categorias).map(([key, categoria]) => (
            <button
              key={key}
              onClick={() => setCategoriaActiva(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                categoriaActiva === key
                  ? `bg-gradient-to-r ${categoria.color} text-white shadow-lg scale-105`
                  : 'bg-white/70 text-gray-700 hover:bg-white/90 hover:scale-105'
              }`}
            >
              <span className="mr-2">{categoria.icono}</span>
              {categoria.titulo}
            </button>
          ))}
        </div>

        {/* Descripción de la categoría */}
        <div className="text-center mb-8">
          <p className="text-gray-600 max-w-2xl mx-auto">
            {categorias[categoriaActiva].descripcion}
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias[categoriaActiva].servicios.map((servicio) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              {/* Imagen del servicio (placeholder) */}
              <div className="h-48 bg-gradient-to-r from-purple-200 to-blue-200 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white/70" />
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {servicio.titulo}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{servicio.estrellas}</span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4">
                  {servicio.descripcion}
                </p>

                {/* Detalles */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{servicio.duracion}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{servicio.terapeuta}</span>
                  </div>
                </div>

                {/* Precio */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold text-green-600">
                    ${servicio.precio}
                  </div>
                  <div className="text-xs text-gray-500">USD</div>
                </div>

                {/* Beneficios */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-700 mb-2">Beneficios:</div>
                  <ul className="space-y-1">
                    {servicio.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de reserva */}
                <button
                  onClick={() => {
                    setServicioSeleccionado(servicio);
                    setMostrarReserva(true);
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Reservar Ahora
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de reserva */}
      <AnimatePresence>
        {mostrarReserva && servicioSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Reservar Sesión
                </h3>
                <p className="text-gray-600 mt-2">
                  {servicioSeleccionado.titulo}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors">
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    rows="3"
                    placeholder="Información adicional para el terapeuta..."
                  ></textarea>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-800">
                    Total a pagar
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    ${servicioSeleccionado.precio}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarReserva(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => reservarServicio("2023-06-15", "10:00 AM")}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  Confirmar Reserva
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerapiasYLimpiezas;
