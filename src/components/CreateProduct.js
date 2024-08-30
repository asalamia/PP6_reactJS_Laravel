import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateProduct.css'; // Custom CSS for additional styling
import heroImage from './images/pp6_hero.jpg'; // Importing the hero image

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    fetch('http://127.0.0.1:8000/api/product', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        // No need to set Content-Type for FormData, browser will do it
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setMessage('Product created successfully!');
          setIsSuccess(true);
          setShowModal(true);
          setName('');
          setDescription('');
          setPrice('');
          setImage(null);
          setImageName('');
          // Redirect to the dashboard after successful creation
          setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds to allow modal to display
        } else {
          setMessage('Failed to create product.');
          setIsSuccess(false);
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
        setIsSuccess(false);
        setShowModal(true);
      });
  };

  return (
    <div className="container mt-5">
      <h4 className="text-light mb-4">Create Product ||
        <a href="/dashboard"> 
        Back to Dashboard
        </a>
      </h4>
      
      {/* New Row and Columns */}
      <div className="row">
        <div className="col-sm-8">
          {/* Hero Image Section */}
          <div className="hero-image mb-4">
            <img
              src={heroImage}  // Replace with your image source or import
              className="img-fluid rounded shadow"
              alt="Hero Image"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="form-section">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
              <div className="form-group">
                <label htmlFor="name" className="text-light">Product Name</label>
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
                <label htmlFor="description" className="text-light">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price" className="text-light">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image" className="text-light">Product Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  onChange={handleImageChange}
                  required
                />
                {imageName && <p className="mt-2 text-light">Selected file: {imageName}</p>}
              </div>
              <button type="submit" className="btn btn-light mt-3">Create Product</button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark text-light rounded-0">
            <div className="modal-header">
              <h5 className="modal-title">{isSuccess ? 'Success' : 'Error'}</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
