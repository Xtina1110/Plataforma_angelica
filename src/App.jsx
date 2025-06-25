import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PantallaCarga from './components/PantallaCarga';
import PantallaInicio from './components/PantallaInicio';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PantallaCarga />} />
        <Route path="/inicio" element={<PantallaInicio />} />
        {/* Puedes agregar más pantallas aquí luego, como login, registro, dashboard, etc */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
