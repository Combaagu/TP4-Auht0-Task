import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/UserCreate.module.css'; // Importamos los estilos

const UserCreate = () => {
  const navigate = useNavigate(); // Para redirigir al dashboard después de crear el usuario
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    celular: '',
    rol: '',
    area: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/user`, formData); // Asegúrate de que la URL sea correcta
      // Redirigir al dashboard después de crear el usuario
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Nuevo Usuario</h1>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <input
          type="text"
          name="Nombre"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="Apellido"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          type="email"
          name="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="Telefono"
          value={formData.celular}
          onChange={handleChange}
          placeholder="Telefono"
          required
        />
        <input
          type="text"
          name="Rol"
          value={formData.rol}
          onChange={handleChange}
          placeholder="Rol"
          required
        />
        <input
          type="text"
          name="Area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          required
        />

        {/* Contenedor de los botones */}
        <div className={styles['button-container']}>
          <button type="submit" className={styles.button}>Crear Usuario</button>
          <Link to="/users">
            <button className={styles['back-button']}>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
