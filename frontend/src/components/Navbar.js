import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏠 BHMS
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {userRole === 'landlord' ? '📊 Dashboard' : '👤 Profile'}
            </Link>
          </li>

          {/* Landlord-only links */}
          {userRole === 'landlord' && (
            <>
              <li className="nav-item">
                <Link to="/rooms" className="nav-link">🏠 Rooms</Link>
              </li>
              <li className="nav-item">
                <Link to="/boarders" className="nav-link">👥 Boarders</Link>
              </li>
              <li className="nav-item">
                <Link to="/payments" className="nav-link">💰 Payments</Link>
              </li>
              <li className="nav-item">
                <Link to="/utilities" className="nav-link">⚡ Utilities</Link>
              </li>
            </>
          )}

          {/* Boarder-only links */}
          {userRole === 'boarder' && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">📋 Rooms</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">💰 My Expenses</Link>
              </li>
            </>
          )}

          {/* User Menu */}
          <li className="nav-item user-menu">
            <button
              className="user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/');
                    setDropdownOpen(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
