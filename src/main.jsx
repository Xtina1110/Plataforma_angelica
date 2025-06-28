import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // o el archivo raíz de tu app
import './index.css'; // si usas estilos globales o tailwind base

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
