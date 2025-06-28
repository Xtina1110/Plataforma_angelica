import React, { useState } from 'react';
import './BlogPodcast.css';
import { Book, Headphones, Calendar, PlayCircle, Share2, Heart, MessageSquare } from 'lucide-react';

const contenido = [
  {
    id: 1,
    tipo: 'blog',
    titulo: 'Los 7 Arcángeles Principales y Cómo Invocarlos',
    fecha: '15 de Junio, 2024',
    autor: 'Juan Carlos Ávila',
    resumen: 'Descubre las funciones de los arcángeles más influyentes y aprende a conectar con su energía para recibir guía y protección en tu vida diaria.',
    imagen: '/assets/blog/arcangeles_blog.jpg',
    link: '#'
  },
  {
    id: 2,
    tipo: 'podcast',
    titulo: 'Episodio 1: Sanando el Linaje Familiar con Ángeles',
    fecha: '10 de Junio, 2024',
    autor: 'Juan Carlos Ávila',
    resumen: 'En este primer episodio, exploramos cómo los ángeles pueden ayudarte a sanar patrones ancestrales y liberar cargas que no te pertenecen.',
    imagen: '/assets/podcast/linaje_podcast.jpg',
    link: '#'
  },
  {
    id: 3,
    tipo: 'blog',
    titulo: 'La Importancia de la Meditación Angélica Diaria',
    fecha: '08 de Junio, 2024',
    autor: 'Juan Carlos Ávila',
    resumen: 'Integrar la meditación con ángeles en tu rutina puede transformar tu vida, aportando paz, claridad y una conexión más profunda con lo divino.',
    imagen: '/assets/blog/meditacion_blog.jpg',
    link: '#'
  },
  {
    id: 4,
    tipo: 'podcast',
    titulo: 'Episodio 2: Cómo Interpretar las Señales de tus Ángeles',
    fecha: '05 de Junio, 2024',
    autor: 'Juan Carlos Ávila',
    resumen: 'Aprende a reconocer y entender los mensajes que tus ángeles te envían a través de plumas, números repetidos, sueños y más.',
    imagen: '/assets/podcast/senales_podcast.jpg',
    link: '#'
  },
  {
    id: 5,
    tipo: 'blog',
    titulo: 'Rituales Angélicos para Atraer la Abundancia',
    fecha: '01 de Junio, 2024',
    autor: 'Juan Carlos Ávila',
    resumen: 'Descubre poderosos rituales y afirmaciones para abrir tus canales a la prosperidad y manifestar la abundancia en todas las áreas de tu vida.',
    imagen: '/assets/blog/abundancia_blog.jpg',
    link: '#'
  },
  {
    id: 6,
    tipo: 'podcast',
    titulo: 'Episodio 3: El Poder del Perdón con la Ayuda de los Ángeles',
    fecha: '28 de Mayo, 2024',
    autor: 'Juan Carlos Ávila',
    resumen: 'Un viaje transformador hacia el perdón, liberando cargas emocionales y encontrando paz interior con la guía amorosa de los ángeles.',
    imagen: '/assets/podcast/perdon_podcast.jpg',
    link: '#'
  },
];

const BlogPodcast = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos'); // 'todos', 'blog', 'podcast'

  const contenidoFiltrado = contenido.filter(item => 
    filtroTipo === 'todos' ? true : item.tipo === filtroTipo
  );

  return (
    <div className="blog-podcast">
      <h2 className="titulo-seccion"><Book /> Blog & Podcast</h2>
      <p className="subtitulo-seccion">Explora artículos inspiradores y escucha episodios que elevan tu espíritu.</p>

      <div className="filtros">
        <button 
          className={`btn-filtro ${filtroTipo === 'todos' ? 'activo' : ''}`}
          onClick={() => setFiltroTipo('todos')}
        >
          Todos
        </button>
        <button 
          className={`btn-filtro ${filtroTipo === 'blog' ? 'activo' : ''}`}
          onClick={() => setFiltroTipo('blog')}
        >
          <Book size={18} /> Blog
        </button>
        <button 
          className={`btn-filtro ${filtroTipo === 'podcast' ? 'activo' : ''}`}
          onClick={() => setFiltroTipo('podcast')}
        >
          <Headphones size={18} /> Podcast
        </button>
      </div>

      <div className="lista-contenido">
        {contenidoFiltrado.map((item) => (
          <div key={item.id} className="card-contenido">
            <img src={item.imagen} alt={item.titulo} className="imagen-contenido" />
            <div className="info-contenido">
              <div className="tipo-tag">
                {item.tipo === 'blog' ? <Book size={16} /> : <Headphones size={16} />}
                {item.tipo === 'blog' ? 'Artículo' : 'Episodio'}
              </div>
              <h3>{item.titulo}</h3>
              <p className="meta-info">
                <Calendar size={14} /> {item.fecha} | <User size={14} /> {item.autor}
              </p>
              <p className="resumen">{item.resumen}</p>
              <div className="acciones-card">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-leer-escuchar">
                  {item.tipo === 'blog' ? 'Leer Artículo' : 'Escuchar Episodio'} {item.tipo === 'podcast' && <PlayCircle size={18} />}
                </a>
                <button className="btn-accion-secundaria"><Heart size={18} /></button>
                <button className="btn-accion-secundaria"><Share2 size={18} /></button>
                <button className="btn-accion-secundaria"><MessageSquare size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPodcast;
