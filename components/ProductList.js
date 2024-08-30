import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/product')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setMessage('Error fetching products. Please try again later.');
        setProducts([]);
      });
  };

  const validateProduct = (product) => {
    const errors = {};

    if (!product.name || typeof product.name !== 'string' || product.name.length > 255) {
      errors.name = 'Product name is required and should be a string with a maximum of 255 characters.';
    }

    if (product.description && typeof product.description !== 'string') {
      errors.description = 'Product description should be a string.';
    }

    if (!product.price || isNaN(product.price)) {
      errors.price = 'Product price is required and should be a valid number.';
    }

    if (product.image && (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(product.image.type) || product.image.size > 2048 * 1024)) {
      errors.image = 'Product image should be a valid image file (jpeg, png, jpg, gif) and less than 2MB.';
    }

    return errors;
  };

  const handleEdit = (productId) => {
    if (productId) {
      navigate(`/editProduct/${productId}`);
    } else {
      setMessage('Product ID is missing.');
    }
  };

  const handleDelete = (productId) => {
    axios.delete(`http://127.0.0.1:8000/api/product/${productId}/destroy`)
      .then(response => {
        if (response.status === 204) {
          setMessage('Product deleted successfully!');
          fetchProducts(); // Refresh the product list after deletion
        } else {
          setMessage('Failed to delete product.');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        setMessage('An error occurred while deleting the product. Please try again later.');
      });
  };


  return (
    <div className="container bg-dark text-white py-5">
      <h1 className="text-center mb-5">Our Coffee Selection</h1>
      {message && <div className="alert alert-info">{message}</div>}
      {errors && Object.keys(errors).map((key) => (
        <div key={key} className="alert alert-danger">
          {errors[key]}
        </div>
      ))}
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card bg-dark text-white border-light shadow-sm">
                <img
                  src={`http://127.0.0.1:8000/storage/pictures/${product.image}`} // Updated path to match the storage directory
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Price: </strong>₱{product.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-light"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
