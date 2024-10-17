import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [celular, setCelular] = useState('');
  const [documento, setDocumento] = useState('');
  const [rol, setRol] = useState('');
  const [area, setArea] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/user', {
        firstname,
        lastname,
        email,
        domicilio,
        celular,
        documento,
        rol,
        area
      });
      navigate('/users'); // Redirige a la lista de usuarios después de crear
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard'); // Cambia la ruta si tu dashboard está en otra
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <input 
          type="text" 
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)} 
          placeholder="First Name" 
          required 
        />
        <input 
          type="text" 
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)} 
          placeholder="Last Name" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="text" 
          value={domicilio} 
          onChange={(e) => setDomicilio(e.target.value)} 
          placeholder="Domicilio" 
          required 
        />
        <input 
          type="text" 
          value={celular} 
          onChange={(e) => setCelular(e.target.value)} 
          placeholder="Celular" 
          required 
        />
        <input 
          type="text" 
          value={documento} 
          onChange={(e) => setDocumento(e.target.value)} 
          placeholder="Documento" 
          required 
        />
        <input 
          type="text" 
          value={rol} 
          onChange={(e) => setRol(e.target.value)} 
          placeholder="Rol" 
          required 
        />
        <input 
          type="text" 
          value={area} 
          onChange={(e) => setArea(e.target.value)} 
          placeholder="Área" 
          required 
        />
        <button type="submit">Create</button>
      </form>
      
      {/* Botón para volver al dashboard */}
      <button onClick={goToDashboard} style={{ marginTop: '10px' }}>
        Volver al Dashboard
      </button>
    </div>
  );
};

export default UserCreate;
