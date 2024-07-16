import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="logout-container">
      {!confirmLogout ? (
        <button className="logout-button" onClick={() => setConfirmLogout(true)}>
          Logout
        </button>
      ) : (
        <div className="confirm-container">
          <p>Are you sure you want to logout?</p>
          <div className="confirm-buttons">
            <button className="confirm-button" onClick={handleLogout}>
              Yes, Logout
            </button>
            <button className="cancel-button" onClick={() => setConfirmLogout(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
