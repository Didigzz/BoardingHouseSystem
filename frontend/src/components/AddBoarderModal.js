import React, { useState } from 'react';
import { boarderAPI } from '../services/api';
import './Modal.css';

function AddBoarderModal({ isOpen, onClose, rooms, onBoarderAdded }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    id_type: 'VALID_ID',
    id_number: '',
    move_in_date: '',
    contract_duration: 3,
    rental_type: 'BED_SPACER',
    room_id: '',
    bed_id: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'contract_duration' || name === 'room_id' || name === 'bed_id' ? (value ? Number(value) : null) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await boarderAPI.createBoarder(formData);
      alert('Boarder registered successfully!');
      onBoarderAdded(response.data.data);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        id_type: 'VALID_ID',
        id_number: '',
        move_in_date: '',
        contract_duration: 3,
        rental_type: 'BED_SPACER',
        room_id: '',
        bed_id: null,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register boarder');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Boarder</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Juan"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Dela Cruz"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09123456789"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>ID Type *</label>
              <select name="id_type" value={formData.id_type} onChange={handleChange} required>
                <option value="VALID_ID">Valid ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVER_LICENSE">Driver License</option>
              </select>
            </div>
            <div className="form-group">
              <label>ID Number *</label>
              <input
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                placeholder="123456789"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Move-in Date *</label>
              <input
                type="date"
                name="move_in_date"
                value={formData.move_in_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contract Duration (months) *</label>
              <input
                type="number"
                name="contract_duration"
                value={formData.contract_duration}
                onChange={handleChange}
                min="1"
                max="60"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rental Type *</label>
              <select name="rental_type" value={formData.rental_type} onChange={handleChange} required>
                <option value="WHOLE_ROOM">Whole Room</option>
                <option value="BED_SPACER">Bed Spacer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Room *</label>
              <select name="room_id" value={formData.room_id} onChange={handleChange} required>
                <option value="">Select Room</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>
                    Room {room.room_number} ({room.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register Boarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBoarderModal;
