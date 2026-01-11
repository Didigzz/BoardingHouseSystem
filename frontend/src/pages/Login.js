import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [userType, setUserType] = useState('landlord'); // 'landlord' or 'boarder'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo purposes - in production, validate against backend
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Mock authentication
      const user = {
        id: 1,
        email: formData.email,
        name: formData.email.split('@')[0],
        role: userType,
      };

      // Save to localStorage (in production, use secure token)
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', userType);

      onLogin(user);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏠 BHMS</h1>
          <p>Boarding House Management System</p>
        </div>

        <div className="login-notice">
          <p>Owner/Landlord Login Only</p>
          <small>Boarders access through shareable links</small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-info">
            {userType === 'landlord' ? (
              <>
                <strong>Demo Landlord:</strong><br />
                Email: owner@email.com<br />
                Password: anything
              </>
            ) : (
              <>
                <strong>Demo Boarder:</strong><br />
                Email: boarder@email.com<br />
                Password: anything
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
