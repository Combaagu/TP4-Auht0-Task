// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Spin, Alert, Popconfirm } from 'antd'; 
import { Link } from 'react-router-dom';
import CreateTaskModal from '../Task/CreateTask'; // Importar el nuevo componente
import 'antd/dist/reset.css'; 
import styles from '../styles/UserList.module.css'; 
import '../Dashboard/Dashboard'

const apiUrl = process.env.REACT_APP_ENDPOINT;


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedUserId, setSelectedUserId] = useState(null); // Almacenar el ID del usuario seleccionado

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = { page: page - 1, perPage: perPage };

        const response = await axios.get(`${apiUrl}/api/user`, {
          headers: { params: JSON.stringify(params) },
        });

        if (response.data && response.data.users) {
          setUsers(response.data.users);
          setTotalUsers(response.data.total);
        } else {
          setError('No users found in response');
        }
      } catch (error) {
        setError('Error fetching users');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, perPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error:', error);
    }
  };

  // Definir las columnas para la tabla de Ant Design
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/user/${record._id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>
          <Popconfirm
            title="Desea eliminar el usuario ?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="link"
            onClick={() => {
              setSelectedUserId(record._id); // Establecer el ID del usuario seleccionado
              setModalVisible(true); // Abrir el modal
            }}
          >
            +
          </Button>
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Loading users..." />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon className={styles.errorAlert} />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.userListHeader}>
        <Link to="/user/new">
          <Button type="primary" className={styles.createBtn}>New</Button>
        </Link>
        <h1 className={styles.title}>Lista de Usuario</h1>
        <Link to="/dashboard">
          <Button type="primary" className={styles.backBtn}>Home</Button>
        </Link>
      </header>

      <main className={styles.userListMain}>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          pagination={false}
          bordered
        />

        <Pagination
          current={page}
          total={totalUsers}
          pageSize={perPage}
          onChange={(page) => setPage(page)}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </main>

      <CreateTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Cerrar el modal
        userId={selectedUserId} // Pasar el ID del usuario seleccionado
      />
    </div>
  );
};

export default UserList;
