import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/UserEdit.module.css'; // Importamos los estilos

const apiUrl = process.env.REACT_APP_ENDPOINT;

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    celular: '',
    rol: '',
    area: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error carga de datos de usuario:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/user/${id}`, formData);
      navigate('/users');
    } catch (error) {
      console.error('Error al cargar Usuario:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Editar Usuario
      </h1>
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
          placeholder="Apeliido"
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
          <button type="submit" className={styles.button}>Actualizar</button>
          <Link to="/users">
            <button className={styles['back-button']}>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
