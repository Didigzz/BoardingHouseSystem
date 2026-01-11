import React, { useState } from 'react';
import { roomAPI } from '../services/api';
import './Modal.css';

function AddRoomModal({ isOpen, onClose, onRoomAdded }) {
  const [formData, setFormData] = useState({
    room_number: '',
    capacity: 4,
    type: 'SHARED',
    rental_mode: 'BED_SPACER',
    monthly_rent: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' || name === 'monthly_rent' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await roomAPI.createRoom(formData);
      alert('Room created successfully!');
      onRoomAdded(response.data.data);
      setFormData({ room_number: '', capacity: 4, type: 'SHARED', rental_mode: 'BED_SPACER', monthly_rent: '' });
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Room</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Room Number *</label>
            <input
              type="text"
              name="room_number"
              value={formData.room_number}
              onChange={handleChange}
              placeholder="e.g., 101"
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
                placeholder="e.g., 2400"
                required
                step="0.01"
              />
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoomModal;
