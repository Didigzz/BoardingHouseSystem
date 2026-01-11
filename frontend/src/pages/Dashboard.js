import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomAPI, boarderAPI, paymentAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRooms: 10,
    occupiedBedSpaces: 0,
    totalBedSpaces: 40,
    totalBoarders: 0,
    activeBoarders: 0,
    monthlyIncome: 0,
    collectedAmount: 0,
    pendingAmount: 0,
    overdueAmount: 0,
    overdueCount: 0,
    occupancyRate: 0,
  });
  const [recentBoarders, setRecentBoarders] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [roomsRes, boardersRes, paymentsRes] = await Promise.all([
        roomAPI.getAllRooms(),
        boarderAPI.getAllBoarders(),
        paymentAPI.getAllPayments(),
      ]);

      const rooms = roomsRes.data.data || [];
      const boarders = boardersRes.data.data || [];
      const payments = paymentsRes.data.data || [];

      // Calculate stats
      const activeBoarders = boarders.filter(b => b.status === 'Active');
      const occupiedBedSpaces = activeBoarders.reduce((sum, b) => sum + (b.bed_spaces || 1), 0);
      const monthlyIncome = activeBoarders.reduce((sum, b) => sum + ((b.bed_spaces || 1) * 600), 0);
      
      // Payment stats
      const today = new Date();
      let collectedAmount = 0;
      let pendingAmount = 0;
      let overdueAmount = 0;
      let overdueCount = 0;

      payments.forEach(p => {
        const amount = p.amount || 0;
        if (p.status === 'Paid' || p.status === 'PAID') {
          collectedAmount += amount;
        } else {
          const dueDate = new Date(p.due_date);
          if (dueDate < today) {
            overdueAmount += amount;
            overdueCount++;
          } else {
            pendingAmount += amount;
          }
        }
      });

      const occupancyRate = Math.round((occupiedBedSpaces / 40) * 100);

      setStats({
        totalRooms: rooms.length || 10,
        occupiedBedSpaces,
        totalBedSpaces: 40,
        totalBoarders: boarders.length,
        activeBoarders: activeBoarders.length,
        monthlyIncome,
        collectedAmount,
        pendingAmount,
        overdueAmount,
        overdueCount,
        occupancyRate,
      });

      // Recent boarders (last 5)
      setRecentBoarders(boarders.slice(-5).reverse());
      
      // Recent payments (last 5)
      setRecentPayments(payments.slice(-5).reverse());

      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>📊 Dashboard</h1>
          <p className="header-subtitle">Welcome back, Owner! Here's your boarding house overview.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/boarders')}>
            + Add Boarder
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/payments')}>
            💰 Record Payment
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalRooms}</div>
            <div className="stat-label">Total Rooms</div>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">🛏️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.occupiedBedSpaces}/{stats.totalBedSpaces}</div>
            <div className="stat-label">Bed Spaces Occupied</div>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: `${stats.occupancyRate}%` }}></div>
            </div>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeBoarders}</div>
            <div className="stat-label">Active Boarders</div>
          </div>
        </div>

        <div className="stat-card stat-money">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">₱{stats.monthlyIncome.toLocaleString()}</div>
            <div className="stat-label">Expected Monthly Income</div>
          </div>
        </div>
      </div>

      {/* Payment Overview */}
      <div className="section-header">
        <h2>💳 Payment Overview</h2>
      </div>
      <div className="payment-stats-grid">
        <div className="payment-stat-card collected">
          <div className="payment-stat-icon">✅</div>
          <div className="payment-stat-info">
            <div className="payment-stat-value">₱{stats.collectedAmount.toLocaleString()}</div>
            <div className="payment-stat-label">Collected</div>
          </div>
        </div>
        <div className="payment-stat-card pending">
          <div className="payment-stat-icon">⏳</div>
          <div className="payment-stat-info">
            <div className="payment-stat-value">₱{stats.pendingAmount.toLocaleString()}</div>
            <div className="payment-stat-label">Pending</div>
          </div>
        </div>
        <div className="payment-stat-card overdue">
          <div className="payment-stat-icon">⚠️</div>
          <div className="payment-stat-info">
            <div className="payment-stat-value">₱{stats.overdueAmount.toLocaleString()}</div>
            <div className="payment-stat-label">Overdue ({stats.overdueCount})</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="quick-stats">
        <div className="quick-stat">
          <span className="quick-stat-label">Occupancy Rate</span>
          <span className="quick-stat-value">{stats.occupancyRate}%</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">Available Beds</span>
          <span className="quick-stat-value">{stats.totalBedSpaces - stats.occupiedBedSpaces}</span>
        </div>
        <div className="quick-stat">
          <span className="quick-stat-label">Collection Rate</span>
          <span className="quick-stat-value">
            {stats.monthlyIncome > 0 
              ? Math.round((stats.collectedAmount / (stats.collectedAmount + stats.pendingAmount + stats.overdueAmount || 1)) * 100) 
              : 0}%
          </span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>👥 Recent Boarders</h3>
            <button className="btn btn-small btn-outline" onClick={() => navigate('/boarders')}>
              View All
            </button>
          </div>
          <div className="recent-list">
            {recentBoarders.length === 0 ? (
              <p className="empty-text">No boarders yet</p>
            ) : (
              recentBoarders.map(boarder => (
                <div key={boarder.id} className="recent-item">
                  <span className="recent-icon">👤</span>
                  <div className="recent-info">
                    <strong>{boarder.name}</strong>
                    <small>{boarder.room_id ? `Room assigned` : 'No room'}</small>
                  </div>
                  <span className={`status-dot ${boarder.status === 'Active' ? 'active' : ''}`}></span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>💰 Recent Payments</h3>
            <button className="btn btn-small btn-outline" onClick={() => navigate('/payments')}>
              View All
            </button>
          </div>
          <div className="recent-list">
            {recentPayments.length === 0 ? (
              <p className="empty-text">No payments recorded</p>
            ) : (
              recentPayments.map(payment => (
                <div key={payment.id} className="recent-item">
                  <span className="recent-icon">💵</span>
                  <div className="recent-info">
                    <strong>₱{(payment.amount || 0).toLocaleString()}</strong>
                    <small>{payment.payment_type || 'RENT'}</small>
                  </div>
                  <span className={`payment-status-badge ${payment.status === 'Paid' ? 'paid' : 'pending'}`}>
                    {payment.status === 'Paid' ? '✓' : '○'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
