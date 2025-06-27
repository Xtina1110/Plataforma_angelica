import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';

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
  const [rol, setRol] = useState('');

  useEffect(() => {
    const getUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;
      setUser(currentUser);

      if (currentUser) {
        const { data: perfil, error } = await supabase
          .from('usuarios')
          .select('rol')
          .eq('id', currentUser.id)
          .single();

        if (!error && perfil?.rol) setRol(perfil.rol);
      }
    };

    getUserSession();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const RedireccionDashboard = () => {
    if (rol === 'admin') return <Navigate to="/dashboard-admin" replace />;
    if (rol === 'tecnico') return <Navigate to="/dashboard-tecnico" replace />;
    return <Navigate to="/dashboard" replace />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PantallaCarga />} />
          <Route path="/inicio" element={<PantallaInicio />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />

          <Route path="/dashboard-redirect" element={<RedireccionDashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-tecnico" element={<DashboardTecnico />} />

          <Route path="/terminos" element={<Terminos />} />
          <Route path="/politica" element={<PoliticaPrivacidad />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/en-construccion" element={<EnConstruccion />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
