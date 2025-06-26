import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PantallaCarga from './components/PantallaCarga';
import PantallaInicio from './components/PantallaInicio';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardTecnico from './components/DashboardTecnico';
import Terminos from './components/Terminos';
import PoliticaPrivacidad from './components/PoliticaPrivacidad';
import Contacto from './components/Contacto';
import EnConstruccion from './components/EnConstruccion';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta por defecto */}
          <Route path="/" element={<PantallaCarga />} />

          {/* Navegación principal */}
          <Route path="/inicio" element={<PantallaInicio />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />

          {/* Dashboards según rol */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-tecnico" element={<DashboardTecnico />} />

          {/* Páginas legales */}
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/politica" element={<PoliticaPrivacidad />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Pantalla genérica de construcción */}
          <Route path="/en-construccion" element={<EnConstruccion />} />

          {/* Cualquier otra ruta redirige */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
