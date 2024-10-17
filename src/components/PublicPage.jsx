import React, { useState } from 'react';

function PublicPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Aquí iría la lógica de autenticación (redirigir a login)
    console.log('Login clicked');
    // Lógica para redirigir a la página de autenticación
    setIsLoggedIn(true); // Simulación de estar autenticado
  };

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    console.log('Logout clicked');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Bienvenido a nuestra aplicación</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default PublicPage;
