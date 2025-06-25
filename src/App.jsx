import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PantallaCarga from './components/PantallaCarga';
import PantallaInicio from './components/PantallaInicio';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PantallaCarga />} />
        <Route path="/inicio" element={<PantallaInicio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
