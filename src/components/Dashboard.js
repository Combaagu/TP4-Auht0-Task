import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth0();

  return (
    <div className="dashboard-container">
      <header className="navbar">
        <h1 className="user-name">Welcome, {user.name}!</h1>
        <div className="user-info">
          <Link to="/users">
            <button className="view-users-btn">View Users</button>
          </Link>
          {user.picture && (
            <img src={user.picture} alt="User Profile" className="profile-picture" />
          )}
          <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </div>
      </header>

      {/* Sección de tareas */}
      <main className="tasks-section">
        <h2>Your Tasks</h2>
        <div className="tasks-container">
          {/* Aquí puedes mapear las tareas de los usuarios cuando las tengas */}
          <div className="task-card">
            <h3>Task Title</h3>
            <p>Task Description</p>
            <button className="view-task-btn">View Task</button>
          </div>
          {/* Repite el task-card según sea necesario */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
