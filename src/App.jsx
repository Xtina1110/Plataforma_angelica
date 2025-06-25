import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PantallaCarga from './components/PantallaCarga';
import PantallaInicio from './components/PantallaInicio';
import Login from './components/Login';
import Terminos from './components/Terminos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PantallaCarga />} />
        <Route path="/inicio" element={<PantallaInicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
    </Router>
  );
}

export default App;

