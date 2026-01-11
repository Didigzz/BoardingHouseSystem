import React, { useState, useEffect } from 'react';
import { utilityAPI, boarderAPI } from '../services/api';
import './Utilities.css';

function Utilities() {
  const [utilities, setUtilities] = useState([]);
  const [boarders, setBoarders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMonth, setActiveMonth] = useState(new Date().toISOString().slice(0, 7));
  const [formData, setFormData] = useState({
    type: 'ELECTRICITY',
    billing_mode: 'METERED',
    monthly_rate: '',
    total_amount: '',
    billing_period: new Date().toISOString().slice(0, 7),
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [utilitiesRes, boardersRes] = await Promise.all([
        utilityAPI.getAllUtilities(),
        boarderAPI.getAllBoarders()
      ]);
      setUtilities(utilitiesRes.data.data || []);
      setBoarders(boardersRes.data.data || []);
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

  const handleAddUtility = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      await utilityAPI.createUtility({
        ...formData,
        boarding_house_id: 1,
        monthly_rate: parseFloat(formData.monthly_rate) || 0,
      });
      setShowAddModal(false);
      setFormData({
        type: 'ELECTRICITY',
        billing_mode: 'METERED',
        monthly_rate: '',
        total_amount: '',
        billing_period: new Date().toISOString().slice(0, 7),
      });
      fetchData();
    } catch (err) {
      setError('Failed to add utility');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUtility = async (utilityId) => {
    if (!window.confirm('Are you sure you want to delete this utility record?')) return;
    try {
      await utilityAPI.deleteUtility(utilityId);
      fetchData();
    } catch (err) {
      setError('Failed to delete utility');
      console.error(err);
    }
  };

  const activeBoarders = boarders.filter(b => b.status === 'Active');
  
  // Calculate split amounts
  const calculateSplit = (totalAmount) => {
    if (activeBoarders.length === 0) return 0;
    return Math.ceil(totalAmount / activeBoarders.length);
  };

  // Get total utilities for the month
  const monthlyUtilities = utilities.filter(u => 
    u.billing_period === activeMonth || 
    (u.start_date && u.start_date.startsWith(activeMonth))
  );

  const totalElectricity = monthlyUtilities
    .filter(u => u.type === 'ELECTRICITY')
    .reduce((sum, u) => sum + (u.monthly_rate || 0), 0);
  
  const totalWater = monthlyUtilities
    .filter(u => u.type === 'WATER')
    .reduce((sum, u) => sum + (u.monthly_rate || 0), 0);
  
  const totalWifi = monthlyUtilities
    .filter(u => u.type === 'WIFI')
    .reduce((sum, u) => sum + (u.monthly_rate || 0), 0);

  const totalUtilities = totalElectricity + totalWater + totalWifi;

  if (loading) return <div className="utilities-loading">Loading utilities...</div>;

  return (
    <div className="utilities">
      <div className="utilities-header">
        <div>
          <h1>⚡ Utilities Management</h1>
          <p className="header-subtitle">Track and split utility bills among boarders</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Utility Bill
        </button>
      </div>

      {error && <div className="utilities-error">{error}</div>}

      {/* Month Selector */}
      <div className="month-selector">
        <label>Billing Period:</label>
        <input 
          type="month" 
          value={activeMonth} 
          onChange={(e) => setActiveMonth(e.target.value)}
        />
      </div>

      {/* Summary Cards */}
      <div className="utilities-summary">
        <div className="summary-card electricity">
          <div className="summary-icon">💡</div>
          <div className="summary-info">
            <div className="summary-label">Electricity</div>
            <div className="summary-value">₱{totalElectricity.toLocaleString()}</div>
            <div className="summary-split">₱{calculateSplit(totalElectricity)}/boarder</div>
          </div>
        </div>
        <div className="summary-card water">
          <div className="summary-icon">💧</div>
          <div className="summary-info">
            <div className="summary-label">Water</div>
            <div className="summary-value">₱{totalWater.toLocaleString()}</div>
            <div className="summary-split">₱{calculateSplit(totalWater)}/boarder</div>
          </div>
        </div>
        <div className="summary-card wifi">
          <div className="summary-icon">📶</div>
          <div className="summary-info">
            <div className="summary-label">WiFi/Internet</div>
            <div className="summary-value">₱{totalWifi.toLocaleString()}</div>
            <div className="summary-split">₱{calculateSplit(totalWifi)}/boarder</div>
          </div>
        </div>
        <div className="summary-card total">
          <div className="summary-icon">📊</div>
          <div className="summary-info">
            <div className="summary-label">Total Utilities</div>
            <div className="summary-value">₱{totalUtilities.toLocaleString()}</div>
            <div className="summary-split">₱{calculateSplit(totalUtilities)}/boarder</div>
          </div>
        </div>
      </div>

      {/* Boarder Split Table */}
      <div className="split-section">
        <h2>👥 Boarder Split ({activeBoarders.length} active boarders)</h2>
        {activeBoarders.length === 0 ? (
          <div className="empty-state">
            <p>No active boarders to split utilities with</p>
          </div>
        ) : (
          <div className="split-table-container">
            <table className="split-table">
              <thead>
                <tr>
                  <th>Boarder</th>
                  <th>Electricity</th>
                  <th>Water</th>
                  <th>WiFi</th>
                  <th>Total Due</th>
                </tr>
              </thead>
              <tbody>
                {activeBoarders.map(boarder => (
                  <tr key={boarder.id}>
                    <td>
                      <div className="boarder-cell">
                        <span className="boarder-avatar">👤</span>
                        <strong>{boarder.name}</strong>
                      </div>
                    </td>
                    <td>₱{calculateSplit(totalElectricity).toLocaleString()}</td>
                    <td>₱{calculateSplit(totalWater).toLocaleString()}</td>
                    <td>₱{calculateSplit(totalWifi).toLocaleString()}</td>
                    <td className="total-cell">
                      <strong>₱{calculateSplit(totalUtilities).toLocaleString()}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>TOTAL</strong></td>
                  <td><strong>₱{totalElectricity.toLocaleString()}</strong></td>
                  <td><strong>₱{totalWater.toLocaleString()}</strong></td>
                  <td><strong>₱{totalWifi.toLocaleString()}</strong></td>
                  <td className="total-cell"><strong>₱{totalUtilities.toLocaleString()}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Utility Bills History */}
      <div className="bills-section">
        <h2>📝 Utility Bills History</h2>
        {utilities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚡</div>
            <p>No utility bills recorded yet</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Add First Bill
            </button>
          </div>
        ) : (
          <div className="bills-list">
            {utilities.map(utility => (
              <div key={utility.id} className={`bill-card ${utility.type.toLowerCase()}`}>
                <div className="bill-icon">
                  {utility.type === 'ELECTRICITY' ? '💡' : utility.type === 'WATER' ? '💧' : '📶'}
                </div>
                <div className="bill-info">
                  <div className="bill-type">{utility.type}</div>
                  <div className="bill-period">{utility.billing_period || utility.start_date?.slice(0, 7) || 'N/A'}</div>
                </div>
                <div className="bill-amount">₱{(utility.monthly_rate || 0).toLocaleString()}</div>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => handleDeleteUtility(utility.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Utility Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚡ Add Utility Bill</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddUtility}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Utility Type *</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="ELECTRICITY">💡 Electricity</option>
                    <option value="WATER">💧 Water</option>
                    <option value="WIFI">📶 WiFi/Internet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Billing Mode</label>
                  <select name="billing_mode" value={formData.billing_mode} onChange={handleInputChange}>
                    <option value="METERED">Metered (Variable)</option>
                    <option value="BUNDLED">Bundled (Fixed)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Amount (₱) *</label>
                  <input
                    type="number"
                    name="monthly_rate"
                    value={formData.monthly_rate}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="e.g., 2500"
                  />
                </div>
                <div className="form-group">
                  <label>Billing Period *</label>
                  <input
                    type="month"
                    name="billing_period"
                    value={formData.billing_period}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="split-preview">
                <p>
                  <strong>Split Preview:</strong> ₱{formData.monthly_rate || 0} ÷ {activeBoarders.length} boarders = 
                  <span className="split-amount"> ₱{calculateSplit(parseFloat(formData.monthly_rate) || 0)} each</span>
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                  {formLoading ? 'Saving...' : 'Add Bill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Utilities;
