import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Layout, Typography, Pagination, Card } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './Dashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const { user, logout } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {
          page: page - 1,
          perPage: perPage,
          filter: {},
          sort: {}
        };

        const response = await axios.get(`${apiUrl}/api/task`, {
          headers: {
            params: JSON.stringify(params)
          }
        });

        if (response.data && response.data.data) {
          setTasks(response.data.data);
          setTotalTasks(response.data.total);
        } else {
          console.log('Sin tarea, error:', response.data);
        }
      } catch (error) {
        console.error('Error tareas:', error);
      }
    };

    fetchTasks();
  }, [page, perPage]);

  const groupedTasks = tasks.reduce((acc, task) => {
    const userId = task.user?._id;

    if (!userId) return acc;

    if (!acc[userId]) {
      acc[userId] = {
        user: task.user,
        tasks: []
      };
    }

    acc[userId].tasks.push(task);

    return acc;
  }, {});

  const taskEntries = Object.entries(groupedTasks);

  return (
    <div className="dashboard-container">
      <Header className="navbar">
        <Title level={2} className="user-name">Bienvenido, {user.name}!</Title>
        <div className="user-info">
          <Link to="/users">
            <Button type="primary" className="view-users-btn" icon={<UserOutlined />} />
          </Link>
          {user.picture && (
            <img src={user.picture} className="profile-picture" alt="profile" />
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
          {taskEntries.length > 0 ? (
            taskEntries.map(([userId, { user, tasks }]) => (
              <Card
                key={userId}
                className="task-card"
                title={(
                  <span className="task-card-title">
                    {`${user.firstname} ${user.lastname}`} - {tasks.length} tarea(s)
                  </span>
                )}
              >
                {tasks.length > 0 && (
                  <div>
                    <p className="task-name">{tasks[0].name}</p>
                    <p className="task-description">{tasks[0].description}</p>
                    <p className="task-resume"><strong>Resumen:</strong> {tasks[0].resume}</p>
                  </div>
                )}
                <Link to={`/user/${userId}/tasks`}>
                  <Button type="primary" className="view-tasks-btn" style={{ marginTop: 10 }}>
                    Ver todas las tareas
                  </Button>
                </Link>

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
