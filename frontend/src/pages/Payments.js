import React, { useState, useEffect } from 'react';
import { paymentAPI, boarderAPI, roomAPI } from '../services/api';
import './Payments.css';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [boarders, setBoarders] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, paid, pending, overdue
  const [formData, setFormData] = useState({
    boarder_id: '',
    amount: '',
    due_date: new Date().toISOString().split('T')[0],
    payment_type: 'RENT',
    status: 'PENDING',
    payment_method: '',
    notes: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, boardersRes, roomsRes] = await Promise.all([
        paymentAPI.getAllPayments(),
        boarderAPI.getAllBoarders(),
        roomAPI.getAllRooms()
      ]);
      setPayments(paymentsRes.data.data || []);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      await paymentAPI.createPayment({
        ...formData,
        boarder_id: parseInt(formData.boarder_id),
        amount: parseFloat(formData.amount)
      });
      setShowAddModal(false);
      setFormData({
        boarder_id: '',
        amount: '',
        due_date: new Date().toISOString().split('T')[0],
        payment_type: 'RENT',
        status: 'PENDING',
        payment_method: '',
        notes: ''
      });
      fetchData();
    } catch (err) {
      setError('Failed to add payment');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleMarkAsPaid = async (paymentId) => {
    try {
      await paymentAPI.updatePayment(paymentId, {
        status: 'Paid',
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'CASH'
      });
      fetchData();
    } catch (err) {
      setError('Failed to update payment');
      console.error(err);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment record?')) return;
    try {
      await paymentAPI.deletePayment(paymentId);
      fetchData();
    } catch (err) {
      setError('Failed to delete payment');
      console.error(err);
    }
  };

  const getBoarderName = (boarderId) => {
    const boarder = boarders.find(b => b.id === boarderId);
    return boarder ? boarder.name : 'Unknown';
  };

  const getBoarderRoom = (boarderId) => {
    const boarder = boarders.find(b => b.id === boarderId);
    if (!boarder || !boarder.room_id) return 'N/A';
    const room = rooms.find(r => r.id === boarder.room_id);
    return room ? `Room ${room.room_number}` : 'N/A';
  };

  const getPaymentStatus = (payment) => {
    if (payment.status === 'Paid' || payment.status === 'PAID') return 'paid';
    const today = new Date();
    const dueDate = new Date(payment.due_date);
    const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
    if (daysOverdue > 15) return 'overdue-long';
    if (daysOverdue > 0) return 'overdue';
    return 'pending';
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    const status = getPaymentStatus(payment);
    if (filter === 'paid') return status === 'paid';
    if (filter === 'pending') return status === 'pending';
    if (filter === 'overdue') return status === 'overdue' || status === 'overdue-long';
    return true;
  });

  // Calculate stats
  const totalPaid = payments.filter(p => getPaymentStatus(p) === 'paid').reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalPending = payments.filter(p => getPaymentStatus(p) === 'pending').reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalOverdue = payments.filter(p => ['overdue', 'overdue-long'].includes(getPaymentStatus(p))).reduce((sum, p) => sum + (p.amount || 0), 0);

  if (loading) return <div className="payments-loading">Loading payments...</div>;

  return (
    <div className="payments">
      <div className="payments-header">
        <div>
          <h1>💰 Payments Management</h1>
          <p className="header-subtitle">Track and manage boarder payments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Record Payment
        </button>
      </div>

      {error && <div className="payments-error">{error}</div>}

      {/* Stats Cards */}
      <div className="payments-stats">
        <div className="stat-card stat-green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">₱{totalPaid.toLocaleString()}</div>
            <div className="stat-label">Total Paid</div>
          </div>
        </div>
        <div className="stat-card stat-yellow">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <div className="stat-value">₱{totalPending.toLocaleString()}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card stat-red">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <div className="stat-value">₱{totalOverdue.toLocaleString()}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All ({payments.length})
        </button>
        <button className={`filter-tab ${filter === 'paid' ? 'active' : ''}`} onClick={() => setFilter('paid')}>
          ✅ Paid
        </button>
        <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
          ⏳ Pending
        </button>
        <button className={`filter-tab ${filter === 'overdue' ? 'active' : ''}`} onClick={() => setFilter('overdue')}>
          ⚠️ Overdue
        </button>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <div className="payments-empty">
          <div className="empty-icon">💰</div>
          <p>No payments found</p>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            Record First Payment
          </button>
        </div>
      ) : (
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Boarder</th>
                <th>Room</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const status = getPaymentStatus(payment);
                return (
                  <tr key={payment.id} className={`payment-row status-${status}`}>
                    <td>
                      <strong>{getBoarderName(payment.boarder_id)}</strong>
                    </td>
                    <td>{getBoarderRoom(payment.boarder_id)}</td>
                    <td className="amount-cell">₱{(payment.amount || 0).toLocaleString()}</td>
                    <td>
                      <span className="type-badge">{payment.payment_type || 'RENT'}</span>
                    </td>
                    <td>{payment.due_date ? new Date(payment.due_date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${status}`}>
                        {status === 'paid' ? '✅ Paid' : status === 'overdue-long' ? '🔴 Overdue 15+' : status === 'overdue' ? '🟡 Overdue' : '⏳ Pending'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {status !== 'paid' && (
                          <button
                            className="btn btn-small btn-success"
                            onClick={() => handleMarkAsPaid(payment.id)}
                            title="Mark as Paid"
                          >
                            ✓ Paid
                          </button>
                        )}
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDeletePayment(payment.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💰 Record Payment</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddPayment}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Boarder *</label>
                  <select
                    name="boarder_id"
                    value={formData.boarder_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Boarder --</option>
                    {boarders.filter(b => b.status === 'Active').map(boarder => (
                      <option key={boarder.id} value={boarder.id}>
                        {boarder.name} {boarder.room_id ? `(Room ${rooms.find(r => r.id === boarder.room_id)?.room_number || '?'})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount (₱) *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="600"
                  />
                </div>
                <div className="form-group">
                  <label>Payment Type</label>
                  <select name="payment_type" value={formData.payment_type} onChange={handleInputChange}>
                    <option value="RENT">Rent</option>
                    <option value="UTILITY">Utility</option>
                    <option value="SECURITY_DEPOSIT">Security Deposit</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date *</label>
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="PENDING">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select name="payment_method" value={formData.payment_method} onChange={handleInputChange}>
                    <option value="">-- Not Paid Yet --</option>
                    <option value="CASH">Cash</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="GCASH">GCash</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Optional notes..."
                    rows="2"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                  {formLoading ? 'Saving...' : 'Record Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
