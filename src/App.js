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



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  return (
  <Router>
      <div className="app-container">
        {isLoggedIn && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/welcome" element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/members" element={isLoggedIn ? <MemberManagement /> : <Navigate to="/login" />} />
            <Route path="/points" element={isLoggedIn ? <PointsManagement /> : <Navigate to="/login" />} />
            <Route path="/transactions" element={isLoggedIn ? <TransactionManagement /> : <Navigate to="/login" />} />
            <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/welcome" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
 
export default App;



