import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', {
        email,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      setMessage('If the email is registered, a reset link will be sent to your email.');
    } catch (error) {
      console.error('Error:', error);
      setMessage(`An error occurred: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ backgroundColor: '#333', color: '#fff', borderRadius: '15px', width: '400px' }}>
        <div className="text-center">
          <h2 className="mb-4" style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}>Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: 'bold', color: '#d4af37' }}>Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: '#444', color: '#fff', borderColor: '#555', borderRadius: '5px' }}
            />
          </div>
          <button type="submit" className="btn btn-block mt-4" style={{ backgroundColor: '#d4af37', color: '#333', fontWeight: 'bold' }}>
            Send Reset Link
          </button>
          {message && <p className="mt-3 text-center" style={{ color: '#d4af37' }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
