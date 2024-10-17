// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Cambiamos Switch por Routes
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.module.css';

import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';



function App() {
  return (

      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/new" element={<UserCreate />} />
          <Route path="/user/:id/edit" element={<UserEdit />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>

  );
}

export default App;
