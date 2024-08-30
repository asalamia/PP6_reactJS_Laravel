import React from 'react';
import heroImage from './images/pp6_hero.jpg'; // Adjust the path if necessary

function HeroSection() {
  return (
    <div
      className="text-white text-center"
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
        <a href="#products" className="btn btn-primary btn-lg">Shop Now</a>
      </div>
    </div>
  );
}

export default HeroSection;
