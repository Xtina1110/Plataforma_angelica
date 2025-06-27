// 📁 src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Archivos de estilos
import './App.css';
import './index.css';
import './PantallaCarga.css';
import './PantallaInicio.css';
import './PantallaLogin.css';
import './PantallaRegistro.css';
import './PantallaDashboard.css';
import './PantallaTiradaAngelica.css';

// Renderizar la app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
