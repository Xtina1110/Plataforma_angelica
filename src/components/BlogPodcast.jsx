import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blogArticles, podcastEpisodes, socialLinks, categories } from '../data/blogPodcastData';

const BlogPodcast = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleBackToOptions = () => {
    setSelectedOption(null);
  };

  if (selectedOption === 'blog') {
    return <BlogSection onBack={handleBackToOptions} onMainBack={onBack} />;
  }

  if (selectedOption === 'podcast') {
    return <PodcastSection onBack={handleBackToOptions} onMainBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Volver al Dashboard
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Blog & Podcast Angelical
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reflexiones, entrevistas y sabiduría angelical para tu día a día
          </p>
        </motion.div>

        {/* Opciones principales */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Opción Blog */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
            onClick={() => handleOptionSelect('blog')}
          >
            {/* Recuadro superior */}
            <div className="h-32 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <span className="text-6xl">📖</span>
            </div>
            
            {/* Contenido */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Blog Espiritual</h3>
              <p className="text-gray-600 mb-6">
                Artículos profundos sobre conexión angelical, rituales sagrados y crecimiento espiritual
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-2">✨</span>
                  Guías paso a paso
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-2">📚</span>
                  Conocimiento profundo
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-2">🌟</span>
                  Experiencias reales
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all">
                Explorar Artículos
              </button>
            </div>
          </motion.div>

          {/* Opción Podcast */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
            onClick={() => handleOptionSelect('podcast')}
          >
            {/* Recuadro superior */}
            <div className="h-32 bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
              <span className="text-6xl">🎙️</span>
            </div>
            
            {/* Contenido */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Podcast Angelical</h3>
              <p className="text-gray-600 mb-6">
                Episodios inspiradores con meditaciones, entrevistas y sabiduría angelical
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <span className="text-pink-500 mr-2">🎧</span>
                  Meditaciones guiadas
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-pink-500 mr-2">💬</span>
                  Entrevistas especiales
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-pink-500 mr-2">🌈</span>
                  Contenido semanal
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all">
                Escuchar Episodios
              </button>
            </div>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Síguenos en nuestras redes sociales para contenido diario
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-2xl">📱</span>
            <span className="text-2xl">💜</span>
            <span className="text-2xl">🙏</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Componente del Blog
const BlogSection = ({ onBack, onMainBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = selectedCategory === 'Todos' 
    ? blogArticles 
    : blogArticles.filter(article => article.category === selectedCategory);

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Volver a Opciones
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Blog Espiritual
          </h1>
          <p className="text-xl text-gray-600">
            Artículos profundos sobre conexión angelical y crecimiento espiritual
          </p>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.blog.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-600 hover:bg-purple-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de artículos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 font-semibold">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {article.author} • {article.date}
                  </span>
                  <button className="text-purple-600 hover:text-purple-800 font-semibold">
                    Leer más →
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enlaces a redes sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Síguenos en Redes Sociales
          </h3>
          <p className="text-gray-600 mb-6">
            Contenido diario de inspiración angelical
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                <span className="text-lg">
                  {platform === 'instagram' && '📷'}
                  {platform === 'youtube' && '📺'}
                  {platform === 'facebook' && '📘'}
                  {platform === 'tiktok' && '🎵'}
                  {platform === 'telegram' && '✈️'}
                </span>
                <span className="capitalize font-semibold">{platform}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Componente del Podcast
const PodcastSection = ({ onBack, onMainBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredEpisodes = selectedCategory === 'Todos' 
    ? podcastEpisodes 
    : podcastEpisodes.filter(episode => episode.category === selectedCategory);

  const handleWatchEpisode = (youtubeUrl) => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-pink-600 hover:text-pink-800 transition-colors"
          >
            ← Volver a Opciones
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Podcast Angelical
          </h1>
          <p className="text-xl text-gray-600">
            Episodios inspiradores con meditaciones y sabiduría angelical
          </p>
        </motion.div>

        {/* Información del canal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">🎙️ Podcast Angélica Luz</h2>
              <p className="text-pink-100 mb-4">
                Conecta con la sabiduría angelical a través de meditaciones guiadas, 
                entrevistas inspiradoras y enseñanzas espirituales profundas.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span>📺 {podcastEpisodes.length} Episodios</span>
                <span>👥 12.5K Suscriptores</span>
                <span>⭐ 4.9/5 Calificación</span>
              </div>
            </div>
            <button
              onClick={() => window.open('https://youtube.com/@angelicaluzespiritual', '_blank')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <span>📺</span>
              <span>Suscribirse</span>
            </button>
          </div>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.podcast.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-pink-600 hover:bg-pink-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de episodios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleWatchEpisode(episode.youtubeUrl)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2 transform scale-95 group-hover:scale-100 transition-transform"
                  >
                    <span className="text-xl">▶</span>
                    <span>Ver en YouTube</span>
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {episode.duration}
                </div>
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  NUEVO
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-pink-600 font-semibold bg-pink-100 px-3 py-1 rounded-full">
                    {episode.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {episode.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {episode.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {episode.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleWatchEpisode(episode.youtubeUrl)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center space-x-2"
                >
                  <span>🎧</span>
                  <span>Escuchar Episodio</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Episodio destacado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={podcastEpisodes[0]?.thumbnail} 
                alt="Episodio destacado"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ EPISODIO DESTACADO
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {podcastEpisodes[0]?.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {podcastEpisodes[0]?.description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">
                  Duración: {podcastEpisodes[0]?.duration}
                </span>
                <span className="text-sm text-gray-500">
                  {podcastEpisodes[0]?.date}
                </span>
              </div>
              <button
                onClick={() => handleWatchEpisode(podcastEpisodes[0]?.youtubeUrl)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all flex items-center space-x-2"
              >
                <span>▶</span>
                <span>Reproducir Ahora</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Información adicional y suscripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🔔 No te Pierdas Ningún Episodio
          </h3>
          <p className="text-gray-600 mb-6">
            Suscríbete a nuestro canal de YouTube para recibir notificaciones de nuevos episodios 
            cada semana. Contenido angelical exclusivo, meditaciones guiadas y entrevistas inspiradoras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://youtube.com/@angelicaluzespiritual', '_blank')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>📺</span>
              <span>Suscribirse en YouTube</span>
            </button>
            <button
              onClick={() => window.open('https://t.me/angelicaluzespiritual', '_blank')}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>✈️</span>
              <span>Únete a Telegram</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Componente para vista individual de artículo
const ArticleView = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="mb-4 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Volver a Artículos
          </button>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center mb-6">
              <span className="text-gray-600">
                Por {article.author} • {article.date}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium leading-relaxed">
                {article.excerpt}
              </p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                  Compartir Artículo
                </button>
                <button className="bg-white border-2 border-purple-500 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                  Guardar para Después
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Artículos relacionados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Artículos Relacionados</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogArticles
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 2)
              .map((relatedArticle) => (
                <div key={relatedArticle.id} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPodcast;

