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
    domicilio: '',
    celular: '',
    documento: '',
    rol: '',
    area: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/user', formData); // Asegúrate de que la URL sea correcta
      // Redirigir al dashboard después de crear el usuario
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New User</h1>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
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
          name="domicilio"
          value={formData.domicilio}
          onChange={handleChange}
          placeholder="Domicilio"
          required
        />
        <input
          type="text"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          placeholder="Celular"
          required
        />
        <input
          type="text"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          placeholder="Documento"
          required
        />
        <input
          type="text"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          placeholder="Role"
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

        {/* Contenedor de los botones */}
        <div className={styles['button-container']}>
          <button type="submit" className={styles.button}>Create User</button>
          <Link to="/dashboard">
            <button className={styles['back-button']}>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
