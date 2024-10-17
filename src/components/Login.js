import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Redirige si ya está autenticado
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="login-container">
      {/* Aquí empieza el div que contendrá la tarjeta de inicio de sesión */}
      <div className="login-card">
        <img src="/logo--remo.png" alt="Logo" className="logo" />
        <h2>Iniciar Sesión</h2>
        <p>Bienvenido a nuestra aplicación. Por favor, inicia sesión para continuar.</p>
        <button onClick={() => loginWithRedirect()} className="login-btn">
          Login
        </button>
        <p>¡Estamos felices de verte de nuevo!</p>
      </div>
      {/* Aquí puedes agregar más detalles o componentes */}
      <div className="details-card">
        <h3>Acerca de la Aplicación</h3>
        <p>Esta aplicación te permite gestionar tus tareas de manera eficiente y sencilla.</p>
        <p>Explora todas las funcionalidades que ofrecemos.</p>
      </div>
      {/* Fin del div de detalles */}
    </div>
  );
};

export default Login;
