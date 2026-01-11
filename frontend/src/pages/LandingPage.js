import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [showBoarderModal, setShowBoarderModal] = useState(false);
  const [boarderLink, setBoarderLink] = useState('');
  const [linkError, setLinkError] = useState('');

  const handleBoarderAccess = () => {
    setLinkError('');
    setShowBoarderModal(true);
  };

  const handleLinkSubmit = () => {
    if (!boarderLink.trim()) {
      setLinkError('Please paste your access link');
      return;
    }

    try {
      // Extract boarder ID from URL
      const url = new URL(boarderLink);
      const boarderId = url.searchParams.get('id');
      
      if (!boarderId) {
        // Try to extract from direct ID
        const idMatch = boarderLink.match(/id=(\d+)/);
        if (idMatch) {
          navigate(`/boarder-access?id=${idMatch[1]}`);
        } else {
          setLinkError('Invalid link format. Please check and try again.');
        }
      } else {
        navigate(`/boarder-access?id=${boarderId}`);
      }
    } catch (err) {
      setLinkError('Invalid link. Please check and try again.');
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-header">
          <h1>🏠 Boarding House Management System</h1>
          <p>Welcome! Are you an Owner or a Boarder?</p>
        </div>

        <div className="landing-options">
          <div className="option-card owner-card">
            <div className="option-icon">👨‍💼</div>
            <h2>Owner / Landlord</h2>
            <p>Manage your boarding house, rooms, and tenants</p>
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/login')}
            >
              Sign In as Owner
            </button>
          </div>

          <div className="divider"></div>

          <div className="option-card boarder-card">
            <div className="option-icon">👤</div>
            <h2>Boarder / Tenant</h2>
            <p>Access your room information and billing details</p>
            <button
              className="btn btn-success btn-large"
              onClick={handleBoarderAccess}
            >
              Continue as Boarder
            </button>
          </div>
        </div>
      </div>

      {/* Boarder Link Modal */}
      {showBoarderModal && (
        <div className="modal-overlay" onClick={() => setShowBoarderModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Enter Your Access Link</h2>
            <p>Your landlord should have sent you an access link via email or message.</p>
            
            <input
              type="text"
              placeholder="Paste your link here..."
              value={boarderLink}
              onChange={(e) => setBoarderLink(e.target.value)}
              className="link-input"
            />
            
            {linkError && <div className="link-error">{linkError}</div>}
            
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowBoarderModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleLinkSubmit}
              >
                Access Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
