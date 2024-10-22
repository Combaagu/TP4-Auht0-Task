import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {Spin,Button} from 'antd'

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0(); // Agregamos isLoading para verificar el estado de autenticación
  const navigate = useNavigate();

  // Redirige si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirigir a /dashboard si está autenticado
    }
  }, [isAuthenticated, navigate]);



  // Si no está autenticado, muestra el formulario de login
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        {isLoading?(<div className="loading"><Spin size='large'/></div> ):
        
       (
        <div  className="login-container2" >
        <div className="login-card">
          <img src="/logo--remo.png" alt="Logo" className="logo" />
          <h2>Iniciar Sesión</h2>
          <p>Bienvenido a nuestra aplicación. Por favor, inicia sesión para continuar.</p>
          <button onClick={() => loginWithRedirect()}  className='login-btn' >
            Login
          </button>
          <p>¡Estamos felices de verte de nuevo!</p>
        </div>
        <div className="details-card">
          <h3>Acerca de la Aplicación</h3>
          <p>Esta aplicación te permite gestionar tus tareas de manera eficiente y sencilla.</p>
          <p>Explora todas las funcionalidades que ofrecemos.</p>
        </div>
        </div>)
        }
        {/* Fin del div de detalles */}
      </div>
    );
  }

  return null; // Si el usuario está autenticado y ya fue redirigido, no mostramos nada
};

export default Login;
