import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PantallaCarga from './components/PantallaCarga';
import PantallaInicio from './components/PantallaInicio';
import Login from './components/Login';
import Registro from './components/Registro';
import Terminos from './components/Terminos';
import PoliticaPrivacidad from './components/PoliticaPrivacidad';
import Contacto from './components/Contacto';
import Dashboard from './components/Dashboard'; // Si ya lo tienes
import FooterLegal from './components/FooterLegal'; // Se puede usar como parte de páginas

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
          <Route path="/" element={<PantallaCarga />} />
          <Route path="/inicio" element={<PantallaInicio />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
