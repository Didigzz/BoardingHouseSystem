import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import BoarderAccess from './pages/BoarderAccess';
import Dashboard from './pages/Dashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import BoarderDashboard from './pages/BoarderDashboard';
import Rooms from './pages/Rooms';
import Boarders from './pages/Boarders';
import Payments from './pages/Payments';
import Utilities from './pages/Utilities';
import './App.css';

// Protected Route Component
function ProtectedRoute({ element, userRole, requiredRole }) {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return element;
}

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (only for landlord)
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('userRole');
    
    // Only restore if it's a landlord login (not boarder access)
    if (storedUser && storedRole === 'landlord') {
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    } else {
      // Clear any boarder-related storage on app load
      localStorage.removeItem('boarderId');
      localStorage.removeItem('boarderName');
      if (storedRole !== 'landlord') {
        localStorage.removeItem('userRole');
      }
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setUserRole(loggedInUser.role);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      {user && <Navbar userRole={userRole} onLogout={handleLogout} />}
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={user ? (
            userRole === 'landlord' ? (
              <LandlordDashboard />
            ) : (
              <Navigate to={`/boarder-dashboard/${localStorage.getItem('boarderId')}`} replace />
            )
          ) : (
            <LandingPage />
          )}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
        />

        {/* Boarder Access Page */}
        <Route path="/boarder-access" element={<BoarderAccess />} />

        {/* Home - Route based on role */}
        <Route
          path="/dashboard"
          element={
            user ? (
              userRole === 'landlord' ? (
                <LandlordDashboard />
              ) : (
                <BoarderDashboard user={user} />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Landlord-only Routes */}
        <Route
          path="/rooms"
          element={<ProtectedRoute element={<Rooms />} userRole={userRole} requiredRole="landlord" />}
        />
        <Route
          path="/boarders"
          element={<ProtectedRoute element={<Boarders />} userRole={userRole} requiredRole="landlord" />}
        />
        <Route
          path="/payments"
          element={<ProtectedRoute element={<Payments />} userRole={userRole} requiredRole="landlord" />}
        />
        <Route
          path="/utilities"
          element={<ProtectedRoute element={<Utilities />} userRole={userRole} requiredRole="landlord" />}
        />

        {/* Boarder Dashboard Route */}
        <Route
          path="/boarder-dashboard/:boarderId"
          element={<BoarderDashboard user={user} />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
