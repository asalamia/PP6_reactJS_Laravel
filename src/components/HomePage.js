import React from 'react';
import Products from './Products';
import heroImage from './images/pp6_hero.jpg'; // Adjust the path if necessary

function HomePage() {
  return (
    <div className="text-white text-center">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          padding: '100px 0',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50px' }}>
          <h1 className="display-4">Welcome to CUPPACLICK</h1>
          <p className="lead">Brewed to Perfection, One Click at a Time.</p>
          <a href="/dashboard" className="btn btn-light btn-lg">Shop Now</a>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="container my-5">
        <div className="p-5" style={{ backgroundColor: '#333', borderRadius: '10px' }}>
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-center">
            At Cuppaclick, we believe in the perfect blend of quality, flavor, and passion. Our coffee beans are sourced from the finest growers around the world and roasted to perfection. Whether you're starting your day or enjoying a relaxing afternoon, our coffee is the perfect companion.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <Products /> 
    </div>
  );
}

export default HomePage;
