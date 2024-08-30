import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'; // Import React Bootstrap Modal

function Logout({ setUser }) {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      setShowModal(true); // Show modal if not logged in
    } else {
      setShowModal(true); // Show modal if logged in
    }
  }, []);

  // Function to handle the logout process
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Update user state
    navigate('/login'); // Redirect to the login page
  };

  // Function to handle the confirmation of logout
  const handleConfirmLogout = () => {
    handleLogout();
    setShowModal(false); // Hide modal after logout
  };

  // Function to handle cancel logout or display login message
  const handleCloseModal = () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if user is not logged in
    }
    setShowModal(false); // Hide modal
  };

  return (
    <>
      {/* Modal for logout confirmation or login message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLoggedIn ? 'Confirm Logout' : 'Not Logged In'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoggedIn 
            ? 'Are you sure you want to log out?' 
            : 'You are not logged in. Please log in to continue.'}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            {isLoggedIn ? 'Cancel' : 'OK'}
          </button>
          {isLoggedIn && (
            <button className="btn btn-primary" onClick={handleConfirmLogout}>
              Yes, Log Out
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
