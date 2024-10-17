import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/user'); // Asegúrate de que la URL sea correcta
      const { users } = response.data;
      setUsers(users);
      console.log('Fetched users:', users);
    } catch (err) {
      setError(err);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <Link to="/user/new">
        <button>Create New User</button>
      </Link>
      {users.length > 0 && <h2>Total Users: {users.length}</h2>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.firstname} {user.lastname} 
            {/* Aquí agregamos el botón para editar */}
            <Link to={`/user/${user._id}/edit`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
