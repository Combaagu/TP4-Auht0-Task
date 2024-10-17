// src/components/AppDetails.js
import React from 'react';
import './AppDetails.css'; // Archivo de estilos CSS para los detalles de la app

const AppDetails = () => {
  return (
    <div className="app-details">
      <h2>Características de la Aplicación</h2>
      <ul>
        <li>Gestión de tareas de forma eficiente.</li>
        <li>Temporizadores para mejorar la productividad.</li>
        <li>Interfaz intuitiva y fácil de usar.</li>
        <li>Acceso desde cualquier dispositivo.</li>
      </ul>
    </div>
  );
};

export default AppDetails;
