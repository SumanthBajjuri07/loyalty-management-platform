import React from "react";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import MemberManagement from "./Components/MemberManagement/MemberManagement";
import TransactionManagement from "./Components/TransactionManagement/TransactionManagement";
import PointsManagement from "./Components/PointsManagement/PointsManagement";
import Sidebar from "./Components/Sidebar/Sidebar";
import Logout from "./Components/Logout/Logout";
import Welcome from "./Components/Welcome/Welcome";
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Sidebar handleLogout={handleLogout} />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
            <Route path="/member-management" element={isLoggedIn ? <MemberManagement /> : <Login onLogin={handleLogin} />} />
            <Route path="/points-management" element={isLoggedIn ? <PointsManagement /> : <Login onLogin={handleLogin} />} />
            <Route path="/transaction-management" element={isLoggedIn ? <TransactionManagement /> : <Login onLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


