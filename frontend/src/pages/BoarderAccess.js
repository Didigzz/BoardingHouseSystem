import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { boarderAPI } from '../services/api';
import './BoarderAccess.css';

function BoarderAccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [boarder, setBoarder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const boarderId = searchParams.get('id');

  useEffect(() => {
    if (boarderId) {
      fetchBoarderInfo();
    } else {
      setLoading(false);
      setError('No boarder information found. Please use a valid link.');
    }
  }, [boarderId]);

  const fetchBoarderInfo = async () => {
    try {
      setLoading(true);
      const response = await boarderAPI.getBoarderById(boarderId);
      
      if (response.data && response.data.data) {
        setBoarder(response.data.data);
        setError(null);
      } else if (response.data && response.data.success === false) {
        setError(response.data.message || 'Boarder not found');
      } else {
        setError('Could not load boarder information. Please check your link.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 404) {
        setError('Boarder not found. Please check your link.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Could not load boarder information. Please check your link.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (boarder) {
      localStorage.setItem('boarderId', boarder.id);
      localStorage.setItem('boarderName', boarder.name);
      localStorage.setItem('userRole', 'boarder');
      navigate(`/boarder-dashboard/${boarder.id}`);
    }
  };

  if (loading) {
    return (
      <div className="boarder-access-container">
        <div className="access-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="boarder-access-container">
        <div className="access-content error">
          <h2>⚠️ Access Error</h2>
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="boarder-access-container">
      <div className="access-content">
        <div className="access-header">
          <h1>Welcome, Boarder!</h1>
        </div>

        {boarder && (
          <div className="boarder-info">
            <div className="info-card">
              <div className="info-icon">👤</div>
              <h2>{boarder.name}</h2>
              <p className="info-detail">
                <strong>Room:</strong> {boarder.room_id ? `Room ${boarder.room_id}` : 'Not assigned'}
              </p>
              <p className="info-detail">
                <strong>Contact:</strong> {boarder.contact_number || 'N/A'}
              </p>
              <p className="info-detail">
                <strong>Status:</strong>{' '}
                <span className={`status-badge ${boarder.status.toLowerCase()}`}>
                  {boarder.status}
                </span>
              </p>
            </div>

            <div className="access-description">
              <p>Click the button below to access your boarder dashboard and view:</p>
              <ul>
                <li>✓ Your room information</li>
                <li>✓ Billing and payment history</li>
                <li>✓ Utility charges</li>
                <li>✓ Contact details</li>
              </ul>
            </div>

            <button
              className="btn btn-success btn-large"
              onClick={handleContinue}
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoarderAccess;
