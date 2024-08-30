import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from './ProductList';
import heroImage from './images/pp6_hero.jpg'; // Importing the hero image

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setFormData({ userId: userData.id, name: userData.name, email: userData.email });
      console.log(userData.id);
    } else {
      setMessage('User not found. Please log in.');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Define the function to handle profile updates
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem('auth_token');
    
    // Assume userId is obtained from local storage or state
    const userId = JSON.parse(localStorage.getItem('user')).id;

    // Make the API request to update the user profile
    axios.post(`http://127.0.0.1:8000/api/profile/${userId}/edited`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the authentication token
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        // Update user state and local storage with the new profile data
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage('Profile updated successfully!');
    })
    .catch(error => {
        // Handle errors during the profile update
        setMessage('Error updating profile.');
        console.error('Update error:', error.response?.data);
    });
};

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('New password and confirmation do not match.');
      return;
    }

    axios.put('http://127.0.0.1:8000/api/reset-password', passwords)
      .then(() => {
        setMessage('Password updated successfully!');
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      })
      .catch(error => {
        const errorMsg = error.response?.data?.message || 'Error updating password.';

        if (error.response?.status === 400) {
          setMessage(errorMsg);
        } else {
          setMessage('An unexpected error occurred. Please try again later.');
        }

        console.error('Password update error:', error.response?.data);
      });
  };

  const handleAddProduct = () => {
    navigate('/createProduct');
  };

  return (
    <div className="container mt-5">
      <style>
        {`
          .hero-image img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .form-group label {
            color: white;
          }
          .form-control {
            color: white;
            background-color: #343a40;
            border-color: #495057;
          }
          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
          }
          .btn-primary:hover {
            background-color: #0056b3;
            border-color: #004085;
          }
          .nav-link.active {
            background-color: #007bff;
            color: white;
          }
          .tab-pane {
            color: white;
          }
        `}
      </style>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
          <div className="my-4">
            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === 'profile'}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'update-profile' ? 'active' : ''}`}
                  id="update-profile-tab"
                  data-bs-toggle="tab"
                  href="#update-profile"
                  role="tab"
                  aria-controls="update-profile"
                  aria-selected={activeTab === 'update-profile'}
                  onClick={() => setActiveTab('update-profile')}
                >
                  Update Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'update-password' ? 'active' : ''}`}
                  id="update-password-tab"
                  data-bs-toggle="tab"
                  href="#update-password"
                  role="tab"
                  aria-controls="update-password"
                  aria-selected={activeTab === 'update-password'}
                  onClick={() => setActiveTab('update-password')}
                >
                  Update Password
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'add-product' ? 'active' : ''}`}
                  id="add-product-tab"
                  data-bs-toggle="tab"
                  href="#add-product"
                  role="tab"
                  aria-controls="add-product"
                  aria-selected={activeTab === 'add-product'}
                  onClick={() => handleAddProduct()}
                >
                  Add Product
                </a>
              </li>
            </ul>
            <div className="tab-content">

              {/* Profile Tab */}
              <div
                className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <h4 className="mb-1">Welcome {formData.name}</h4>
              </div>

              {/* Update Profile Tab */}
              <div
                className={`tab-pane fade ${activeTab === 'update-profile' ? 'show active' : ''}`}
                id="update-profile"
                role="tabpanel"
                aria-labelledby="update-profile-tab"
              >
                <div className="container">
                  {/* Row with two columns */}
                  <div className="row">
                    <div className="col-sm-8">
                      {/* Hero Image */}
                      <div className="hero-image">
                        <img
                          src={heroImage} // Using the imported heroImage variable
                          className="img-fluid rounded shadow"
                          alt="Hero Image"
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      {/* Form */}
                      <form onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Password Tab */}
              <div
                className={`tab-pane fade ${activeTab === 'update-password' ? 'show active' : ''}`}
                id="update-password"
                role="tabpanel"
                aria-labelledby="update-password-tab"
              >
                <div className="hero-image">
                  <div className="row">
                    <div className="col-sm-8">
                      <div className="hero-image">
                        <img
                          src={heroImage} // Using the imported heroImage variable
                          className="img-fluid rounded shadow"
                          alt="Hero Image"
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <form onSubmit={handleUpdatePassword}>
                        <div className="form-group">
                          <label htmlFor="oldPassword">Old Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="oldPassword"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Password</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ProductList /> {/* Add the ProductList component here */}
    </div>
  );
}

export default Dashboard;
