import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchProductDetails = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/api/product/${productId}/edit`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setMessage('Error fetching product details. Please try again later.');
      });
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const validateProduct = () => {
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

    if (newImage && (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(newImage.type) || newImage.size > 2048 * 1024)) {
      errors.image = 'Product image should be a valid image file (jpeg, png, jpg, gif) and less than 2MB.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateProduct();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (newImage) {
      formData.append('image', newImage);
    }

    axios.post(`http://127.0.0.1:8000/api/product/${productId}/edited`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setMessage('Product updated successfully!');
      navigate('/productList');
    })
    .catch(error => {
      console.error('Error updating product:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
      } else {
        setMessage('An error occurred while updating the product. Please try again.');
      }
    });
  };

  return (
    <div className="container bg-dark text-white py-5">
      <h1 className="text-center mb-5">Edit Product</h1>
      {message && <div className="alert alert-info">{message}</div>}
      {errors && Object.keys(errors).map((key) => (
        <div key={key} className="alert alert-danger">
          {errors[key]}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
          />
          {product.image && !newImage && (
            <img
              src={`http://127.0.0.1:8000/storage/pictures/${product.image}`}
              alt="Current Product"
              className="img-thumbnail mt-2"
              style={{ width: '150px' }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-outline-light">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
