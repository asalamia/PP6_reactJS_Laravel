import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
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

  return (
    <div className="container bg-dark text-white py-5">
      <h1 className="text-center mb-5">Our Coffee Selection</h1>
      {message && <div className="alert alert-info">{message}</div>}
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

export default Products;
