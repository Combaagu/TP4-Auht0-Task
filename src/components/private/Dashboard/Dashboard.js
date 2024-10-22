import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Layout, Typography, Pagination, Card } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'; // Importa el ícono de logout
import './Dashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const { user, logout } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1); // La paginación comienza desde 1
  const [perPage] = useState(6);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {
          page: page - 1, // Ajustamos a 0 basado en la API
          perPage: perPage,
          filter: {},
          sort: {}
        };

        const response = await axios.get('http://localhost:4000/api/task', {
          headers: {
            params: JSON.stringify(params)
          }
        });

        if (response.data && response.data.data) {
          setTasks(response.data.data);
          setTotalTasks(response.data.total);
        } else {
          console.log('No tasks found in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [page, perPage]);

  return (
    <div className="dashboard-container">
      <Header className="navbar">
        <Title level={2} className="user-name">Welcome, {user.name}!</Title>
        <div className="user-info">
          <Link to="/users">
            <Button type="primary" className="view-users-btn" icon={<UserOutlined />} />
          </Link>
          {user.picture && (
            <img src={user.picture} alt="User Profile" className="profile-picture" />
          )}
          <Button
            className="logout-btn"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <LogoutOutlined />

          </Button>
        </div>
      </Header>

      <Content className="tasks-section">
        <Title level={3} className="tasks-title">Users & Tasks</Title>
        <div className="tasks-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Card
                key={task._id}
                className="task-card"
                title={(
                  <span className="task-card-title">
                    {`${task.user?.firstname} ${task.user?.lastname}`}
                  </span>
                )}
              >
                <p className="task-name">{task.name}</p>
                <p className="task-description">{task.description}</p>
                <p className="task-resume"><strong>Resumen:</strong> {task.resume}</p>
              </Card>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>

        <Pagination
          current={page}
          pageSize={perPage}
          total={totalTasks}
          onChange={(page) => setPage(page)}
          style={{ marginTop: 20, textAlign: 'center' }}
        />
      </Content>
    </div>
  );
};

export default Dashboard;
