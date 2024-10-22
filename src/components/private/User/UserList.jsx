// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Spin, Alert, Popconfirm } from 'antd'; // Importar componentes de Ant Design
import { Link } from 'react-router-dom';
import 'antd/dist/reset.css'; // Importar estilos de Ant Design
import styles from '../styles/UserList.module.css'; // Importar estilos personalizados

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = { page: page - 1, perPage: perPage };

        const response = await axios.get('http://localhost:4000/api/user', {
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

  // Función para eliminar un usuario
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      // Actualiza la lista después de eliminar
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error:', error);
    }
  };

  // Definir las columnas para la tabla de Ant Design
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'rol',
      key: 'rol',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/user/${record._id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
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
          <Button type="primary" className={styles.createBtn}>+</Button>
        </Link>
        <h1 className={styles.title}>User List</h1>
        <Link to="/dashboard">
          <Button type="primary" className={styles.backBtn}>Back to Dashboard</Button>
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
    </div>
  );
};

export default UserList;
