import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [celular, setCelular] = useState('');
  const [documento, setDocumento] = useState('');
  const [rol, setRol] = useState('');
  const [area, setArea] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${id}`); // Asegúrate de que la URL sea correcta
        const user = response.data;
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setEmail(user.email);
        setDomicilio(user.domicilio);
        setCelular(user.celular);
        setDocumento(user.documento);
        setRol(user.rol);
        setArea(user.area);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada al backend para actualizar el usuario
      await axios.put(`http://localhost:4000/api/user/${id}`, {
        firstname,
        lastname,
        email,
        domicilio,
        celular,
        documento,
        rol,
        area
      });

      // Redirigir a la lista de usuarios después de la actualización
      navigate('/users');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserEdit;
