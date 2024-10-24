// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/public/Login';

import Dashboard from './components/private/Dashboard/Dashboard';

import UserList from './components/private/User/UserList';
import UserCreate from './components/private/User/UserCreate';
import UserEdit from './components/private/User/UserEdit';

import CreateTask from './components/private/Task/CreateTask';
import TaskList from './components/private/Task/TaskList'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/user/new" element={<UserCreate />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />

        <Route path="/task/new/:userId" element={<CreateTask />} />
        <Route path="/user/:userId/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
