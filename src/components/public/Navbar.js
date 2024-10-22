// src/components/Navbar.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css'; // Archivo de estilos CSS para el navbar

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="path_to_your_logo.png" alt="Logo" /> {/* Reemplaza con la ruta de tu logo */}
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <button onClick={() => logout({ returnTo: window.location.origin })} className="navbar-btn">
            Cerrar Sesión
          </button>
        ) : (
          <button onClick={loginWithRedirect} className="navbar-btn">
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
