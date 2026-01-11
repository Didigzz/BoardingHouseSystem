import React, { useState, useEffect } from 'react';
import { roomAPI, boarderAPI, paymentAPI } from '../services/api';
import './Modal.css';

function EditRoomModal({ isOpen, onClose, room, onRoomUpdated, roomBoarders = [] }) {
  const [formData, setFormData] = useState({
    room_number: '',
    capacity: 4,
    type: 'SHARED',
    rental_mode: 'BED_SPACER',
    monthly_rent: '',
    status: 'AVAILABLE',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableBoarders, setAvailableBoarders] = useState([]);
  const [currentBoarders, setCurrentBoarders] = useState([]);
  const [selectedBoarder, setSelectedBoarder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [boarderPayments, setBoarderPayments] = useState({});
  const [bedSpacesPerBoarder, setBedSpacesPerBoarder] = useState({});
  const [newBoarderBeds, setNewBoarderBeds] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (room && isOpen) {
      console.log('Modal opened for room:', room.room_number, 'with boarders:', roomBoarders);
      
      setFormData({
        room_number: room.room_number,
        capacity: room.capacity || 4,
        type: room.type || 'SHARED',
        rental_mode: room.rental_mode || 'BED_SPACER',
        monthly_rent: room.monthly_rent || 2400,
        status: room.status || 'AVAILABLE',
      });
      setCurrentBoarders(roomBoarders || []);
      setSelectedBoarder('');
      setSearchQuery('');
      setShowSuggestions(false);
      setNewBoarderBeds(1);
      
      // Initialize bed spaces for current boarders
      const bedSpaces = {};
      (roomBoarders || []).forEach((b) => {
        bedSpaces[b.id] = 1; // Default to 1 bed-space if not specified
      });
      setBedSpacesPerBoarder(bedSpaces);
      
      fetchAvailableBoarders();
      fetchPaymentInfo();
      setActiveTab('details'); // Reset to details tab
    }
  }, [room?.id, isOpen]);

  const fetchPaymentInfo = async () => {
    try {
      // Fetch payments for all boarders in this room
      const payments = {};
      const boardersToCheck = roomBoarders || [];
      for (const boarder of boardersToCheck) {
        try {
          const res = await paymentAPI.getPaymentsByBoarder(boarder.id);
          payments[boarder.id] = res.data.data || [];
        } catch (err) {
          console.error('Failed to fetch payments:', err);
          payments[boarder.id] = [];
        }
      }
      setBoarderPayments(payments);
    } catch (err) {
      console.error('Failed to fetch payment info:', err);
    }
  };

  const fetchAvailableBoarders = async () => {
    try {
      const response = await boarderAPI.getAllBoarders();
      const boarders = response.data.data || [];
      setAvailableBoarders(boarders);
    } catch (err) {
      console.error('Failed to fetch boarders:', err);
    }
  };

  const getPaymentStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysOverdue = Math.floor((today - due) / (1000 * 60 * 60 * 24));

    if (daysOverdue > 0) {
      return daysOverdue > 15 ? 'overdue-long' : 'overdue'; // red or yellow
    }
    return 'on-time'; // green
  };

  const getLatestPaymentStatus = (boarderId) => {
    const payments = boarderPayments[boarderId] || [];
    if (payments.length === 0) return 'no-payment';
    
    const sortedPayments = [...payments].sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    const latestPayment = sortedPayments[0];
    
    if (latestPayment.status === 'Paid') return 'paid';
    return getPaymentStatus(latestPayment.due_date);
  };

  const calculateRoomIncome = () => {
    const bedsOccupied = Object.values(bedSpacesPerBoarder).reduce((a, b) => a + b, 0);
    const baseRate = 600;
    
    if (bedsOccupied >= 4) {
      return 2400; // Full room
    }
    return bedsOccupied * baseRate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' || name === 'monthly_rent' ? Number(value) : value,
    });
  };

  const handleAddBoarder = async () => {
    if (!selectedBoarder) {
      alert('Please select a boarder');
      return;
    }

    try {
      const boarder = availableBoarders.find((b) => b.id === parseInt(selectedBoarder));
      if (!boarder) return;

      // Update boarder's room assignment and bed count
      await boarderAPI.updateBoarder(boarder.id, { 
        room_id: room.id,
        bed_spaces_occupied: newBoarderBeds 
      });
      
      setCurrentBoarders([...currentBoarders, boarder]);
      setBedSpacesPerBoarder({
        ...bedSpacesPerBoarder,
        [boarder.id]: newBoarderBeds
      });
      
      setSelectedBoarder('');
      setSearchQuery('');
      setShowSuggestions(false);
      setNewBoarderBeds(1);
    } catch (err) {
      setError('Failed to add boarder');
      console.error(err);
    }
  };

  const handleSelectBoarder = (boarder) => {
    setSelectedBoarder(boarder.id);
    setSearchQuery(boarder.name);
    setShowSuggestions(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedBoarder('');
    setShowSuggestions(true);
  };

  const filteredBoarders = availableBoarders.filter(
    (b) =>
      (b.room_id === null || b.room_id === undefined) &&
      !currentBoarders.find((cb) => cb.id === b.id) &&
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveBoarder = async (boarderId) => {
    if (!window.confirm('Remove this boarder from the room?')) return;

    try {
      await boarderAPI.updateBoarder(boarderId, { room_id: null });
      setCurrentBoarders(currentBoarders.filter((b) => b.id !== boarderId));
    } catch (err) {
      setError('Failed to remove boarder');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await roomAPI.updateRoom(room.id, formData);
      alert('Room updated successfully!');
      onRoomUpdated(response.data.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update room');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !room) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Room {room.room_number}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Room Details
          </button>
          <button
            className={`tab-button ${activeTab === 'boarders' ? 'active' : ''}`}
            onClick={() => setActiveTab('boarders')}
          >
            Boarders & Income
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'details' && (
            <>
              <div className="form-group">
                <label>Room Number *</label>
                <input
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  disabled
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Capacity (Beds) *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="PRIVATE">Private</option>
                    <option value="SHARED">Shared</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rental Mode *</label>
                  <select name="rental_mode" value={formData.rental_mode} onChange={handleChange} required>
                    <option value="WHOLE_ROOM">Whole Room</option>
                    <option value="BED_SPACER">Bed Spacer</option>
                    <option value="FLEXIBLE">Flexible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Monthly Rent (₱) *</label>
                  <input
                    type="number"
                    name="monthly_rent"
                    value={formData.monthly_rent}
                    onChange={handleChange}
                    required
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="AVAILABLE">Available</option>
                  <option value="PARTIALLY_OCCUPIED">Partially Occupied</option>
                  <option value="FULLY_OCCUPIED">Fully Occupied</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'boarders' && (
            <>
              {/* Room Income */}
              <div className="form-group">
                <label>💰 Room Total Monthly Income</label>
                <div className="income-display">
                  <div className="income-value">₱{calculateRoomIncome().toLocaleString()}</div>
                  <div className="income-breakdown">
                    {currentBoarders.length > 0 
                      ? `${currentBoarders.length} Boarder${currentBoarders.length !== 1 ? 's' : ''} occupying ${Object.values(bedSpacesPerBoarder).reduce((a, b) => a + b, 0)}/4 bed-spaces`
                      : 'No boarders assigned'}
                  </div>
                </div>
              </div>

              {/* Current Boarders List */}
              <div className="form-group">
                <label>Current Boarders & Payment Status</label>
                <div className="boarders-payment-list">
                  {currentBoarders.length === 0 ? (
                    <p style={{ color: '#7f8c8d', textAlign: 'center', padding: '20px' }}>
                      No boarders assigned to this room
                    </p>
                  ) : (
                    currentBoarders.map((boarder) => {
                      const status = getLatestPaymentStatus(boarder.id);
                      const statusColor = status === 'paid' ? 'green' : status === 'overdue-long' ? 'yellow' : status === 'overdue' ? 'red' : 'gray';
                      const beds = bedSpacesPerBoarder[boarder.id] || 1;
                      const monthlyDue = beds * 600;
                      
                      return (
                        <div key={boarder.id} className={`boarder-payment-item payment-${statusColor}`}>
                          <div className="boarder-main-info">
                            <strong>{boarder.name}</strong>
                            <span className="bed-count">({beds} bed-space{beds !== 1 ? 's' : ''})</span>
                          </div>
                          <div className="boarder-payment-info">
                            <span className="monthly-due">Monthly: ₱{monthlyDue.toLocaleString()}</span>
                            <span className={`payment-status status-${statusColor}`}>
                              {status === 'paid' ? '✓ Paid' : status === 'overdue-long' ? '⚠ Overdue 15+ days' : status === 'overdue' ? '⚠ Overdue < 15 days' : 'No Payment'}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => handleRemoveBoarder(boarder.id)}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Add Boarder Section - Available for all rooms */}
              <div className="form-group">
                <label>Add New Boarder</label>
                  
                  <div className="add-boarder-section">
                    <div className="boarder-search-container">
                      <input
                        type="text"
                        placeholder="Search boarder name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowSuggestions(true)}
                        className="boarder-search-input"
                      />
                      {showSuggestions && filteredBoarders.length > 0 && (
                        <div className="boarder-suggestions">
                          {filteredBoarders.map((boarder) => (
                            <div
                              key={boarder.id}
                              className="suggestion-item"
                              onClick={() => handleSelectBoarder(boarder)}
                            >
                              <div className="suggestion-name">{boarder.name}</div>
                              <div className="suggestion-contact">{boarder.contact_number}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bed-spaces-input">
                      <label>Bed-spaces:</label>
                      <select value={newBoarderBeds} onChange={(e) => setNewBoarderBeds(parseInt(e.target.value))}>
                        <option value="1">1 Bed-space (₱600)</option>
                        <option value="2">2 Bed-spaces (₱1,200)</option>
                        <option value="3">3 Bed-spaces (₱1,800)</option>
                        <option value="4">Full Room (₱2,400)</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn btn-small btn-primary"
                      onClick={handleAddBoarder}
                      disabled={!selectedBoarder}
                    >
                      + Add Boarder
                    </button>
                  </div>
                </div>
            </>
          )}

          {error && <div className="form-error">{error}</div>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRoomModal;
