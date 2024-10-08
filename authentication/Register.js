import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImage from './images/pp6_hero.jpg'; // Import your hero image
import axios from 'axios'; // Import Axios

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== passwordConfirmation) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', { // Adjusted to the correct route
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.data.success) {
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
      } else {
        setMessage(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(`An error occurred: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hero Image Column */}
        <div className="col-sm-8">
          <div className="hero-image">
            <img
              src={heroImage}  // Use the imported heroImage variable
              className="img-fluid rounded shadow"
              alt="Hero Image"
            />
          </div>
        </div>

        {/* Register Form Column */}
        <div className="col-sm-4">
          <h1 className="text-white">Register</h1>
          <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow text-white">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-light mt-3">Register</button>
            {message && <p className="mt-2">{message}</p>}
            <p className="text-white mt-3">
            Already registered? <Link to="/login" className="text-info">Login here</Link>
          </p> {/* Link to login page */}
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Register;
