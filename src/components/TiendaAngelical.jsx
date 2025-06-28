import React, { useState } from 'react';
import './TiendaAngelical.css';
import { ShoppingCart, Star, Heart, Eye, Filter, Search } from 'lucide-react';

const productos = [
  {
    id: 1,
    nombre: 'Oráculo de los Ángeles',
    descripcion: 'Baraja de 44 cartas con mensajes inspiradores de los ángeles para guía diaria.',
    precio: 25.99,
    imagen: '/assets/tienda/oraculo_angeles.jpg',
    categoria: 'cartas',
    valoracion: 4.8,
    stock: 15
  },
  {
    id: 2,
    nombre: 'Vela Aromática Arcángel Miguel',
    descripcion: 'Vela de soja natural con esencias de protección y coraje. Ideal para rituales.',
    precio: 18.50,
    imagen: '/assets/tienda/vela_miguel.jpg',
    categoria: 'velas',
    valoracion: 4.9,
    stock: 8
  },
  {
    id: 3,
    nombre: 'Cristal de Cuarzo Rosa - Amor Angelical',
    descripcion: 'Cuarzo rosa energizado con bendiciones angelicales para atraer el amor.',
    precio: 32.00,
    imagen: '/assets/tienda/cuarzo_rosa.jpg',
    categoria: 'cristales',
    valoracion: 4.7,
    stock: 12
  },
  {
    id: 4,
    nombre: 'Aceite Esencial Bendición Angélica',
    descripcion: 'Mezcla única de aceites esenciales consagrados para elevar tu vibración.',
    precio: 28.75,
    imagen: '/assets/tienda/aceite_bendicion.jpg',
    categoria: 'aceites',
    valoracion: 4.6,
    stock: 20
  },
  {
    id: 5,
    nombre: 'Pulsera de Protección Arcángel Rafael',
    descripcion: 'Pulsera de piedras naturales con energía sanadora del Arcángel Rafael.',
    precio: 45.00,
    imagen: '/assets/tienda/pulsera_rafael.jpg',
    categoria: 'joyeria',
    valoracion: 4.9,
    stock: 6
  },
  {
    id: 6,
    nombre: 'Incienso de Purificación Angélica',
    descripcion: 'Set de 12 varillas de incienso para limpiar espacios y elevar la energía.',
    precio: 15.25,
    imagen: '/assets/tienda/incienso_purificacion.jpg',
    categoria: 'inciensos',
    valoracion: 4.5,
    stock: 25
  }
];

const categorias = [
  { id: 'todas', nombre: 'Todas las Categorías' },
  { id: 'cartas', nombre: 'Cartas y Oráculos' },
  { id: 'velas', nombre: 'Velas Aromáticas' },
  { id: 'cristales', nombre: 'Cristales y Gemas' },
  { id: 'aceites', nombre: 'Aceites Esenciales' },
  { id: 'joyeria', nombre: 'Joyería Espiritual' },
  { id: 'inciensos', nombre: 'Inciensos y Sahumerios' }
];

const TiendaAngelica = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [productoDetalle, setProductoDetalle] = useState(null);

  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = categoriaSeleccionada === 'todas' || producto.categoria === categoriaSeleccionada;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item => 
        item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const toggleFavorito = (producto) => {
    const esFavorito = favoritos.some(fav => fav.id === producto.id);
    if (esFavorito) {
      setFavoritos(favoritos.filter(fav => fav.id !== producto.id));
    } else {
      setFavoritos([...favoritos, producto]);
    }
  };

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <div className="tienda-angelica">
      <h2 className="titulo-seccion"><ShoppingCart /> Tienda Angélica</h2>
      <p className="subtitulo-seccion">Productos espirituales bendecidos para elevar tu vibración.</p>

      {/* Filtros y Búsqueda */}
      <div className="controles-tienda">
        <div className="busqueda">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="filtro-categoria">
          <Filter size={20} />
          <select 
            value={categoriaSeleccionada} 
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="lista-productos">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="card-producto">
            <div className="imagen-producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="acciones-imagen">
                <button 
                  className="btn-accion-imagen"
                  onClick={() => setProductoDetalle(producto)}
                >
                  <Eye size={18} />
                </button>
                <button 
                  className={`btn-accion-imagen ${favoritos.some(fav => fav.id === producto.id) ? 'favorito' : ''}`}
                  onClick={() => toggleFavorito(producto)}
                >
                  <Heart size={18} fill={favoritos.some(fav => fav.id === producto.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            <div className="info-producto">
              <h3>{producto.nombre}</h3>
              <p className="descripcion-corta">{producto.descripcion}</p>
              <div className="valoracion">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(producto.valoracion) ? '#FFD700' : 'none'}
                    color="#FFD700"
                  />
                ))}
                <span>({producto.valoracion})</span>
              </div>
              <div className="precio-stock">
                <span className="precio">€{producto.precio}</span>
                <span className="stock">Stock: {producto.stock}</span>
              </div>
              <button 
                className="btn-agregar-carrito"
                onClick={() => agregarAlCarrito(producto)}
                disabled={producto.stock === 0}
              >
                <ShoppingCart size={18} />
                {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrito Flotante */}
      {carrito.length > 0 && (
        <div className="carrito-flotante">
          <div className="carrito-header">
            <ShoppingCart size={20} />
            <span>Carrito ({carrito.length})</span>
            <span className="total">€{totalCarrito.toFixed(2)}</span>
          </div>
          <div className="carrito-items">
            {carrito.map(item => (
              <div key={item.id} className="carrito-item">
                <span>{item.nombre}</span>
                <span>{item.cantidad}x €{item.precio}</span>
              </div>
            ))}
          </div>
          <button className="btn-finalizar-compra">Finalizar Compra</button>
        </div>
      )}

      {/* Modal de Detalle del Producto */}
      {productoDetalle && (
        <div className="modal-producto-detalle">
          <div className="modal-contenido">
            <button 
              className="btn-cerrar-modal" 
              onClick={() => setProductoDetalle(null)}
            >
              &times;
            </button>
            <div className="detalle-producto">
              <img src={productoDetalle.imagen} alt={productoDetalle.nombre} />
              <div className="info-detalle">
                <h2>{productoDetalle.nombre}</h2>
                <div className="valoracion-detalle">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      fill={i < Math.floor(productoDetalle.valoracion) ? '#FFD700' : 'none'}
                      color="#FFD700"
                    />
                  ))}
                  <span>({productoDetalle.valoracion})</span>
                </div>
                <p className="descripcion-completa">{productoDetalle.descripcion}</p>
                <div className="precio-detalle">€{productoDetalle.precio}</div>
                <div className="stock-detalle">Stock disponible: {productoDetalle.stock}</div>
                <button 
                  className="btn-agregar-carrito-detalle"
                  onClick={() => {
                    agregarAlCarrito(productoDetalle);
                    setProductoDetalle(null);
                  }}
                  disabled={productoDetalle.stock === 0}
                >
                  <ShoppingCart size={20} />
                  {productoDetalle.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TiendaAngelica;
