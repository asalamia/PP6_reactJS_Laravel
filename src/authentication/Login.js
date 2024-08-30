import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImage from '../components/images/pp6_hero.jpg';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to dashboard if already logged in
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      'http://127.0.0.1:8000/api/loginCustomer',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then((response) => {
      const data = response.data;

      if (data.success) {
        // Save token and user data to local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user); // Update user state
        setMessage('Login successful! Redirecting...');
        
        // Redirect to the dashboard after a short delay
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setMessage(`An error occurred: ${error.response?.data?.message || error.message}`);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hero Image Column */}
        <div className="col-sm-8">
          <div className="hero-image">
            <img
              src={heroImage}
              className="img-fluid rounded shadow"
              alt="Hero Image"
            />
          </div>
        </div>

        {/* Login Form Column */}
        <div className="col-sm-4">
          <h1 className="text-white">Login</h1>
          <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow text-white">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-light mt-3">Login</button>
            {message && <p className="mt-2">{message}</p>}
          </form>
          <p className="text-white mt-3">
            Forgot your password? <Link to="/forgotPassword" className="text-info">Reset it here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
