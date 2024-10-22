// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Cambiamos Switch por Routes
import Dashboard from '../src/components/private/Dashboard/Dashboard';
import Login from '../src/components/public/Login';
import './App.module.css';

import UserList from '../src/components/private/User/UserList';
import UserCreate from '../src/components/private/User/UserCreate';
import UserEdit from '../src/components/private/User/UserEdit';



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
