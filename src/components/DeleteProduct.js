import React, { useState, useEffect } from 'react';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://127.0.0.1:8000/api/product')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleDelete = (productId) => {
    fetch(`http://127.0.0.1:8000/api/product/${productId}/destroy`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessage('Product deleted successfully!');
          fetchProducts(); // Refresh the product list
        } else {
          setMessage('Failed to delete product.');
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price: </strong>₱{product.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
