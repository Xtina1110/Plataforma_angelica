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
import FooterLegal from './components/FooterLegal';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PantallaCarga />} />
        <Route path="/inicio" element={<PantallaInicio />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Registro />} />

        {/* Dashboards por rol */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-tecnico" element={<DashboardTecnico />} />

        {/* Legales */}
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Ruta no encontrada redirige a carga */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
