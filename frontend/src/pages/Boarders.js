import React, { useState, useEffect } from 'react';
import { boarderAPI, roomAPI } from '../services/api';
import './Boarders.css';

function Boarders() {
  const [boarders, setBoarders] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBoarder, setSelectedBoarder] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact_number: '',
    email: '',
    sex: 'Male',
    room_id: '',
    bed_spaces: 1,
    move_in_date: new Date().toISOString().split('T')[0],
    contract_duration: 12,
    emergency_contact: '',
    status: 'Active'
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [boardersRes, roomsRes] = await Promise.all([
        boarderAPI.getAllBoarders(),
        roomAPI.getAllRooms()
      ]);
      setBoarders(boardersRes.data.data || []);
      setRooms(roomsRes.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contact_number: '',
      email: '',
      sex: 'Male',
      room_id: '',
      bed_spaces: 1,
      move_in_date: new Date().toISOString().split('T')[0],
      contract_duration: 12,
      emergency_contact: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBoarder = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      await boarderAPI.createBoarder({
        ...formData,
        room_id: formData.room_id || null,
        bed_spaces: parseInt(formData.bed_spaces),
        contract_duration: parseInt(formData.contract_duration)
      });
      setShowAddModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      setError('Failed to add boarder');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditBoarder = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      await boarderAPI.updateBoarder(selectedBoarder.id, {
        ...formData,
        room_id: formData.room_id || null,
        bed_spaces: parseInt(formData.bed_spaces),
        contract_duration: parseInt(formData.contract_duration)
      });
      setShowEditModal(false);
      setSelectedBoarder(null);
      resetForm();
      fetchData();
    } catch (err) {
      setError('Failed to update boarder');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBoarder = async (boarderId) => {
    if (!window.confirm('Are you sure you want to delete this boarder?')) return;
    try {
      await boarderAPI.deleteBoarder(boarderId);
      fetchData();
    } catch (err) {
      setError('Failed to delete boarder');
      console.error(err);
    }
  };

  const openEditModal = (boarder) => {
    setSelectedBoarder(boarder);
    setFormData({
      name: boarder.name || '',
      contact_number: boarder.contact_number || '',
      email: boarder.email || '',
      sex: boarder.sex || 'Male',
      room_id: boarder.room_id || '',
      bed_spaces: boarder.bed_spaces || 1,
      move_in_date: boarder.move_in_date ? boarder.move_in_date.split('T')[0] : new Date().toISOString().split('T')[0],
      contract_duration: boarder.contract_duration || 12,
      emergency_contact: boarder.emergency_contact || '',
      status: boarder.status || 'Active'
    });
    setShowEditModal(true);
  };

  const generateShareLink = (boarderId) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/boarder-access?id=${boarderId}`;
  };

  const handleCopyLink = (boarderId) => {
    const link = generateShareLink(boarderId);
    navigator.clipboard.writeText(link);
    setCopiedId(boarderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRoomNumber = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? `Room ${room.room_number}` : 'Unassigned';
  };

  if (loading) return <div className="boarders-loading">Loading boarders...</div>;

  return (
    <div className="boarders">
      <div className="boarders-header">
        <div>
          <h1>👥 Boarders Management</h1>
          <p className="header-subtitle">Manage your boarders and generate access links</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Boarder
        </button>
      </div>

      {error && <div className="boarders-error">{error}</div>}

      {boarders.length === 0 ? (
        <div className="boarders-empty">
          <div className="empty-icon">👥</div>
          <p>No boarders found</p>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            Add Your First Boarder
          </button>
        </div>
      ) : (
        <div className="boarders-table-container">
          <table className="boarders-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Sex</th>
                <th>Room</th>
                <th>Bed Spaces</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {boarders.map((boarder) => (
                <tr key={boarder.id}>
                  <td>
                    <div className="boarder-name-cell">
                      <span className="boarder-avatar">👤</span>
                      <div>
                        <strong>{boarder.name}</strong>
                        {boarder.email && <small>{boarder.email}</small>}
                      </div>
                    </div>
                  </td>
                  <td>{boarder.contact_number || 'N/A'}</td>
                  <td>{boarder.sex || 'N/A'}</td>
                  <td>{getRoomNumber(boarder.room_id)}</td>
                  <td>{boarder.bed_spaces || 1}</td>
                  <td>
                    <span className={`status-badge ${boarder.status?.toLowerCase().replace('_', '-')}`}>
                      {boarder.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className={`btn btn-small ${copiedId === boarder.id ? 'btn-success' : 'btn-outline'}`}
                        onClick={() => handleCopyLink(boarder.id)}
                        title="Copy access link"
                      >
                        {copiedId === boarder.id ? '✓' : '🔗'}
                      </button>
                      <button
                        className="btn btn-small btn-outline"
                        onClick={() => openEditModal(boarder)}
                        title="Edit boarder"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDeleteBoarder(boarder.id)}
                        title="Delete boarder"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Boarder Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ Add New Boarder</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddBoarder}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    required
                    placeholder="09123456789"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="juan@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Sex *</label>
                  <select name="sex" value={formData.sex} onChange={handleInputChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign to Room</label>
                  <select name="room_id" value={formData.room_id} onChange={handleInputChange}>
                    <option value="">-- No Room Yet --</option>
                    {rooms.sort((a, b) => a.room_number - b.room_number).map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.room_number}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Bed Spaces</label>
                  <select name="bed_spaces" value={formData.bed_spaces} onChange={handleInputChange}>
                    <option value="1">1 Bed-space (₱600)</option>
                    <option value="2">2 Bed-spaces (₱1,200)</option>
                    <option value="3">3 Bed-spaces (₱1,800)</option>
                    <option value="4">Full Room (₱2,400)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Move-in Date *</label>
                  <input
                    type="date"
                    name="move_in_date"
                    value={formData.move_in_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contract Duration (months)</label>
                  <select name="contract_duration" value={formData.contract_duration} onChange={handleInputChange}>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months (1 Year)</option>
                    <option value="24">24 Months (2 Years)</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Emergency Contact</label>
                  <input
                    type="text"
                    name="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={handleInputChange}
                    placeholder="Name - Phone Number"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                  {formLoading ? 'Adding...' : 'Add Boarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Boarder Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Edit Boarder</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <form onSubmit={handleEditBoarder}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Sex *</label>
                  <select name="sex" value={formData.sex} onChange={handleInputChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign to Room</label>
                  <select name="room_id" value={formData.room_id} onChange={handleInputChange}>
                    <option value="">-- No Room --</option>
                    {rooms.sort((a, b) => a.room_number - b.room_number).map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.room_number}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Bed Spaces</label>
                  <select name="bed_spaces" value={formData.bed_spaces} onChange={handleInputChange}>
                    <option value="1">1 Bed-space (₱600)</option>
                    <option value="2">2 Bed-spaces (₱1,200)</option>
                    <option value="3">3 Bed-spaces (₱1,800)</option>
                    <option value="4">Full Room (₱2,400)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Active">Active</option>
                    <option value="Move_out_notice">Move-out Notice</option>
                    <option value="Moved_out">Moved Out</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contract Duration (months)</label>
                  <select name="contract_duration" value={formData.contract_duration} onChange={handleInputChange}>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Emergency Contact</label>
                  <input
                    type="text"
                    name="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                  {formLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Boarders;
