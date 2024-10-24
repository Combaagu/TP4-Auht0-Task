import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/UserCreate.module.css';

const apiUrl = process.env.REACT_APP_ENDPOINT;


const UserCreate = () => {
  const navigate = useNavigate(); 
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
      await axios.post(`${apiUrl}/api/user`, formData); 
      navigate('/users');
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
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          placeholder="Telefono"
          required
        />
        <input
          type="text"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          placeholder="Rol"
          required
        />
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          required
        />
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
