import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomAPI, boarderAPI } from '../services/api';
import './LandlordDashboard.css';

function LandlordDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalBoarders: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const roomsRes = await roomAPI.getAllRooms();
      const boardersRes = await boarderAPI.getAllBoarders();

      const rooms = roomsRes.data.data || [];
      const boarders = boardersRes.data.data || [];

      const occupied = rooms.filter((r) => r.status === 'Occupied').length;
      const monthlyRev = rooms.reduce((sum, r) => sum + (parseFloat(r.monthly_rent) || 0), 0);

      setStats({
        totalRooms: rooms.length,
        occupiedRooms: occupied,
        totalBoarders: boarders.length,
        monthlyRevenue: monthlyRev,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="landlord-loading">Loading dashboard...</div>;

  return (
    <div className="landlord-dashboard">
      <div className="dashboard-header">
        <h1>💼 Admin Dashboard</h1>
        <p>Manage your boarding house</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏘️</div>
          <div className="stat-content">
            <p className="stat-label">Total Rooms</p>
            <p className="stat-value">{stats.totalRooms}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Total Boarders</p>
            <p className="stat-value">{stats.totalBoarders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <p className="stat-label">Occupied Rooms</p>
            <p className="stat-value">{stats.occupiedRooms}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <p className="stat-label">Monthly Revenue</p>
            <p className="stat-value">₱{stats.monthlyRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/rooms" className="action-card">
            <div className="action-icon">🏠</div>
            <h3>Manage Rooms</h3>
            <p>Add, edit, or delete rooms</p>
          </Link>

          <Link to="/boarders" className="action-card">
            <div className="action-icon">👤</div>
            <h3>Manage Boarders</h3>
            <p>Register and manage tenants</p>
          </Link>

          <Link to="/payments" className="action-card">
            <div className="action-icon">💰</div>
            <h3>Record Payments</h3>
            <p>Track rental payments</p>
          </Link>

          <Link to="/utilities" className="action-card">
            <div className="action-icon">⚡</div>
            <h3>Manage Utilities</h3>
            <p>Handle electricity & water</p>
          </Link>
        </div>
      </div>

      {/* Management Sections */}
      <div className="management-sections">
        <div className="section-card">
          <h2>📊 Quick Stats</h2>
          <div className="stats-list">
            <div className="stat-item">
              <span>Occupancy Rate:</span>
              <strong>
                {stats.totalRooms > 0
                  ? Math.round((stats.occupiedRooms / stats.totalRooms) * 100)
                  : 0}
                %
              </strong>
            </div>
            <div className="stat-item">
              <span>Available Rooms:</span>
              <strong>{stats.totalRooms - stats.occupiedRooms}</strong>
            </div>
            <div className="stat-item">
              <span>Annual Revenue (Est):</span>
              <strong>₱{(stats.monthlyRevenue * 12).toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2>🔧 Settings</h2>
          <div className="settings-list">
            <button className="settings-btn">Edit Profile</button>
            <button className="settings-btn">Change Password</button>
            <button className="settings-btn">System Settings</button>
            <button className="settings-btn">View Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandlordDashboard;
