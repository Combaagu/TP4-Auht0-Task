import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/UserEdit.module.css'; // Importamos los estilos

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      await axios.put(`http://localhost:4000/api/user/${id}`, formData);
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Edit User
      </h1>
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
        <div className={styles['button-group']}>
          <button type="submit" className={styles.button}>
            Update User
          </button>
          <Link to="/dashboard">
            <button type="button" className={`${styles.button} ${styles['back-button']}`}>
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
