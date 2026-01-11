import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomAPI, boarderAPI } from '../services/api';
import './BoarderDashboard.css';

function BoarderDashboard({ user }) {
  const { boarderId } = useParams();
  const navigate = useNavigate();
  const [boarderData, setBoarderData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [roomBoarders, setRoomBoarders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const boarderIdToUse = boarderId || localStorage.getItem('boarderId');
    if (!boarderIdToUse) {
      navigate('/');
      return;
    }
    fetchBoarderData(boarderIdToUse);
  }, [boarderId, navigate]);

  const fetchBoarderData = async (id) => {
    try {
      setLoading(true);
      const boarderRes = await boarderAPI.getBoarderById(id);
      setBoarderData(boarderRes.data.data);

      // Fetch room info if assigned
      if (boarderRes.data.data.room_id) {
        try {
          const roomRes = await roomAPI.getRoomById(boarderRes.data.data.room_id);
          setRoomData(roomRes.data.data);
          
          // Fetch all boarders in the room (but don't show contact info)
          const allBoardersRes = await boarderAPI.getAllBoarders();
          const roomBoardersData = allBoardersRes.data.data.filter(
            (b) => b.room_id === boarderRes.data.data.room_id && b.status === 'Active'
          );
          setRoomBoarders(roomBoardersData);
        } catch (err) {
          console.error('Failed to fetch room data');
        }
      }
    } catch (err) {
      setError('Failed to load boarder data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('boarderId');
    localStorage.removeItem('boarderName');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (loading) return <div className="boarder-loading">Loading your profile...</div>;

  return (
    <div className="boarder-dashboard">
      <div className="boarder-header">
        <h1>Welcome, {boarderData?.name || 'Boarder'}! 👋</h1>
        <p>Your Boarding House Profile</p>
        <button className="btn btn-secondary" onClick={handleLogout} style={{ marginTop: '10px' }}>
          Exit
        </button>
      </div>

      {boarderData ? (
        <div className="boarder-content">
          {/* Profile Card */}
          <div className="profile-section">
            <h2>Your Profile</h2>
            <div className="profile-card">
              <div className="profile-info">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{boarderData.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Gender:</span>
                  <span className="value">{boarderData.sex || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="label">Status:</span>
                  <span className={`value status-badge ${boarderData.status.toLowerCase()}`}>
                    {boarderData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Room Info */}
          {roomData && (
            <div className="room-section">
              <h2>Your Room</h2>
              <div className="room-card">
                <div className="room-info">
                  <div className="info-row">
                    <span className="label">Room Number:</span>
                    <span className="value">Room {roomData.room_number}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Room Type:</span>
                    <span className="value">{roomData.type === 'SHARED' ? 'Shared' : 'Private'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Monthly Rent:</span>
                    <span className="value" style={{ fontWeight: '700', color: '#e74c3c' }}>
                      ₱{roomData.monthly_rent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Other Boarders in Room - Names Only */}
              {roomBoarders.length > 1 && (
                <div className="roommates-section">
                  <h3>Other Roommates</h3>
                  <div className="roommates-list">
                    {roomBoarders
                      .filter((b) => b.id !== boarderData.id)
                      .map((boarder) => (
                        <div key={boarder.id} className="roommate-card">
                          <span className="roommate-name">👤 {boarder.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Links */}
          <div className="quick-links-section">
            <h2>Quick Links</h2>
            <div className="quick-links">
              <div className="quick-link-card">
                <span className="icon">💰</span>
                <span className="title">Billing</span>
              </div>
              <div className="quick-link-card">
                <span className="icon">⚡</span>
                <span className="title">Utilities</span>
              </div>
              <div className="quick-link-card">
                <span className="icon">📜</span>
                <span className="title">Contract</span>
              </div>
              <div className="quick-link-card">
                <span className="icon">📞</span>
                <span className="title">Support</span>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="boarder-error">{error}</div>
      ) : (
        <div className="no-data">
          <p>Could not load your profile. Please contact the landlord.</p>
        </div>
      )}
    </div>
  );
}

export default BoarderDashboard;
